import { TYPES, gradeOf, ingredientsOf, typeLabel, typeOf } from "../../data/menu.js";
import { jsStr } from "../../utils/format.js";
import { openItem } from "../components/modal.js";

export function pageCarte(filter) {
  const active = TYPES.some(t => t.id === filter) ? filter : "tous";
  const entries = Object.entries(gradeOf).filter(([n,g]) => active === "tous" || typeOf(n,g) === active);
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Notre carte</span>
    <h1 class="display">La carte</h1>
    <p>Triez par type de sushi. Cliquez sur « i » pour voir ingrédients et allergènes.</p>
    <div class="tabs">${TYPES.map(t => `<a href="#carte/${t.id}" class="${t.id===active?"on":""}">${t.label}</a>`).join("")}</div>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    <div class="items">
    ${entries.map(([n,g]) => `
      <div class="item">
        <div class="head"><div><span class="type">${g} · ${typeLabel(typeOf(n,g))}</span><b style="display:block">${n}</b></div>
          <button class="info-btn" onclick="openItem('${jsStr(n)}')" aria-label="Ingrédients et allergènes">i</button></div>
        <small>${ingredientsOf[n]}</small>
        <button class="link-btn" style="text-align:left;margin-top:8px" onclick="openItem('${jsStr(n)}')">Ingrédients et allergènes →</button>
      </div>`).join("")}
    </div>
    ${entries.length ? "" : `<div class="notice" style="margin-top:20px">Aucun sushi dans cette catégorie pour le moment.</div>`}
  </div></section>`;
}
