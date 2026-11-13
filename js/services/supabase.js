import { SUPABASE_KEY, SUPABASE_URL } from "../config.js";

// Enregistre une commande dans la table « orders » de Supabase.
// Renvoie true si la base a accepté la commande.
export async function saveOrderToDb(order) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  const row = {
    order_ref: order.id,
    customer_name: order.nom,
    phone: order.tel,
    address: order.address,
    slot: order.slot,
    items: {
      box: order.box,
      picks: order.picks,
      extras: order.extras,
      offer: order.offer,
      sauces_offertes: order.saucesOffert,
      resume: order.resume,
    },
    total: order.total,
    tip: order.tip || 0,
  };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}
