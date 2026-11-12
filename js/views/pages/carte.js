import { PROTEINS, TYPES, gradeOf, ingredientsOf, matchesProtein, primaryProtein, typeOf } from "../../data/menu.js";
import { proteinChips } from "../components/filters.js";
import { state } from "../../state/state.js";
import { jsStr } from "../../utils/format.js";

// Rubriques rangées par protéine (Saumon, Thon, Poulet, Autres).
// Le filtre par type (California, Maki, Frits) est en haut de la page.
export function pageCarte(filter) {
  const activeType = TYPES.some(t => t.id === filter) ? filter : "tous";
  const sections = PROTEINS.filter(p => p.id !== "tous");
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Notre carte</span>
    <h1 class="display">La carte</h1>
    <p>Cliquez sur « i » pour voir la photo, les ingrédients et les allergènes.</p>
    <div class="tabs">${TYPES.map(t => `<a href="#carte/${t.id}" class="${t.id === activeType ? "on" : ""}">${t.label}</a>`).join("")}</div>
    ${proteinChips()}
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    ${sections.filter(p => state.protein === "tous" || state.protein === p.id).map(p => {
      const items = Object.entries(gradeOf).filter(([n,g]) =>
        primaryProtein(n) === p.id && (activeType === "tous" || typeOf(n,g) === activeType));
      return `
      <div class="gtitle"><h2>${p.label}</h2><span class="count">${items.length}</span></div>
      ${items.length ? `<div class="items">${items.map(([n,g]) => `
        <div class="item">
          <div class="head"><div><span class="type">${g} · ${TYPES.find(t => t.id === typeOf(n,g)).label}</span><b style="display:block">${n}</b></div>
            <button class="info-btn" onclick="openItem('${jsStr(n)}')" aria-label="Ingrédients et allergènes">i</button></div>
          <small>${ingredientsOf[n]}</small>
          <button class="link-btn" style="text-align:left;margin-top:8px" onclick="openItem('${jsStr(n)}')">Ingrédients et allergènes →</button>
        </div>`).join("")}</div>`
        : `<div class="notice">Aucun sushi ${p.id === "autres" ? "sans protéine" : "au " + p.label.toLowerCase()}${activeType !== "tous" ? " dans la rubrique " + TYPES.find(t => t.id === activeType).label : ""} pour le moment.</div>`}`;
    }).join("")}
  </div></section>`;
}
