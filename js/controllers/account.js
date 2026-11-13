import { render } from "./router.js";
import { signIn, signUp, saveSession } from "../services/auth.js";
import { fetchMyOrders } from "../services/history.js";
import { refreshProfile, upsertProfile } from "../services/profile.js";
import { BOXES } from "../data/boxes.js";
import { state } from "../state/state.js";
import { store } from "../state/storage.js";
import { toast } from "../views/components/toast.js";

const emailValide = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function register(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const email = (f.get("email") || "").trim().toLowerCase();
  const pwd = f.get("pwd") || "", pwd2 = f.get("pwd2") || "";
  if (!emailValide(email)) return toast("Adresse email invalide.");
  if (pwd.length < 6) return toast("Mot de passe : 6 caractères minimum.");
  if (pwd !== pwd2) return toast("Les mots de passe ne correspondent pas.");
  try {
    state.session = await signUp(email, pwd);
    saveSession(state.session);
    await refreshProfile();
    await loadOrders();
    location.hash = "bienvenue";
  } catch (err) { toast(err.message); }
}

export async function login(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  try {
    state.session = await signIn((f.get("email") || "").trim().toLowerCase(), f.get("pwd") || "");
    saveSession(state.session);
    await refreshProfile();
    await loadOrders();
    toast("Connexion réussie ✓");
    render();
  } catch (err) { toast(err.message); }
}

export function logout() {
  state.session = null; state.profile = null; state.orders = null;
  saveSession(null);
  toast("Vous êtes déconnecté");
  render();
}

export async function saveProfile(e) {
  e.preventDefault();
  if (!state.session) return toast("Créez un compte ou connectez-vous.");
  const f = new FormData(e.target);
  const p = {
    nom: f.get("nom"), tel: f.get("tel"), rue: f.get("rue"), numero: f.get("numero"),
    complement: f.get("complement"), cp: f.get("cp"), ville: (f.get("ville") || "").trim(),
  };
  const ok = await upsertProfile(p);
  await refreshProfile();
  toast(ok ? "Profil enregistré ✓" : "Enregistrement impossible, réessayez.");
  render();
}

// Charge les commandes du client connecté (historique, fidélité, favori)
export async function loadOrders() {
  if (!state.session) { state.orders = null; return; }
  state.orders = await fetchMyOrders();
  render();
}

// Toucher un lot : rappel de la règle
export function tapLot() {
  toast("Ce lot se choisit dans le panier, sur votre prochaine commande.");
}

// Repasser une commande passée : remet la box et les extras dans le panier
export function repeatOrder(id) {
  const o = (state.orders || []).find(x => x.id === id);
  if (!o) return toast("Commande introuvable.");
  const it = o.items || {};
  const entree = Object.entries(BOXES).find(([, b]) => b.name === it.box);
  state.cart.box = entree ? entree[0] : null;
  state.cart.mode = entree ? (entree[1].fixed ? "fixed" : "custom") : null;
  state.cart.picks = entree ? {...(it.picks || {})} : {};
  state.cart.extras = {};
  for (const x of it.extras || []) {
    state.cart.extras[x.k] = state.cart.extras[x.k] || {};
    state.cart.extras[x.k][x.size] = x.qty;
  }
  store("fs_cart", state.cart);
  toast("Commande remise dans le panier ✓");
  location.hash = "panier";
}
