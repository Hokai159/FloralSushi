import { PROTEINS, TYPES, gradeOf, ingredientsOf, matchesProtein, typeLabel, typeOf } from "../../data/menu.js";
import { proteinChips } from "../components/filters.js";
import { state } from "../../state/state.js";
import { jsStr } from "../../utils/format.js";

// Une rubrique par type (Maki, California, Frits). Les rubriques restent visibles
// même quand le filtre par protéine ne retient aucun sushi.
export function pageCarte(filter) {
  const active = TYPES.some(t => t.id === filter) ? filter : "tous";
  const shown = TYPES.filter(t => t.id !== "tous" && (active === "tous" || t.id === active));
  const protein = PROTEINS.find(p => p.id === state.protein)?.label || "";
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Notre carte</span>
    <h1 class="display">La carte</h1>
    <p>Cliquez sur « i » pour voir la photo, les ingrédients et les allergènes.</p>
    <div class="tabs">${TYPES.map(t => `<a href="#carte/${t.id}" class="${t.id === active ? "on" : ""}">${t.label}</a>`).join("")}</div>
    ${proteinChips()}
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    ${shown.map(t => {
      const items = Object.entries(gradeOf).filter(([n,g]) => typeOf(n,g) === t.id && matchesProtein(n, state.protein));
      return `
      <div class="gtitle"><h2>${t.label}</h2><span class="count">${items.length}</span></div>
      ${items.length ? `<div class="items">${items.map(([n,g]) => `
        <div class="item">
          <div class="head"><div><span class="type">${g}</span><b style="display:block">${n}</b></div>
            <button class="info-btn" onclick="openItem('${jsStr(n)}')" aria-label="Ingrédients et allergènes">i</button></div>
          <small>${ingredientsOf[n]}</small>
          <button class="link-btn" style="text-align:left;margin-top:8px" onclick="openItem('${jsStr(n)}')">Ingrédients et allergènes →</button>
        </div>`).join("")}</div>`
        : `<div class="notice">Aucun ${t.label.toLowerCase()}${protein && state.protein !== "tous" ? " au " + protein.toLowerCase() : ""} pour le moment.</div>`}`;
    }).join("")}
  </div></section>`;
}
