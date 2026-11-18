// Page d'administration : connexion, commandes, statut, corbeille (suppression après 7 jours).
import { SUPABASE_KEY, SUPABASE_URL } from "./config.js";

const STATUTS = ["Nouvelle", "Validée", "En préparation", "En livraison", "Livrée", "Annulée"];
const JOURS_CORBEILLE = 7;
const app = document.getElementById("app");
const REFRESH_MS = 15000;
let token = sessionStorage.getItem("fs_admin_token");
let filtre = "Nouvelle";
let rows = [];
let timer = null;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const eur = n => Number(n || 0).toFixed(2).replace(".", ",") + " €";
const headers = () => ({ apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" });

// Vérifie dans la base que le compte connecté est bien un administrateur
async function estAdmin() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/admins?select=email`, { headers: headers() });
  if (!res.ok) return false;
  const rows = await res.json();
  return rows.length > 0;
}

function afficherLogin(message) {
  app.innerHTML = `
    <form class="login" id="loginForm">
      <h1>Admin Floral Sushi</h1>
      <p>${message || "Connectez-vous pour voir les commandes."}</p>
      <label>Email</label><input name="email" type="email" required autocomplete="username">
      <label>Mot de passe</label><input name="password" type="password" required autocomplete="current-password">
      <button type="submit">Se connecter</button>
    </form>`;
  document.getElementById("loginForm").addEventListener("submit", connexion);
}

async function connexion(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email: f.get("email"), password: f.get("password") }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) { alert("Email ou mot de passe incorrect."); return; }
  token = data.access_token;
  sessionStorage.setItem("fs_admin_token", token);
  if (!(await estAdmin())) {
    deconnexion("Ce compte n'a pas accès à l'administration.");
    return;
  }
  demarrer();
}

function deconnexion(message) {
  token = null;
  sessionStorage.removeItem("fs_admin_token");
  clearInterval(timer);
  afficherLogin(message);
}

function afficherApp() {
  app.innerHTML = `
    <div class="bar">
      <h1>Commandes</h1>
      <button class="ghost" id="logout">Se déconnecter</button>
    </div>
    <div class="filtres" id="filtres"></div>
    <div id="liste"></div>`;
  document.getElementById("logout").addEventListener("click", deconnexion);
  const liste = document.getElementById("liste");
  liste.addEventListener("change", e => {
    if (e.target.matches("select[data-id]")) changerStatut(e.target.dataset.id, e.target.value);
  });
  liste.addEventListener("click", e => {
    const b = e.target.closest("button[data-action]");
    if (!b) return;
    const id = b.dataset.id;
    if (b.dataset.action === "corbeille") mettreCorbeille(id, true);
    if (b.dataset.action === "restaurer") mettreCorbeille(id, false);
  });
}

function actives() { return rows.filter(r => !r.deleted_at); }
function corbeille() { return rows.filter(r => r.deleted_at); }

function afficherFiltres() {
  const valeurs = ["Toutes", ...STATUTS, "Corbeille"];
  const compte = v => v === "Toutes" ? actives().length
    : v === "Corbeille" ? corbeille().length
    : actives().filter(r => r.status === v).length;
  const zone = document.getElementById("filtres");
  zone.innerHTML = valeurs.map(v =>
    `<button class="${filtre === v ? "on" : "ghost"}${v === "Corbeille" ? " corbeille" : ""}" data-filtre="${esc(v)}">${v === "Corbeille" ? "🗑 " : ""}${esc(v)} (${compte(v)})</button>`).join("");
  zone.onclick = e => {
    const b = e.target.closest("button[data-filtre]");
    if (!b) return;
    filtre = b.dataset.filtre;
    afficher();
  };
  const nouvelles = actives().filter(r => r.status === "Nouvelle").length;
  document.title = (nouvelles ? `(${nouvelles}) ` : "") + "Admin · Floral Sushi";
}

function joursRestants(r) {
  const fin = new Date(r.deleted_at).getTime() + JOURS_CORBEILLE * 86400000;
  return Math.max(0, Math.ceil((fin - Date.now()) / 86400000));
}

function carte(r) {
  const a = r.address || {};
  const adresse = `${esc(a.numero)} ${esc(a.rue)}${a.complement ? ", " + esc(a.complement) : ""}, ${esc(a.cp)} ${esc(a.ville)}`;
  const lignes = (r.items && r.items.resume) ? r.items.resume.join("\n") : "";
  const actions = r.deleted_at
    ? `<div class="corbeille-info">Supprimée dans ${joursRestants(r)} jour(s).</div>
       <button class="ghost" data-action="restaurer" data-id="${r.id}">Restaurer</button>`
    : `<button class="ghost danger" data-action="corbeille" data-id="${r.id}">🗑 Mettre à la corbeille</button>`;
  return `
    <article class="card">
      <header>
        <div>
          <div class="ref">${esc(r.order_ref)}</div>
          <div>${new Date(r.created_at).toLocaleString("fr-FR")}</div>
        </div>
        ${r.deleted_at ? `<span class="statut">${esc(r.status)}</span>` : `<select data-id="${r.id}">
          ${STATUTS.map(s => `<option ${s === r.status ? "selected" : ""}>${esc(s)}</option>`).join("")}
        </select>`}
      </header>
      <div class="infos">
        <strong>${esc(r.customer_name)}</strong> · <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a><br>
        📍 ${adresse}<br>
        🕐 ${esc(r.slot)}
      </div>
      <div class="resume">${esc(lignes)}</div>
      <div class="total">${eur(r.total)}${Number(r.tip) ? ` · pourboire ${eur(r.tip)}` : ""}</div>
      <div class="actions">${actions}</div>
    </article>`;
}

function afficher() {
  afficherFiltres();
  let visibles;
  if (filtre === "Corbeille") visibles = corbeille();
  else if (filtre === "Toutes") visibles = actives();
  else visibles = actives().filter(r => r.status === filtre);
  document.getElementById("liste").innerHTML = visibles.length
    ? visibles.map(carte).join("")
    : `<div class="vide">${filtre === "Corbeille" ? "La corbeille est vide." : "Aucune commande pour le moment."}</div>`;
}

async function charger() {
  if (!token) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=300`, { headers: headers() });
  if (res.status === 401 || res.status === 403) { deconnexion(); return; }
  if (!res.ok) return;
  rows = await res.json();
  afficher();
}

async function changerStatut(id, statut) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify({ status: statut }),
  });
  if (!res.ok) alert("Impossible de changer le statut.");
  charger();
}

// Met une commande à la corbeille (date de suppression) ou la restaure (sans date)
async function mettreCorbeille(id, aSupprimer) {
  if (aSupprimer && !confirm("Mettre cette commande à la corbeille ? Elle sera supprimée définitivement dans 7 jours.")) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify({ deleted_at: aSupprimer ? new Date().toISOString() : null }),
  });
  if (!res.ok) alert("Impossible de modifier la commande.");
  charger();
}

function demarrer() {
  afficherApp();
  charger();
  clearInterval(timer);
  timer = setInterval(charger, REFRESH_MS);
}

async function initialiser() {
  if (!token) return afficherLogin();
  if (await estAdmin()) demarrer();
  else deconnexion("Session invalide ou accès refusé. Reconnectez-vous.");
}
initialiser();
