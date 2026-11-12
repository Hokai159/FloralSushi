import { DELIVERY_FEE } from "../../config.js";
import { eur } from "../../utils/format.js";
import { boxCards } from "../components/cards.js";

export function pageBoxes() {
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Nos box</span>
    <h1 class="display">Votre box, <span style="color:var(--gold)">votre choix</span></h1>
    <p>Composez la vôtre dans les quotas de chaque grade, ou prenez une box déjà faite.</p>
  </div></section>
  <section style="padding-top:20px"><div class="wrap">
    ${boxCards()}
    <p class="note" style="margin-top:24px">Livraison : ${eur(DELIVERY_FEE)}.</p>
  </div></section>`;
}
