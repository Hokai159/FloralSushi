import { TYPES, gradeOf, matchesProtein, typeOf } from "../../data/menu.js";
import { proteinChips } from "../components/filters.js";
import { state } from "../../state/state.js";
import { jsStr } from "../../utils/format.js";

// Filtre par protéine en haut (Tous, Saumon, Thon, Poulet, Autres).
// Les sushis sont affichés par rubrique de type (Maki, California roll, Frits),
// et chaque rubrique reste visible même si le filtre ne retient rien.
export function pageCarte() {
  const sections = TYPES.filter(t => t.id !== "tous");
  const protein = state.protein;
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Notre carte</span>
    <h1 class="display">La carte</h1>
    <p>Filtrez par protéine. Cliquez sur « i » pour voir la photo, les ingrédients et les allergènes.</p>
    ${proteinChips()}
    <a class="banner" href="#boxes">Composer ma box <span class="arrow">→</span></a>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    ${sections.map(t => {
      const items = Object.entries(gradeOf).filter(([n,g]) => typeOf(n,g) === t.id && matchesProtein(n, protein));
      return `
      <div class="gtitle"><h2>${t.label}</h2><span class="count">${items.length}</span></div>
      ${items.length ? `<div class="items">${items.map(([n,g]) => `
        <div class="item">
          <div class="head"><div><span class="type">${g}</span><b style="display:block">${n}</b></div>
            <button class="info-btn" onclick="openItem('${jsStr(n)}')" aria-label="Ingrédients et allergènes">i</button></div>
          <button class="link-btn" style="text-align:left;margin-top:8px" onclick="openItem('${jsStr(n)}')">Ingrédients et allergènes →</button>
        </div>`).join("")}</div>`
        : `<div class="notice">${protein !== "tous" ? `Aucun ${t.label.toLowerCase()} au ${protein} pour le moment.` : "Bientôt disponible."}</div>`}`;
    }).join("")}
  </div></section>`;
}
