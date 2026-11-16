// Commandes du client connecté (historique, fidélité, favori).
import { SUPABASE_URL } from "../config.js";
import { state } from "../state/state.js";
import { authCall } from "./auth.js";

export async function fetchMyOrders() {
  if (!state.session) return [];
  const r = await authCall(`${SUPABASE_URL}/rest/v1/orders?customer_id=eq.${state.session.id}&select=*&order=created_at.desc`);
  return r.ok ? r.res.json() : [];
}

// Produit le plus commandé, toutes commandes confondues
export function favoriOf(orders) {
  const compte = {};
  for (const o of orders) {
    const it = o.items || {};
    for (const n in (it.picks || {})) compte[n] = (compte[n] || 0) + it.picks[n];
    for (const x of (it.extras || [])) compte[x.k] = (compte[x.k] || 0) + x.qty;
  }
  const tri = Object.entries(compte).sort((a, b) => b[1] - a[1]);
  return tri.length ? {nom: tri[0][0], quantite: tri[0][1]} : null;
}
