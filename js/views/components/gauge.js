import { CYCLE, LOTS, gaugeOf, rewardsOf } from "../../domain/loyalty.js";

// Jauge de fidélité : une barre, puis un coffret par lot.
// Un lot disponible s'ouvre au toucher ; un lot pas encore atteint indique les points manquants.
export function gaugeHtml(orders) {
  const g = gaugeOf(orders);
  const dispo = rewardsOf(orders);
  const pct = Math.min(100, Math.round((g.progress / CYCLE) * 100));
  return `
  <div class="panel reveal gauge">
    <div class="gauge-head">
      <h2>Fidélité</h2>
      <span class="gauge-score">${g.progress} / ${CYCLE} pts</span>
    </div>
    <div class="gauge-bar"><span style="width:${pct}%"></span></div>
    <p class="note">2,50 points par euro dépensé. Total cumulé : ${g.points} points.</p>
    <div class="coffrets">${LOTS.map(l => {
      const disponible = dispo.some(r => r.lot.key === l.key);
      const atteint = disponible || g.cycle > 0 || g.progress >= l.seuil;
      const etat = disponible ? "dispo" : (atteint ? "utilise" : "verrou");
      const manque = Math.max(0, l.seuil - g.progress);
      const texte = disponible ? "Touchez pour ouvrir" : (atteint ? "Déjà utilisé" : `Encore ${manque} pts`);
      return `
      <button class="coffret ${etat}" ${disponible ? `onclick="tapLot('${l.key}', this)"` : "disabled"}>
        <span class="coffret-icon">🍱</span>
        <span class="coffret-seuil">${l.seuil} pts</span>
        <span class="coffret-label">${l.label}</span>
        <span class="coffret-etat">${texte}</span>
      </button>`;
    }).join("")}
    </div>
  </div>`;
}
