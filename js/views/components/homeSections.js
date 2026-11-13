import { NOUVEAUTES, EDITIONS } from "../../data/home.js";
import { SHOP_EMAIL } from "../../config.js";

// Nouveautés, éditions limitées et demande de devis pour les événements
export function homeSections() {
  const news = NOUVEAUTES.length
    ? NOUVEAUTES.map(n => `<div class="card"><h3>${n.nom}</h3><p class="note">${n.description}</p></div>`).join("")
    : `<div class="card"><p class="note">Nos nouveautés arrivent bientôt.</p></div>`;
  const editions = EDITIONS.length
    ? EDITIONS.map(e => `<div class="card"><span class="tag-pre">${e.periode}</span><h3>${e.titre}</h3><p class="note">${e.description}</p></div>`).join("")
    : `<div class="card"><span class="tag-pre">Bientôt</span><h3>Box édition limitée</h3><p class="note">Noël, Halloween, Saint-Valentin : des box spéciales, en quantité limitée.</p></div>`;
  const devisLink = SHOP_EMAIL
    ? `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent("Demande de devis : événement")}`
    : "#contact";
  return `
  <section>
    <div class="wrap">
      <span class="eyebrow">Nouveautés</span>
      <h2 class="display section-title reveal">Ce qui arrive</h2>
      <div class="grades">${news}</div>
    </div>
  </section>
  <section style="padding-top:0">
    <div class="wrap">
      <span class="eyebrow">Éditions limitées</span>
      <h2 class="display section-title reveal">Box spéciales</h2>
      <div class="grades">${editions}</div>
    </div>
  </section>
  <section style="padding-top:0">
    <div class="wrap">
      <div class="panel reveal" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
        <div><span class="eyebrow">Événements</span><h2 class="section-title" style="font-size:2.2rem">Mariage, anniversaire, entreprise</h2>
        <p class="note">Demandez un devis pour votre événement.</p></div>
        <a class="btn" href="${devisLink}">Demander un devis <span class="arrow">→</span></a>
      </div>
    </div>
  </section>`;
}
