import { PROTEINS } from "../../data/menu.js";
import { state } from "../../state/state.js";

// Boutons de filtre par protéine (Tous, Poulet, Saumon, Thon)
export function proteinChips() {
  return `<div class="tabs protein-filter">${PROTEINS.map(p =>
    `<button class="${state.protein === p.id ? "on" : ""}" onclick="setProtein('${p.id}')">${p.label}</button>`
  ).join("")}</div>`;
}
