import { ZONE_VILLES } from "../../config.js";
import { clearBox, clearCart, saveDraft } from "../../controllers/cart.js";
import { placeOrder } from "../../controllers/order.js";
import { BOXES } from "../../data/boxes.js";
import { gradeOf } from "../../data/menu.js";
import { boxTotal, canCheckout, deliveryFee, extraLines, grandTotal, isComplete, tipAmount } from "../../domain/cart.js";
import { offerItems } from "../../domain/offers.js";
import { state } from "../../state/state.js";
import { esc, eur } from "../../utils/format.js";
import { extraRow, tipBlock } from "../components/cartParts.js";

export function pagePanier() {
  const extrasLines = extraLines().map(([k,e]) =>
    extraRow(k,e)).join("");
  const extrasBlock = `<div class="panel reveal"><h2>Extras</h2>
    ${extrasLines || `<p class="note">Aucun extra pour le moment.</p>`}
    <div style="margin-top:12px"><a class="btn ghost sm" href="#extras">Ajouter des extras</a></div></div>`;

  if (state.cart.box && !isComplete()) return `
    <section class="page-head"><div class="wrap"><span class="eyebrow">Panier</span><h1 class="display">Mon panier</h1>
      <div class="notice" style="margin-top:20px">Votre box n'est pas encore complète.</div>
      <a class="btn" href="#composer" style="margin-top:20px">Retourner composer <span class="arrow">→</span></a></div></section>`;

  if (!canCheckout()) return `
    <section class="page-head"><div class="wrap"><span class="eyebrow">Panier</span><h1 class="display">Mon panier</h1>
      <div class="notice" style="margin-top:20px">Votre panier est vide.</div>
      <a class="btn" href="#boxes" style="margin-top:20px">Choisir une box <span class="arrow">→</span></a></div></section>
    <section style="padding-top:10px"><div class="wrap" style="max-width:760px">${extrasBlock}</div></section>`;

  const b = state.cart.box ? BOXES[state.cart.box] : null;
  const boxLines = b ? Object.entries(state.cart.picks).map(([n,q]) =>
    `<div class="row"><span>${q} × ${n}</span><span></span></div>`).join("") : "";
  const boxBlock = b ? `<div class="panel reveal">
    <h2>${b.name} ${state.cart.mode==="fixed"?'<span class="tag-pre">déjà faite</span>':""}</h2>
    <button class="trash-btn" onclick="clearBox()">🗑 Retirer la box</button>
    ${boxLines}
    <div class="row"><b>Box</b><b>${eur(boxTotal())}</b></div>
  </div>` : "";

  const addr = {...(state.profile || {}), ...state.draft};
  const slots = [];
  for (let d = 0; d < 7; d++) {
    const day = new Date(); day.setDate(day.getDate() + d);
    const label = day.toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long"});
    ["18:00","19:00","20:00","21:00"].forEach(h => slots.push(`<option value="${label} ${h}">${label} à ${h}</option>`));
  }
  const card = state.profile && state.profile.card
    ? `<div class="notice" style="background:var(--ink);color:#fff">💳 ${state.profile.card.brand} ····${state.profile.card.last4} · enregistrée dans votre profil</div>`
    : `<div class="notice">Aucun moyen de paiement enregistré. <a href="#profil">Ajouter dans Mon profil</a></div>`;

  const offerRow = b ? offerItems(b).map(o => `<div class="row offer"><span>${o.label}<small>${o.note}</small></span><span>0,00 €</span></div>`).join("") : "";

  return `
  <section class="page-head"><div class="wrap"><span class="eyebrow">Panier</span><h1 class="display">Presque prêt</h1></div></section>
  <section style="padding-top:10px"><div class="wrap">
    <div class="two-col">
      <div>
        ${boxBlock}
        ${extrasBlock}
        <form class="panel reveal" onsubmit="placeOrder(event)" oninput="saveDraft(this)">
          <h2>Vos coordonnées</h2>
          <div class="two">
            <div><label>Nom</label><input name="nom" required value="${esc(addr.nom)}"></div>
            <div><label>Téléphone</label><input name="tel" type="tel" inputmode="tel" required placeholder="06 00 00 00 00" value="${esc(addr.tel)}"></div>
          </div>
          <h2 style="margin-top:26px">Livraison</h2>
          <div class="two">
            <div><label>Rue</label><input name="rue" required value="${esc(addr.rue)}"></div>
            <div><label>Numéro / bâtiment</label><input name="numero" required value="${esc(addr.numero)}"></div>
          </div>
          <label>Complément (appartement, étage, digicode)</label><input name="complement" value="${esc(addr.complement)}">
          <div class="two">
            <div><label>Code postal</label><input name="cp" required value="${esc(addr.cp)}"></div>
            <div><label>Ville</label><input name="ville" required list="villes" value="${esc(addr.ville)}">
              <datalist id="villes">${ZONE_VILLES.map(v=>`<option value="${v}">`).join("")}</datalist></div>
          </div>
          <label>Créneau de livraison</label>
          <select name="slot" required><option value="">Choisir…</option>${slots.join("")}</select>
          ${b && b.sauces ? `<div class="two"><div><label>Sauces sucrées offertes</label><input type="number" name="sauce_sucree" min="0" max="${b.sauces}" value="${esc(state.draft.sauce_sucree || "0")}"></div><div><label>Sauces salées offertes</label><input type="number" name="sauce_salee" min="0" max="${b.sauces}" value="${esc(state.draft.sauce_salee || "0")}"></div></div><p class="note">${b.sauces} sauce(s) offerte(s) avec cette box.</p>` : ""}
          <h2 style="margin-top:26px">Paiement</h2>
          ${card}
          <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:22px;flex-wrap:wrap">
            <p class="note" style="max-width:320px">Mode démonstration : aucun paiement réel n'est effectué.</p>
            <button class="btn" type="submit">Valider ma commande <span class="arrow">→</span></button>
          </div>
        </form>
      </div>
      <aside class="panel summary reveal">
        <h2>Récap</h2>
        ${b ? `<div class="row"><span>${b.name}</span><span>${eur(boxTotal())}</span></div>` : ""}
        ${extrasLines ? extraLines().map(([k,e]) => extraRow(k,e)).join("") : ""}
        ${offerRow}
        <div class="row fee"><span>Livraison</span><span>${eur(deliveryFee())}</span></div>
        ${tipBlock()}
        ${tipAmount() > 0 ? `<div class="row"><span>Pourboire</span><span>${eur(tipAmount())}</span></div>` : ""}
        <div class="total-big">${eur(grandTotal())}</div>
        <p class="note">Livraison autour d'Amiens.</p>
        <button class="trash-btn" onclick="clearCart()">🗑 Vider mon panier</button>
      </aside>
    </div>
  </div></section>`;
}
