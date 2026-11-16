import { boxCards } from "../components/cards.js";
import { homeSections } from "../components/homeSections.js";
import { IMAGES } from "../../data/images.js";

// Produits mis en avant dans le bandeau défilant (photos existantes)
const VEDETTES = [
  "Sushi Saumon", "California Saumon Avocat", "Maki Thon", "Spring Roll Saumon Avocat",
  "Gyoza", "Sashimi mixte thon saumon", "Mochi mangue", "Fuzetea pêche", "Yakitori poulet", "Sushi Thon",
];

const bandeau = () => {
  const items = VEDETTES.filter(n => IMAGES[n]).map(n =>
    `<div class="pill"><img src="${IMAGES[n]}" alt="" loading="lazy"><span>${n}</span></div>`).join("");
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${items}${items}</div></div>`;
};

export function pageAccueil() {
  return `
  <section class="hero2">
    <div class="wrap hero2-grid">
      <div class="hero2-text">
        <span class="chip reveal">✿ Fait maison · livré autour d'Amiens</span>
        <h1 class="kinetic">
          <span class="k1">Sushis</span>
          <span class="k2">faits</span>
          <span class="k3">maison</span>
        </h1>
        <p class="lead reveal">Composez votre box, prenez une box déjà faite ou créez votre poké bowl. Livraison de 18 h à 21 h.</p>
        <div class="cta-row reveal">
          <a class="btn big" href="#boxes">Composer ma box <span class="arrow">→</span></a>
          <a class="btn ghost big" href="#carte">Voir la carte</a>
        </div>
        <div class="stats reveal">
          <div><b>8</b><span>sushis par mini box</span></div>
          <div><b>3</b><span>tailles de poké</span></div>
          <div><b>2,50</b><span>points par € en fidélité</span></div>
        </div>
      </div>
      <div class="hero2-visual" aria-hidden="true">
        <div class="badge-rot">
          <svg viewBox="0 0 200 200">
            <defs><path id="cercle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
            <text><textPath href="#cercle">FAIT MAISON · LIVRÉ CHEZ VOUS · AMIENS · </textPath></text>
          </svg>
          <span class="badge-core">✿</span>
        </div>
        ${IMAGES["Sushi Saumon"] ? `<img class="float f1" src="${IMAGES["Sushi Saumon"]}" alt="">` : ""}
        ${IMAGES["Maki Saumon"] ? `<img class="float f2" src="${IMAGES["Maki Saumon"]}" alt="">` : ""}
        ${IMAGES["Gyoza"] ? `<img class="float f3" src="${IMAGES["Gyoza"]}" alt="">` : ""}
      </div>
    </div>
  </section>

  ${bandeau()}

  <section class="section-tight">
    <div class="wrap">
      <span class="eyebrow">Nos formats</span>
      <h2 class="display section-title reveal">Votre box, votre façon</h2>
      <p class="lead-sm reveal">Composez la vôtre dans les quotas, ou prenez une box déjà faite. Un format pour chaque envie.</p>
      ${boxCards()}
    </div>
  </section>

  ${homeSections()}

  <section class="section-tight">
    <div class="wrap">
      <span class="eyebrow">Pourquoi nous</span>
      <h2 class="display section-title reveal">Fait maison, chaque jour</h2>
      <div class="promises">
        <article class="promise reveal"><span class="promise-ico">🍣</span><h3>Préparé à la main</h3><p>Nos sushis sont roulés et préparés chaque jour, dans notre cuisine.</p></article>
        <article class="promise reveal" style="transition-delay:120ms"><span class="promise-ico">🛵</span><h3>Livré chez vous</h3><p>Autour d'Amiens, sur un créneau d'une heure entre 18 h et 21 h.</p></article>
        <article class="promise reveal" style="transition-delay:240ms"><span class="promise-ico">🎁</span><h3>Fidèle, ça paie</h3><p>2,50 points par euro dépensé. Un coffret de récompense à chaque palier.</p></article>
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="wrap">
      <div class="teaser">
        <div>
          <span class="eyebrow">La carte</span>
          <h2 class="display section-title" style="margin-top:6px">Plus de 20 sushis à découvrir</h2>
          <p class="lead-sm">Saumon, thon, poulet, makis, spring rolls, sashimis, gyoza et bien plus.</p>
          <a class="btn big" href="#carte">Découvrir la carte <span class="arrow">→</span></a>
        </div>
        <div class="teaser-photos" aria-hidden="true">
          ${["Sushi Thon", "Maki Avocat", "Sashimi saumon"].filter(n => IMAGES[n]).map((n, i) =>
            `<img class="tp tp${i}" src="${IMAGES[n]}" alt="">`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}
