// Poké bowl : tailles, ingrédients et règles de prix.
// « included » = nombre d'ingrédients compris dans le prix de la taille.
// « extra » = prix de chaque ingrédient en plus.
export const POKE_SIZES = [
  {id:"petit", label:"Petit", price:12},
  {id:"moyen", label:"Moyen", price:15},
  {id:"grand", label:"Grand", price:18},
];

export const POKE_OPTIONS = {
  protein: {label:"Protéine", included:1, extra:2.5, min:1,
    items:["Saumon","Saumon Spicy","Saumon Aburi","Karaage Poulet","Poulet Yakitori","Crevette"]},
  toppings: {label:"Toppings", included:4, extra:1, min:0,
    items:["Carotte râpée","Concombre","Oignon cru","Tomate cerise","Avocat","Radis","Fromage frais","Maïs"]},
  graines: {label:"Toppings de graines", included:2, extra:0.5, min:0,
    items:["Oignon frit","Graine de sésame","Noix de cajou"]},
  sauce: {label:"Sauce", included:1, extra:0.5, min:1,
    items:["Soja salé","Soja sucré","Mayo spicy"]},
};
