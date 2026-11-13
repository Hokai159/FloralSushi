import { POKE_OPTIONS, POKE_SIZES } from "../data/poke.js";

// Prix d'un poké : taille + ingrédients en plus des ingrédients compris
export function pokePrice(size, selection) {
  let total = POKE_SIZES.find(s => s.id === size).price;
  for (const key in POKE_OPTIONS) {
    const opt = POKE_OPTIONS[key];
    const extras = Math.max(0, (selection[key] || []).length - opt.included);
    total += extras * opt.extra;
  }
  return Math.round(total * 100) / 100;
}

// Vérifie que le choix minimum est fait (au moins une protéine et une sauce)
export function pokeIsValid(selection) {
  return Object.keys(POKE_OPTIONS).every(key => (selection[key] || []).length >= POKE_OPTIONS[key].min);
}

// Nombre d'ingrédients en plus, par rubrique (pour l'affichage)
export function pokeExtrasOf(selection) {
  return Object.keys(POKE_OPTIONS).map(key => {
    const opt = POKE_OPTIONS[key];
    const n = Math.max(0, (selection[key] || []).length - opt.included);
    return {label: opt.label, count: n, cost: n * opt.extra};
  }).filter(x => x.count > 0);
}
