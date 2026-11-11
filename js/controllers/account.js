import { render } from "./router.js";
import { hashPwd } from "../services/auth.js";
import { refreshProfile, state, users } from "../state/state.js";
import { store } from "../state/storage.js";
import { toast } from "../views/components/toast.js";

export async function register(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const email = (f.get("email") || "").trim().toLowerCase();
  const pwd = f.get("pwd") || "", pwd2 = f.get("pwd2") || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Adresse email invalide.");
  if (pwd.length < 6) return toast("Mot de passe : 6 caractères minimum.");
  if (pwd !== pwd2) return toast("Les mots de passe ne correspondent pas.");
  const all = users();
  if (all[email]) return toast("Un compte existe déjà avec cet email. Connectez-vous.");
  all[email] = {hash: await hashPwd(email, pwd), profile: null};
  store("fs_users", all);
  state.session = email; store("fs_session", state.session);
  refreshProfile(); toast("Compte créé ✓ Bienvenue !"); render();
}

export async function login(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const email = (f.get("email") || "").trim().toLowerCase();
  const pwd = f.get("pwd") || "";
  const u = users()[email];
  if (!u || u.hash !== await hashPwd(email, pwd)) return toast("Email ou mot de passe incorrect.");
  state.session = email; store("fs_session", state.session);
  refreshProfile(); toast("Connexion réussie ✓"); render();
}

export function logout() {
  state.session = null; store("fs_session", null);
  refreshProfile(); toast("Vous êtes déconnecté"); render();
}

export function saveProfile(e) {
  e.preventDefault();
  if (!state.session) return toast("Créez un compte ou connectez-vous.");
  const f = new FormData(e.target);
  const last4 = (f.get("last4") || "").replace(/\D/g,"").slice(-4);
  const p = {
    nom:f.get("nom"), tel:f.get("tel"), rue:f.get("rue"), numero:f.get("numero"),
    complement:f.get("complement"), cp:f.get("cp"), ville:(f.get("ville")||"").trim(),
    card: last4.length === 4 ? {brand: f.get("brand") || "Carte", last4} : (state.profile && state.profile.card) || null
  };
  const all = users(); all[state.session].profile = p; store("fs_users", all);
  refreshProfile(); toast("Profil enregistré ✓"); render();
}

export function clearCard() { if (!state.session) return; const all = users(); all[state.session].profile.card = null; store("fs_users", all); refreshProfile(); toast("Moyen de paiement supprimé"); render(); }
