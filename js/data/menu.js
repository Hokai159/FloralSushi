export const MENU = {
  Classique: [
    ["California Saumon Fromage","Saumon, fromage, riz, feuille d'algue"],
    ["California Saumon Avocat","Saumon, avocat, riz, feuille d'algue"],
    ["California Smoky","Saumon fumé, cheese, ciboulette, riz, feuille d'algue"],
    ["California Vegetable","Légumes de saison, riz, feuille d'algue"],
    ["California Thon Avocat","Thon, avocat, riz, feuille d'algue"],
    ["Californian Thon Boursin","Thon, boursin, riz, feuille d'algue"],
    ["California Poulet Fromage","Poulet, fromage, riz, feuille d'algue"],
    ["Maki Saumon","Saumon, riz, feuille d'algue"],
    ["Maki Avocat","Avocat, riz, feuille d'algue"],
    ["Maki Fromage","Fromage, riz, feuille d'algue"],
    ["Maki Poivron chèvre","Poivron, chèvre, riz, feuille d'algue"]
  ],
  Signature: [
    ["California Chicken","Poulet, carotte, oignon, cheese, salade, oignons frits, sauce algérienne, riz, feuille d'algue"],
    ["California Avocado Saumon","Saumon, cheese, crème d'avocat, riz, feuille d'algue"],
    ["California Salmon Spicy","Saumon, cheese, sauce mayo spicy, oignons frits, riz, feuille d'algue"],
    ["California Mimosa","Oeuf, thon, cheese, asperge, mayonnaise, riz, feuille d'algue"],
    ["California Tempura","Crevette tempura, cheese, avocat, mayonnaise, riz, feuille d'algue"],
    ["California Avocado Poulet Karaage","Poulet karaage, cheese, crème d'avocat, mayonnaise, riz, feuille d'algue"],
    ["California Aburi Roll","Saumon, avocat, saumon flambé, cheese, riz, feuille d'algue"],
    ["California Italia Fusion","Tomate séchée, chèvre, jambon cru, pesto vert, riz, feuille d'algue"]
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
  "Maki Saumon": A("Poisson"),
  "Maki Avocat": A(),
  "Maki Fromage": A("Lait"),
  "Maki Poivron chèvre": A("Lait"),
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
  {id:"california", label:"California Rolls"},
  {id:"signature", label:"Signature Rolls"},
  {id:"maki", label:"Maki"},
  {id:"sushi", label:"Sushi"},
  {id:"spring", label:"Spring Rolls"},
  {id:"golden", label:"Golden Frit"},
];

export function typeOf(name, grade) {
  if (grade === "Sushi") return "sushi";
  if (grade === "Spring") return "spring";
  if (grade === "Golden") return "golden";
  if (grade === "Signature") return "signature";
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

// Filtre par protéine principale (un sushi peut être sans protéine listée)
export const PROTEINS = [
  {id:"tous", label:"Tous"},
  {id:"saumon", label:"Saumon"},
  {id:"thon", label:"Thon"},
  {id:"poulet", label:"Poulet"},
  {id:"autres", label:"Autres"},
];
// Protéine principale d'un sushi : sert à ranger la carte (« Autres » si aucune)
export function primaryProtein(name) {
  return (PROTEIN_OF[name] || [])[0] || "autres";
}
export const PROTEIN_OF = {
  "California Saumon Fromage": ["saumon"], "California Saumon Avocat": ["saumon"],
  "California Smoky": ["saumon"], "California Vegetable": [],
  "California Thon Avocat": ["thon"], "Californian Thon Boursin": ["thon"],
  "California Poulet Fromage": ["poulet"],
  "Maki Saumon": ["saumon"], "Maki Avocat": [], "Maki Fromage": [], "Maki Poivron chèvre": [],
  "California Chicken": ["poulet"], "California Avocado Saumon": ["saumon"],
  "California Salmon Spicy": ["saumon"], "California Mimosa": ["thon"],
  "California Tempura": [], "California Avocado Poulet Karaage": ["poulet"],
  "California Aburi Roll": ["saumon"], "California Italia Fusion": [],
  "Golden Poulet Cheddar": ["poulet"], "Golden Atlantic Spicy": ["saumon"],
  "Golden Campagnard": ["poulet"],
};
export function matchesProtein(name, protein) {
  if (protein === "tous") return true;
  if (protein === "autres") return primaryProtein(name) === "autres";
  return (PROTEIN_OF[name] || []).includes(protein);
}

// Sushis et spring rolls : présents dans la carte, hors box
const CARTE_ONLY = {
  "Sushi Saumon": {grade:"Sushi", ing:"Saumon, riz", all:["Gluten","Soja","Poisson"], prot:["saumon"]},
  "Sushi Thon": {grade:"Sushi", ing:"Thon, riz", all:["Gluten","Soja","Poisson"], prot:["thon"]},
  "Sushi Crevette": {grade:"Sushi", ing:"Crevette, riz", all:["Gluten","Soja","Crustacés"], prot:[]},
  "Sushi Saumon Fromage": {grade:"Sushi", ing:"Saumon, fromage, riz", all:["Gluten","Soja","Poisson","Lait"], prot:["saumon"]},
  "Sushi Thon Fromage": {grade:"Sushi", ing:"Thon, fromage, riz", all:["Gluten","Soja","Poisson","Lait"], prot:["thon"]},
  "Spring Roll Légumes": {grade:"Spring", ing:"Vermicelles, carotte, chou, pousses de soja", all:["Gluten","Soja"], prot:[]},
  "Spring Roll Crevette": {grade:"Spring", ing:"Crevette, vermicelles, carotte, chou", all:["Gluten","Soja","Crustacés"], prot:[]},
};
for (const n in CARTE_ONLY) {
  const c = CARTE_ONLY[n];
  gradeOf[n] = c.grade;
  ingredientsOf[n] = c.ing;
  ALLERGENES[n] = c.all;
  PROTEIN_OF[n] = c.prot;
}

