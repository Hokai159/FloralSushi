import { ALLERGENES, gradeOf, ingredientsOf, typeLabel, typeOf } from "../../data/menu.js";

export function openItem(name) {
  const grade = gradeOf[name];
  const allergens = ALLERGENES[name] || [];
  const chips = allergens.length
    ? allergens.map(a => `<span class="chip">${a}</span>`).join("")
    : `<span class="chip none">Aucun allergène listé</span>`;
  document.getElementById("modalCard").innerHTML = `
    <button class="modal-close" onclick="closeItem()" aria-label="Fermer">×</button>
    <span class="eyebrow">${grade} · ${typeLabel(typeOf(name, grade))}</span>
    <h2>${name}</h2>
    <h3>Ingrédients</h3>
    <p>${ingredientsOf[name]}</p>
    <h3>Allergènes</h3>
    <div class="chips">${chips}</div>
    <p class="allergen-note">Informations indicatives, à partir de la recette habituelle. Signalez toute allergie avant de commander : nous ne pouvons pas garantir l'absence de traces.</p>`;
  document.getElementById("modal").classList.add("open");
}

export function closeItem() { document.getElementById("modal").classList.remove("open"); }
