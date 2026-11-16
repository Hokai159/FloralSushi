// Profil du client (coordonnées), stocké dans la table « profiles ».
import { SUPABASE_URL } from "../config.js";
import { state } from "../state/state.js";
import { authCall, loadSession } from "./auth.js";

export async function fetchProfile() {
  if (!state.session) return null;
  const r = await authCall(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${state.session.id}&select=*`);
  if (!r.ok) return null;
  const rows = await r.res.json();
  return rows[0] || null;
}

// Renvoie {ok, message}. Le message donne la cause en cas d'échec.
export async function upsertProfile(p) {
  const s = loadSession();
  if (!s) return {ok: false, message: "Connectez-vous pour enregistrer votre profil."};
  const r = await authCall(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: "POST",
    headers: {Prefer: "resolution=merge-duplicates,return=minimal"},
    body: JSON.stringify({id: s.id, ...p}),
  });
  if (r.ok) return {ok: true};
  return {ok: false, message: r.text ? "Enregistrement impossible : " + r.text.slice(0, 160) : "Enregistrement impossible (" + r.status + ")."};
}

export async function refreshProfile() {
  state.profile = await fetchProfile();
}
