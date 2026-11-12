import { FLAVORS } from "../../data/extras.js";
import { extraCard } from "../components/cards.js";

export function pageExtras() {
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Extras</span>
    <h1 class="display">Pour compléter</h1>
    <p>Ajoutez-les à votre box, ou commandez-les seuls. Choisissez le format (×4, ×8 ou ×1, ×2) directement sur chaque produit.</p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    <div class="gtitle"><h2>Friture</h2><span class="sup">Par 4 ou par 8</span></div>
    <div class="items">${extraCard("karaage")}${extraCard("tempura")}${extraCard("rings")}${extraCard("rouleau")}</div>
    <div class="gtitle"><h2>Mochis glacés</h2><span class="sup">5 parfums</span></div>
    <div class="items">${FLAVORS.map(f => extraCard("mochi_" + f.toLowerCase())).join("")}</div>
    <div class="gtitle"><h2>Autres</h2><span class="sup">Sauces et accessoires</span></div>
    <div class="items">${extraCard("sauce")}${extraCard("baguettes")}</div>
    <div style="margin-top:36px;text-align:right"><a class="btn" href="#panier">Voir mon panier <span class="arrow">→</span></a></div>
  </div></section>`;
}
