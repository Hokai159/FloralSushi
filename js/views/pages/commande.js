import { SHOP_PHONE } from "../../config.js";
import { EXTRA_ITEMS } from "../../data/extras.js";
import { sizeLabel } from "../../domain/extras.js";
import { orderText } from "../../services/orders.js";
import { load } from "../../state/storage.js";
import { eur } from "../../utils/format.js";

export function pageCommande(id) {
  const o = load("fs_orders", []).find(x => x.id === id);
  if (!o) return `<section class="page-head"><div class="wrap"><h1 class="display">Commande introuvable</h1>
    <a class="btn" href="#accueil" style="margin-top:20px">Accueil</a></div></section>`;
  return `
  <section class="page-head"><div class="wrap" style="text-align:center">
    <span class="ok-badge">✓</span>
    <h1 class="display" style="margin-top:20px">Merci !</h1>
    <p style="margin:auto">Commande <b>${o.id}</b> enregistrée. Livraison : ${o.slot}.</p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap" style="max-width:640px">
    <div class="panel reveal">
      <h2>${o.box}</h2>
      ${Object.entries(o.picks).map(([n,q]) => `<div class="row"><span>${q} × ${n}</span></div>`).join("")}
      ${(o.extras||[]).map(x => `<div class="row"><span>${x.qty} × ${EXTRA_ITEMS[x.k].name} (${sizeLabel(x.k,x.size)})</span></div>`).join("")}
      ${o.offer ? `<div class="row offer"><span>${o.offer}</span></div>` : ""}
      <div class="row fee"><span>Livraison</span><span>${eur(o.delivery||0)}</span></div>
      ${o.tip ? `<div class="row fee"><span>Pourboire</span><span>${eur(o.tip)}</span></div>` : ""}
      <div class="total-big">${eur(o.total)}</div>
      ${o.saucesPref ? `<p class="note">Sauces offertes : ${o.saucesPref}</p>` : ""}
      <p class="note">${o.nom || ""} · ${o.tel || ""}</p>
      ${SHOP_PHONE ? `<a class="btn" href="https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(orderText(o))}" target="_blank" rel="noopener" style="margin-top:14px">Confirmer par WhatsApp <span class="arrow">→</span></a>` : ""}
      <p class="note">${o.address.numero} ${o.address.rue}${o.address.complement ? ", " + o.address.complement : ""}, ${o.address.cp} ${o.address.ville}<br>Paiement : ${o.payment}</p>
    </div>
  </div></section>`;
}

/* Pages d'information */
