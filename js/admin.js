// Page d'administration : connexion, liste des commandes, changement de statut.
// Accès protégé par Supabase Auth ; la base refuse tout accès sans connexion (règles RLS).
import { SUPABASE_KEY, SUPABASE_URL } from "./config.js";

const STATUTS = ["Nouvelle", "Validée", "En préparation", "En livraison", "Livrée", "Annulée"];
const app = document.getElementById("app");
const REFRESH_MS = 15000;
let token = sessionStorage.getItem("fs_admin_token");
let filtre = "Nouvelle";
let timer = null;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const eur = n => Number(n || 0).toFixed(2).replace(".", ",") + " €";
const headers = () => ({ apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" });

function afficherLogin() {
  app.innerHTML = `
    <form class="login" id="loginForm">
      <h1>Admin Floral Sushi</h1>
      <p>Connectez-vous pour voir les commandes.</p>
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
  demarrer();
}

function deconnexion() {
  token = null;
  sessionStorage.removeItem("fs_admin_token");
  clearInterval(timer);
  afficherLogin();
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
  document.getElementById("liste").addEventListener("change", e => {
    if (e.target.matches("select[data-id]")) changerStatut(e.target.dataset.id, e.target.value);
  });
}

function afficherFiltres(rows) {
  const compte = s => rows.filter(r => r.status === s).length;
  const boutons = ["Toutes", ...STATUTS].map(s => {
    const valeur = s === "Toutes" ? "Toutes" : s;
    const n = s === "Toutes" ? rows.length : compte(s);
    return `<button class="${filtre === valeur ? "on" : "ghost"}" data-filtre="${esc(valeur)}">${esc(s)} (${n})</button>`;
  }).join("");
  const zone = document.getElementById("filtres");
  zone.innerHTML = boutons;
  zone.onclick = e => {
    const b = e.target.closest("button[data-filtre]");
    if (!b) return;
    filtre = b.dataset.filtre;
    charger();
  };
  const nouvelles = compte("Nouvelle");
  document.title = (nouvelles ? `(${nouvelles}) ` : "") + "Admin · Floral Sushi";
}

function carte(r) {
  const a = r.address || {};
  const adresse = `${esc(a.numero)} ${esc(a.rue)}${a.complement ? ", " + esc(a.complement) : ""}, ${esc(a.cp)} ${esc(a.ville)}`;
  const lignes = (r.items && r.items.resume) ? r.items.resume.join("\n") : "";
  return `
    <article class="card">
      <header>
        <div>
          <div class="ref">${esc(r.order_ref)}</div>
          <div>${new Date(r.created_at).toLocaleString("fr-FR")}</div>
        </div>
        <select data-id="${r.id}">
          ${STATUTS.map(s => `<option ${s === r.status ? "selected" : ""}>${esc(s)}</option>`).join("")}
        </select>
      </header>
      <div class="infos">
        <strong>${esc(r.customer_name)}</strong> · <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a><br>
        📍 ${adresse}<br>
        🕐 ${esc(r.slot)}
      </div>
      <div class="resume">${esc(lignes)}</div>
      <div class="total">${eur(r.total)}${Number(r.tip) ? ` · pourboire ${eur(r.tip)}` : ""}</div>
    </article>`;
}

function afficher(rows) {
  afficherFiltres(rows);
  const visibles = filtre === "Toutes" ? rows : rows.filter(r => r.status === filtre);
  document.getElementById("liste").innerHTML = visibles.length
    ? visibles.map(carte).join("")
    : `<div class="vide">Aucune commande pour le moment.</div>`;
}

async function charger() {
  if (!token) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=200`, { headers: headers() });
  if (res.status === 401 || res.status === 403) { deconnexion(); return; }
  if (!res.ok) return;
  afficher(await res.json());
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

function demarrer() {
  afficherApp();
  charger();
  clearInterval(timer);
  timer = setInterval(charger, REFRESH_MS);
}

token ? demarrer() : afficherLogin();
