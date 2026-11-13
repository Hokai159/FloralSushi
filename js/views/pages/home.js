import { homeSections } from "../components/homeSections.js";
import { boxCards } from "../components/cards.js";

export function pageAccueil() {
  return `
  <section class="hero">
    <div class="wrap">
      <span class="hero-kicker">✿ Fait maison · Livré chez vous</span>
      <h1 class="display">
        <span class="line"><span class="word">Sushis</span></span>
        <span class="line"><span class="word">faits</span> <span class="word">maison</span></span>
        <span class="line"><span class="word" style="color:var(--gold)">livrés</span></span>
      </h1>
      <p class="hero-sub">Composez votre box comme vous l'aimez, ou prenez une box déjà faite.</p>
      <div class="hero-cta">
        <a class="btn" href="#boxes">Choisir ma box <span class="arrow">→</span></a>
        <a class="btn ghost" href="#carte">Voir la carte</a>
      </div>
    </div>
    <svg class="flower" viewBox="0 0 200 200" aria-hidden="true">
      ${[0,72,144,216,288].map(a=>`<ellipse cx="100" cy="58" rx="36" ry="52" fill="${a%144===0?'#f1d4e0':'#7d0a2b'}" opacity=".9" transform="rotate(${a} 100 100)"/>`).join("")}
      <circle cx="100" cy="100" r="22" fill="#c99a3b"/>
    </svg>
  </section>

  <div class="band" aria-hidden="true"><div class="track">
    ${Array(2).fill(`<span>Classique <em>✿</em> Signature <em>✿</em> Golden <em>✿</em> Créations uniques <em>✿</em></span>`).join("")}
  </div></div>

  <section>
    <div class="wrap">
      <span class="eyebrow">Nos formats</span>
      <h2 class="display section-title reveal">Composer ou déjà prête</h2>
      <p class="note reveal" style="margin-top:12px">Les box à composer se remplissent à votre goût. Les box déjà faites se commandent telles quelles.</p>
      ${boxCards()}
    </div>
  </section>

  ${homeSections()}
  <section style="padding-top:0">
    <div class="wrap">
      <span class="eyebrow">La carte</span>
      <h2 class="display section-title reveal">Trois grades, un seul plaisir</h2>
      <div class="grades">
        <div class="grade c reveal"><h3>Classique</h3><p>Les essentiels : saumon, thon, poulet, avocat, fromage.</p></div>
        <div class="grade s reveal" style="transition-delay:120ms"><h3>Signature</h3><p>Nos créations maison : Aburi, Italia Fusion, Karaage, Tempura.</p></div>
        <div class="grade g reveal" style="transition-delay:240ms"><h3>Golden</h3><p>Panés et frits, pour les gourmands.</p></div>
      </div>
    </div>
  </section>`;
}
