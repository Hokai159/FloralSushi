import { counts } from "../../domain/cart.js";

// Boîte du composeur : se remplit à chaque sushi ajouté
export function boxVizHtml(box) {
  const c = counts();
  const pct = Math.min(100, Math.round((c.total / box.pieces) * 100));
  return `
  <div class="boxviz" id="boxViz" aria-live="polite">
    <div class="boxviz-lid"></div>
    <div class="boxviz-body">
      <div class="boxviz-fill" style="height:${pct}%"></div>
      <div class="boxviz-count"><b>${c.total}</b> / ${box.pieces}</div>
    </div>
    <div class="boxviz-name">${box.name}</div>
  </div>`;
}
