import { CYCLE, LOTS, gaugeOf } from "../../domain/loyalty.js";

// Jauge de fidélité : une barre et quatre cases-lots, à toucher pour voir le lot
export function gaugeHtml(orders) {
  const g = gaugeOf(orders);
  const pct = Math.round((g.progress / CYCLE) * 100);
  return `
  <div class="panel reveal gauge">
    <h2>Fidélité</h2>
    <p class="note">${g.progress} / ${CYCLE} points · ${g.points} points au total</p>
    <div class="bar"><span style="width:${pct}%"></span></div>
    <div class="lots">${LOTS.map(l => `
      <button class="lot ${g.progress >= l.seuil ? "ok" : ""}" onclick="tapLot('${l.key}')">
        <span class="lot-seuil">${l.seuil} pts</span>
        <span class="lot-label">${l.label}</span>
      </button>`).join("")}
    </div>
  </div>`;
}
