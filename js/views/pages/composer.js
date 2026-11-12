import { GOLDEN_SUPPLEMENT } from "../../config.js";
import { changePick } from "../../controllers/cart.js";
import { BOXES } from "../../data/boxes.js";
import { GRADES, MENU, matchesProtein, typeLabel, typeOf } from "../../data/menu.js";
import { boxTotal, canAdd, counts, isComplete } from "../../domain/cart.js";
import { state } from "../../state/state.js";
import { eur, jsStr } from "../../utils/format.js";
import { openItem } from "../components/modal.js";
import { toast } from "../components/toast.js";
import { proteinChips } from "../components/filters.js";

export function pageComposer() {
  if (!state.cart.box) return `
    <section class="page-head"><div class="wrap">
      <span class="eyebrow">Composer</span>
      <h1 class="display">Votre box</h1>
      <div class="notice" style="margin-top:20px">Choisissez d'abord une box à composer.</div>
      <a class="btn" href="#boxes" style="margin-top:20px">Voir les box <span class="arrow">→</span></a>
    </div></section>`;
  const b = BOXES[state.cart.box], c = counts();
  if (b.fixed) return `<section class="page-head"><div class="wrap"><span class="eyebrow">Box déjà faite</span><h1 class="display">${b.name}</h1>
    <p>Cette box est déjà composée, elle ne se modifie pas.</p>
    <a class="btn" href="#panier" style="margin-top:20px">Voir mon panier <span class="arrow">→</span></a></div></section>`;
  const pct = (c.total/b.pieces)*100;
  const left = b.pieces - c.total;
  const complete = isComplete();
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Composer</span>
    <h1 class="display">${b.name}</h1>
    <p>${b.pieces} pièces à répartir selon les quotas de chaque grade.${b.baguettes ? " 🥢 " + b.baguettes + " paire(s) de baguettes offerte(s)." : ""}${b.sauces ? " 🥫 " + b.sauces + " sauce(s) offerte(s)." : ""} Cliquez sur « i » pour voir ingrédients et allergènes.</p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    ${proteinChips()}
    ${GRADES.map(g => renderGrade(g)).join("")}
    <div class="dock">
      <div class="info">
        <b>${complete ? "Box complète ✓" : `Plus que ${left} sushi${left>1?"s":""}`}</b>
        <div class="track2"><span style="width:${pct}%"></span></div>
      </div>
      <div class="total">${eur(boxTotal())}</div>
      <a class="btn" href="${complete?"#extras":"#composer"}" ${complete?"":'onclick="toast(\'Complétez votre box pour continuer.\');return false"'}>Continuer <span class="arrow">→</span></a>
    </div>
  </div></section>`;
}

export function renderGrade(g) {
  const b = BOXES[state.cart.box], c = counts();
  return `
  <div class="gtitle">
    <h2>${g}</h2><span class="count">${c[g]} / ${b.quota[g]}</span>
    ${g === "Golden" ? `<span class="sup">+${GOLDEN_SUPPLEMENT} € / rouleau</span>` : ""}
  </div>
  <div class="items">
  ${MENU[g].filter(([n]) => matchesProtein(n, state.protein)).map(([n,i]) => {
    const q = state.cart.picks[n] || 0, n2 = jsStr(n);
    return `<div class="item ${q?"picked":""}">
      <div class="head"><div><span class="type">${typeLabel(typeOf(n,g))}</span><b style="display:block">${n}</b></div>
        <button class="info-btn" onclick="openItem('${n2}')" aria-label="Ingrédients et allergènes">i</button></div>
      <small>${i}</small>
      <div class="qty">
        <button onclick="changePick('${n2}',-1)" ${q?"":"disabled"} aria-label="Retirer">−</button>
        <span class="n">${q}</span>
        <button onclick="changePick('${n2}',1)" ${canAdd(n)?"":"disabled"} aria-label="Ajouter">+</button>
      </div></div>`;
  }).join("")}
  </div>${MENU[g].some(([n]) => matchesProtein(n, state.protein)) ? "" : `<div class="notice">Aucun sushi ${g.toLowerCase()} avec ce filtre.</div>`}`;
}
