import { NOUVEAUTES, EDITIONS } from "../../data/home.js";

// Nouveautés, éditions limitées et demande de devis pour les événements
export function homeSections() {
  const news = NOUVEAUTES.length
    ? NOUVEAUTES.map(n => `<div class="card"><h3>${n.nom}</h3><p class="note">${n.description}</p></div>`).join("")
    : `<div class="card"><p class="note">Nos nouveautés arrivent bientôt.</p></div>`;
  const editions = EDITIONS.length
    ? EDITIONS.map(e => `<div class="card"><span class="tag-pre">${e.periode}</span><h3>${e.titre}</h3><p class="note">${e.description}</p></div>`).join("")
    : `<div class="card"><span class="tag-pre">Bientôt</span><h3>Box édition limitée</h3><p class="note">Noël, Halloween, Saint-Valentin : des box spéciales, en quantité limitée.</p></div>`;
  return `
  <section class="promo-wrap" style="padding-top:clamp(32px,5vw,56px)">
    <div class="wrap">
      <div class="promo">
      <span class="eyebrow">Nouveautés</span>
      <h2 class="display section-title reveal">Ce qui arrive</h2>
      <div class="grades">${news}</div>
      <span class="eyebrow" style="margin-top:34px">Éditions limitées</span>
      <h2 class="display section-title reveal">Box spéciales</h2>
      <div class="grades">${editions}</div>
      </div>
    </div>
  </section>`;
}
