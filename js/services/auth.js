// Comptes clients : Supabase Auth (email + mot de passe).
// Le jeton expire au bout d'une heure : il est renouvelé automatiquement avec le refresh token.
import { SUPABASE_KEY, SUPABASE_URL } from "../config.js";
import { load, store } from "../state/storage.js";

const headers = token => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${token || SUPABASE_KEY}`,
  "Content-Type": "application/json",
});

function sessionFrom(data) {
  if (!data.access_token) throw new Error("Confirmez votre email avant de vous connecter.");
  return {token: data.access_token, refresh: data.refresh_token, id: data.user.id, email: data.user.email};
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

// Renouvelle le jeton ; renvoie la nouvelle session, ou null si la connexion n'est plus valable
async function refreshSession(session) {
  if (!session || !session.refresh) return null;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST", headers: headers(), body: JSON.stringify({refresh_token: session.refresh}),
  });
  if (!res.ok) return null;
  const s = sessionFrom(await res.json());
  saveSession(s);
  return s;
}

// Appel à la base avec le compte connecté ; renouvelle la connexion si le jeton a expiré
export async function authCall(url, options = {}) {
  let session = loadSession();
  if (!session) return {ok: false, status: 401, text: "Non connecté."};
  const call = s => fetch(url, {...options, headers: {...headers(s.token), ...(options.headers || {})}});
  let res = await call(session);
  if (res.status === 401 || res.status === 403) {
    session = await refreshSession(session);
    if (!session) return {ok: false, status: 401, text: "Votre connexion a expiré : reconnectez-vous."};
    res = await call(session);
  }
  const text = res.ok ? "" : await res.text().catch(() => "");
  return {ok: res.ok, status: res.status, text, res};
}
