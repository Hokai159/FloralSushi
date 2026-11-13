import { POKE_OPTIONS, POKE_SIZES } from "../../data/poke.js";
import { pokeExtrasOf, pokeIsValid, pokePrice } from "../../domain/poke.js";
import { state } from "../../state/state.js";
import { esc, eur } from "../../utils/format.js";
import { jsStr } from "../../utils/format.js";

// Constructeur de poké bowl : choisir une taille puis les ingrédients.
// Les ingrédients compris sont gratuits ; les ajouts sont facturés.
export function pagePoke() {
  const d = state.pokeDraft;
  const price = pokePrice(d.size, d);
  const valid = pokeIsValid(d);
  const extras = pokeExtrasOf(d);
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Poké bowl</span>
    <h1 class="display">Composez votre bowl</h1>
    <p>Choisissez une taille, puis vos ingrédients. Les ingrédients compris sont inclus dans le prix.</p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    <div class="gtitle"><h2>Taille</h2></div>
    <div class="tabs">${POKE_SIZES.map(s => `<button class="${d.size === s.id ? "on" : ""}" onclick="setPokeSize('${s.id}')">${s.label} · ${eur(s.price)}</button>`).join("")}</div>
    ${Object.keys(POKE_OPTIONS).map(key => {
      const o = POKE_OPTIONS[key];
      const chosen = d[key] || [];
      return `
      <div class="gtitle"><h2>${o.label}</h2>
        <span class="sup">${o.included} inclus${o.min ? " (obligatoire)" : ""} · +${eur(o.extra)} par ajout</span></div>
      <div class="tabs">${o.items.map(item => `
        <button class="${chosen.includes(item) ? "on" : ""}" onclick="togglePokeOption('${key}','${jsStr(item)}')">${esc(item)}</button>`).join("")}</div>
      <p class="note" style="margin-top:8px">${chosen.length} choisi(s)</p>`;
    }).join("")}
    <div class="panel reveal" style="margin-top:28px">
      <h2>Votre bowl</h2>
      <div class="row"><span>Taille ${esc(POKE_SIZES.find(s => s.id === d.size).label)}</span><span>${eur(POKE_SIZES.find(s => s.id === d.size).price)}</span></div>
      ${extras.map(x => `<div class="row"><span>${x.count} ${esc(x.label.toLowerCase())} en plus</span><span>${eur(x.cost)}</span></div>`).join("")}
      <div class="total-big">${eur(price)}</div>
      <button class="btn" onclick="addPoke()" ${valid ? "" : "disabled"}>Ajouter au panier <span class="arrow">→</span></button>
      ${valid ? "" : `<p class="note" style="margin-top:10px">Choisissez au moins une protéine et une sauce.</p>`}
    </div>
  </div></section>`;
}
