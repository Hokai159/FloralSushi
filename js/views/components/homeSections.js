import { NOUVEAUTES } from "../../data/home.js";

// Nouveautés (« Ce qui arrive ») : les éditions limitées sont dans Nos box
export function homeSections() {
  const news = NOUVEAUTES.length
    ? NOUVEAUTES.map(n => `<div class="card"><h3>${n.nom}</h3><p class="note">${n.description}</p></div>`).join("")
    : `<div class="card"><p class="note">Nos nouveautés arrivent bientôt.</p></div>`;
  return `
  <section class="promo-wrap" style="padding-top:clamp(32px,5vw,56px)">
    <div class="wrap">
      <div class="promo">
      <span class="eyebrow">Nouveautés</span>
      <h2 class="display section-title reveal">Ce qui arrive</h2>
      <div class="grades">${news}</div>
      </div>
    </div>
  </section>`;
}
