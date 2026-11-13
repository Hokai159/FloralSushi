// Profil du client (coordonnées), stocké dans la table « profiles ».
import { SUPABASE_URL } from "../config.js";
import { state } from "../state/state.js";
import { authHeaders } from "./auth.js";

export async function fetchProfile() {
  if (!state.session) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${state.session.id}&select=*`,
    {headers: authHeaders(state.session.token)});
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

export async function upsertProfile(p) {
  if (!state.session) return false;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: "POST",
    headers: {...authHeaders(state.session.token), Prefer: "resolution=merge-duplicates,return=minimal"},
    body: JSON.stringify({id: state.session.id, ...p}),
  });
  return res.ok;
}

export async function refreshProfile() {
  state.profile = await fetchProfile();
}
