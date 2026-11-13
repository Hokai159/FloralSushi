// Fidélité : 2,50 points par euro. Une jauge de 500 points, qui repart à zéro ensuite.
// Les lots se débloquent à 50, 150, 250 et 500 points et se gardent pour la commande suivante.
export const RATIO = 2.5;
export const CYCLE = 500;
export const LOTS = [
  {seuil: 50, key: "petit", label: "Une boisson offerte", resume: "1 × boisson offerte"},
  {seuil: 150, key: "moyen", label: "4 California classique offerts", resume: "4 × California classique offerts"},
  {seuil: 250, key: "grand", label: "1 Golden offert", resume: "1 × Golden offert"},
  {seuil: 500, key: "mini", label: "1 Mini box offerte", resume: "1 × Mini box offerte"},
];

// Points gagnés sur les commandes déjà passées
export function pointsOf(orders) {
  return orders.reduce((t, o) => t + Math.floor(Number(o.total) * RATIO), 0);
}

// Lots disponibles : débloqués et pas encore utilisés (une commande = un lot au plus)
export function rewardsOf(orders) {
  const points = pointsOf(orders);
  const cycle = Math.floor(points / CYCLE);
  const progress = points % CYCLE;
  const utilises = new Set(orders.map(o => o.reward).filter(Boolean));
  const dispo = [];
  for (let c = 0; c <= cycle; c++) {
    for (const lot of LOTS) {
      const debloque = c < cycle || lot.seuil <= progress;
      const key = `${c}-${lot.key}`;
      if (debloque && !utilises.has(key)) dispo.push({key, lot});
    }
  }
  return dispo;
}

export function gaugeOf(orders) {
  const points = pointsOf(orders);
  return {points, progress: points % CYCLE, cycle: Math.floor(points / CYCLE)};
}
