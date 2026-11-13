// Comptes clients : Supabase Auth (email + mot de passe).
import { SUPABASE_KEY, SUPABASE_URL } from "../config.js";
import { load, store } from "../state/storage.js";

const headers = token => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${token || SUPABASE_KEY}`,
  "Content-Type": "application/json",
});

function sessionFrom(data) {
  if (!data.access_token) throw new Error("Confirmez votre email avant de vous connecter.");
  return {token: data.access_token, id: data.user.id, email: data.user.email};
}

export async function signUp(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST", headers: headers(), body: JSON.stringify({email, password}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.msg || data.error_description || "Inscription impossible. Cet email est peut-être déjà utilisé.");
  return sessionFrom(data);
}

export async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST", headers: headers(), body: JSON.stringify({email, password}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("Email ou mot de passe incorrect.");
  return sessionFrom(data);
}

export const saveSession = s => store("fs_sb", s);
export const loadSession = () => load("fs_sb", null);
export const authHeaders = token => headers(token);
