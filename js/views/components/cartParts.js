import { removeExtra, setCustomTip, setTip, toggleTip } from "../../controllers/cart.js";
import { EXTRA_ITEMS } from "../../data/extras.js";
import { sizeLabel, sizePrice } from "../../domain/extras.js";
import { state } from "../../state/state.js";
import { eur } from "../../utils/format.js";

export function extraRow(k, e) {
  return `<div class="row"><span>${e.qty} × ${EXTRA_ITEMS[k].name} (${sizeLabel(k,e.size)})</span><span class="row-end">${eur(sizePrice(k,e.size)*e.qty)}<button class="trash" onclick="removeExtra('${k}','${e.size}')" aria-label="Retirer ${EXTRA_ITEMS[k].name}">🗑</button></span></div>`;
}

export function tipBlock() {
  const t = state.cart.tip || {on:false, amount:0};
  return `<div class="tip">
    <div class="tip-head">
      <div><b>Laisser un pourboire</b><small>Pour l'équipe et nos livreurs</small></div>
      <label class="switch"><input type="checkbox" ${t.on?"checked":""} onchange="toggleTip(this.checked)"><span class="knob"></span></label>
    </div>
    ${t.on ? `<div class="sizes" style="margin-top:14px">${[1,2,5].map(a => `<button class="size ${t.amount===a?"on":""}" onclick="setTip(${a})">${a} €</button>`).join("")}</div>
      <label>Montant libre (€)</label>
      <input type="number" min="0" step="0.5" inputmode="decimal" placeholder="Autre montant" value="${[1,2,5].includes(t.amount) || !t.amount ? "" : t.amount}" onchange="setCustomTip(this.value)">
      <p class="tip-msg">Ce pourboire pourra aider à développer Floral Sushi et à améliorer votre expérience. Merci 🌸</p>` : ""}
  </div>`;
}
