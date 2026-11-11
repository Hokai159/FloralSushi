export const MENU = {
  Classique: [
    ["California Saumon Fromage","Saumon, fromage"],
    ["California Saumon Avocat","Saumon, avocat"],
    ["California Smoky","Saumon fumé, cheese, ciboulette"],
    ["California Vegetable","Légumes de saison"],
    ["California Thon Avocat","Thon, avocat"],
    ["Californian Thon Boursin","Thon, boursin"],
    ["California Poulet Fromage","Poulet, fromage"],
    ["Maki Saumon Avocat Fromage Poivron chèvre","Saumon, avocat, fromage, poivron, chèvre"]
  ],
  Signature: [
    ["California Chicken","Poulet, carotte, oignon, cheese, salade, oignons frits, sauce algérienne"],
    ["California Avocado Saumon","Saumon, cheese, crème d'avocat"],
    ["California Salmon Spicy","Saumon, cheese, sauce mayo spicy, oignons frits"],
    ["California Mimosa","Oeuf, thon, cheese, asperge, mayonnaise"],
    ["California Tempura","Crevette tempura, cheese, avocat, mayonnaise"],
    ["California Avocado Poulet Karaage","Poulet karaage, cheese, crème d'avocat, mayonnaise"],
    ["California Aburi Roll","Saumon, avocat, saumon flambé, cheese"],
    ["California Italia Fusion","Tomate séchée, chèvre, jambon cru, pesto vert"]
  ],
  Golden: [
    ["Golden Poulet Cheddar","Poulet, cheddar, cheese, frit"],
    ["Golden Atlantic Spicy","Saumon, crevette, cheese, mayo spicy, frit"],
    ["Golden Campagnard","Poulet, chèvre, miel, frit"]
  ]
};

export const GRADES = ["Classique","Signature","Golden"];

/* Allergènes : base indicative (sauce soja) + ingrédients listés */

export const A = (...extra) => ["Gluten","Soja", ...extra];

export const ALLERGENES = {
  "California Saumon Fromage": A("Poisson","Lait"),
  "California Saumon Avocat": A("Poisson"),
  "California Smoky": A("Poisson","Lait"),
  "California Vegetable": A(),
  "California Thon Avocat": A("Poisson"),
  "Californian Thon Boursin": A("Poisson","Lait"),
  "California Poulet Fromage": A("Lait"),
  "Maki Saumon Avocat Fromage Poivron chèvre": A("Poisson","Lait"),
  "California Chicken": A("Œufs","Moutarde","Lait"),
  "California Avocado Saumon": A("Poisson","Lait"),
  "California Salmon Spicy": A("Poisson","Lait","Œufs"),
  "California Mimosa": A("Œufs","Poisson","Lait"),
  "California Tempura": A("Crustacés","Œufs","Lait"),
  "California Avocado Poulet Karaage": A("Œufs","Lait"),
  "California Aburi Roll": A("Poisson","Lait"),
  "California Italia Fusion": A("Lait"),
  "Golden Poulet Cheddar": A("Œufs","Lait"),
  "Golden Atlantic Spicy": A("Poisson","Crustacés","Œufs","Lait"),
  "Golden Campagnard": A("Œufs","Lait")
};

/* Onglets de la carte */

export const TYPES = [
  {id:"tous", label:"Tous"},
  {id:"california", label:"California roll"},
  {id:"maki", label:"Maki"},
  {id:"frits", label:"Frits (Golden)"}
];

export function typeOf(name, grade) {
  if (grade === "Golden") return "frits";
  if (name.startsWith("Maki")) return "maki";
  return "california";
}

export function typeLabel(id) { return TYPES.find(t => t.id === id)?.label || ""; }

/* Box à composer et box préfaites */

export const gradeOf = {};

for (const g in MENU) MENU[g].forEach(([n]) => gradeOf[n] = g);

export const ingredientsOf = {};

for (const g in MENU) MENU[g].forEach(([n,i]) => ingredientsOf[n] = i);

/* ===== ETAT ===== */
