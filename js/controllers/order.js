import { saveOrderToDb } from "../services/supabase.js";
import { ZONE_VILLES } from "../config.js";
import { BOXES } from "../data/boxes.js";
import { ALLERGENES } from "../data/menu.js";
import { deliveryFee, extraLines, grandTotal, tipAmount } from "../domain/cart.js";
import { offerItems } from "../domain/offers.js";
import { buildResume, sendOrder } from "../services/orders.js";
import { state } from "../state/state.js";
import { load, store } from "../state/storage.js";
import { toast } from "../views/components/toast.js";

export async function placeOrder(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const addr = {rue:f.get("rue"), numero:f.get("numero"), complement:f.get("complement"), cp:f.get("cp"), ville:(f.get("ville")||"").trim()};
  if (!ZONE_VILLES.map(v=>v.toLowerCase()).includes(addr.ville.toLowerCase())) {
    toast("Désolé, nous ne livrons pas encore à cette ville."); return;
  }
  if (!f.get("slot")) { toast("Choisissez un créneau de livraison."); return; }
  if (!/^[0-9+\s.()-]{8,}$/.test(f.get("tel") || "")) { toast("Numéro de téléphone invalide."); return; }
  const box = state.cart.box ? BOXES[state.cart.box] : null;
  const offered = {sucree: parseInt(f.get("sauce_sucree"), 10) || 0, salee: parseInt(f.get("sauce_salee"), 10) || 0};
  if (box && offered.sucree + offered.salee > box.sauces) { toast(`Maximum ${box.sauces} sauce(s) offerte(s) avec cette box.`); return; }
  if (!box && offered.sucree + offered.salee > 0) { toast("Aucune sauce offerte sans box."); return; }
  const order = {
    id: "FS" + Date.now().toString().slice(-6),
    date: new Date().toLocaleString("fr-FR"),
    nom: (f.get("nom") || "").trim(), tel: (f.get("tel") || "").trim(),
    box: box ? box.name : "Extras seuls",
    picks: box ? state.cart.picks : {},
    extras: extraLines().map(([k,e]) => ({k, size:e.size, qty:e.qty})),
    offer: box ? offerItems(box).map(o => o.label).join(" + ") : null,
    resume: buildResume(box, offered),
    delivery: deliveryFee(), tip: tipAmount(),
    total: grandTotal(), address: addr, slot: f.get("slot"),
    payment: "À régler à la livraison (démo)"
  };
  const sent = await sendOrder(order);
  await saveOrderToDb(order);
  const orders = load("fs_orders", []); orders.push(order); store("fs_orders", orders);
  state.cart = {box:null, mode:null, picks:{}, extras:{}, tip:{on:false, amount:0}}; store("fs_cart", state.cart);
  state.draft = {};
  order.sent = sent;
  store("fs_orders", orders);
  if (!sent) toast("Commande enregistrée. Pensez à nous confirmer par téléphone ou WhatsApp.");
  location.hash = "commande/" + order.id;
}

/* ===== FICHE INGREDIENTS / ALLERGENES ===== */
