// Commandes du client connecté (historique, favori).
import { SUPABASE_URL } from "../config.js";
import { state } from "../state/state.js";
import { authHeaders } from "./auth.js";

export async function fetchMyOrders() {
  if (!state.session) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?customer_id=eq.${state.session.id}&select=*&order=created_at.desc`,
    {headers: authHeaders(state.session.token)});
  return res.ok ? res.json() : [];
}

// Produit le plus commandé, toutes commandes confondues
export function favoriOf(orders) {
  const compte = {};
  for (const o of orders) {
    const it = o.items || {};
    for (const n in (it.picks || {})) compte[n] = (compte[n] || 0) + it.picks[n];
    for (const x of (it.extras || [])) {
      const nom = x.k;
      compte[nom] = (compte[nom] || 0) + x.qty;
    }
  }
  const tri = Object.entries(compte).sort((a, b) => b[1] - a[1]);
  return tri.length ? {nom: tri[0][0], quantite: tri[0][1]} : null;
}
