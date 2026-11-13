import { changeExtra, chooseBox } from "../../controllers/cart.js";
import { BOXES } from "../../data/boxes.js";
import { EXTRA_ITEMS } from "../../data/extras.js";
import { state } from "../../state/state.js";
import { eur } from "../../utils/format.js";

export const baguetteTag = b => `${b.baguettes ? `<span class="offer-tag">🥢 ${b.baguettes} paire${b.baguettes>1?"s":""} de baguettes offerte${b.baguettes>1?"s":""}</span>` : ""}${b.sauces ? `<span class="offer-tag">🥫 ${b.sauces} sauce${b.sauces>1?"s":""} offerte${b.sauces>1?"s":""}</span>` : ""}`;

export function boxCards() {
  const composed = ["mini","uno","duo"].map((id,i) => composedCard(id,i)).join("");
  const discovery = ["decouverte_mini","decouverte_uno","decouverte_duo"].map((id,i) => fixedCard(id,i,true)).join("");
  const themed = ["full_poulet","full_fromage","full_frit"].map((id,i) => fixedCard(id,i,false)).join("");
  return `<div class="boxes">${composed}</div>
    <h3 class="sub-title reveal">Box découverte, déjà faites</h3>
    <div class="boxes">${discovery}</div>
    <h3 class="sub-title reveal">Mini box thématiques</h3>
    <div class="boxes">${themed}</div>`;
}

export function composedCard(id, i) {
  const b = BOXES[id];
  return `
    <div class="box reveal" style="transition-delay:${i*90}ms">
      <span class="num">${b.pieces}</span>
      <h3>${b.name}</h3>
      <p>${b.desc}</p>${baguetteTag(b)}
      <p style="font-weight:600;margin-top:10px">Classique ${b.quota.Classique} · Signature ${b.quota.Signature}</p>
      <div class="price">${eur(b.price)}</div>
      <div class="actions"><button class="btn sm" onclick="chooseBox('${id}')">Composer <span class="arrow">→</span></button></div>
    </div>`;
}

export function fixedCard(id, i, dark) {
  const b = BOXES[id];
  return `
    <div class="box ${dark?"dark":""} reveal" style="transition-delay:${i*90}ms">
      <span class="num">${b.pieces}</span>
      <h3>${b.name}</h3>
      <p>${b.desc}</p>${baguetteTag(b)}
      <div class="price">${eur(b.price)}</div>
      <div class="actions"><button class="btn ${dark?"gold":""} sm" onclick="chooseBox('${id}')">Commander <span class="arrow">→</span></button></div>
    </div>`;
}

export function extraCard(key) {
  const e = EXTRA_ITEMS[key];
  const entry = state.cart.extras[key] || {};
  const any = Object.values(entry).some(q => q > 0);
  return `<div class="item ${any?"picked":""}">
    <div class="head"><div><span class="type">${e.group}</span><b style="display:block">${e.name}</b></div></div>
    <small>${e.desc}</small>
    ${e.sizes.map(sz => {
      const q = entry[sz.n] || 0;
      return `<div class="size-row">
        <span class="size-label">${sz.label || "×" + sz.n} <em>${eur(sz.price)}</em></span>
        <div class="qty">
          <button onclick="changeExtra('${key}','${sz.n}',-1)" ${q?"":"disabled"} aria-label="Retirer">−</button>
          <span class="n">${q}</span>
          <button onclick="changeExtra('${key}','${sz.n}',1)" aria-label="Ajouter">+</button>
        </div></div>`;
    }).join("")}
  </div>`;
}
