import { ALLERGENES, gradeOf, ingredientsOf, typeLabel, typeOf } from "../../data/menu.js";
import { IMAGES } from "../../data/images.js";
import { ALLERGEN_INFO } from "../../data/allergens.js";
import { jsStr } from "../../utils/format.js";
import { toast } from "./toast.js";

export function openItem(name) {
  const grade = gradeOf[name];
  const allergens = ALLERGENES[name] || [];
  const chips = allergens.length
    ? allergens.map(a => {
        const info = ALLERGEN_INFO[a] || {icon:"⚠️", text:a};
        return `<span class="allergen" tabindex="0" data-tip="${info.text}" title="${info.text}">${info.icon} ${a}</span>`;
      }).join("")
    : `<span class="chip none">Aucun allergène listé</span>`;
  document.getElementById("modalCard").innerHTML = `
    <button class="modal-close" onclick="closeItem()" aria-label="Fermer">×</button>
    <span class="eyebrow">${grade} · ${typeLabel(typeOf(name, grade))}</span>
    <h2>${name}</h2>
    ${typeOf(name, grade) === "california" && grade !== "Golden" ? `<div class="tabs" style="margin:6px 0">
      <button class="on" onclick="setVariante('${jsStr(name)}','sesame',this)">Sésame</button>
      <button onclick="setVariante('${jsStr(name)}','crispy',this)">Crispy (oignon frit)</button></div>` : ""}
    <img id="itemPhoto" class="item-photo" src="${IMAGES[name] || ""}" alt="${name}" style="${IMAGES[name] ? "" : "display:none"}">
    <h3>Ingrédients</h3>
    <p>${ingredientsOf[name]}</p>
    <h3>Allergènes</h3>
    <div class="chips">${chips}</div>
    ${allergens.length ? `<ul class="allergen-legend">${allergens.map(a => `<li>${(ALLERGEN_INFO[a]||{icon:"⚠️"}).icon} <b>${a}</b> : ${(ALLERGEN_INFO[a]||{text:a}).text}</li>`).join("")}</ul>` : ""}
    <p class="allergen-note">Informations indicatives, à partir de la recette habituelle. Signalez toute allergie avant de commander : nous ne pouvons pas garantir l'absence de traces.</p>`;
  document.getElementById("modal").classList.add("open");
}

// Option sésame ou crispy : change la photo quand elle existe
export function setVariante(name, variante, bouton) {
  const img = document.getElementById("itemPhoto");
  const src = IMAGES[name + " · " + variante];
  if (bouton) bouton.parentElement.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === bouton));
  if (src) { img.src = src; img.style.display = ""; }
  else { img.style.display = "none"; toast("Photo « " + variante + " » à venir."); }
}

export function closeItem() { document.getElementById("modal").classList.remove("open"); }
