import { MENU } from "./menu.js";

export const BOXES = {
  mini: {name:"Mini box", pieces:8, price:25, quota:{Classique:4, Signature:4}, desc:"8 pièces, à composer en Classique et Signature."},
  uno:  {name:"Uno box",  pieces:16, price:45, quota:{Classique:8, Signature:8}, offer:true, desc:"16 pièces, à composer en Classique et Signature."},
  duo:  {name:"Duo box",  pieces:32, price:85, quota:{Classique:16,Signature:16}, offer:true, desc:"32 pièces, pour partager ou faire le plein."},

  decouverte_mini: {name:"Mini Découverte", pieces:8, price:22, fixed:true, desc:"8 sushis différents, une pièce de chaque."},
  decouverte_uno:  {name:"Uno Découverte",  pieces:16, price:42, fixed:true, offer:true, desc:"16 sushis de la carte, une pièce de chaque."},
  decouverte_duo:  {name:"Duo Découverte",  pieces:32, price:80, fixed:true, offer:true, desc:"16 sushis de la carte, deux pièces de chaque."},

  full_poulet:  {name:"Mini Full Poulet",  pieces:8, price:25, fixed:true, desc:"8 pièces 100 % poulet : poulet fromage, chicken, karaage."},
  full_fromage: {name:"Mini Full Fromage", pieces:8, price:22, fixed:true, desc:"8 pièces 100 % fromage : saumon fromage, smoky, thon boursin, maki."},
  full_frit:    {name:"Mini Full Frit",    pieces:8, price:45, fixed:true, desc:"8 pièces frites : poulet cheddar, atlantic spicy, campagnard. Supplément Golden inclus.", offer:true}
};

// Offres par box : [paires de baguettes, sauces], offertes avec la box

export const OFFERS = {
  mini:[0,0], uno:[1,1], duo:[2,2],
  decouverte_mini:[0,0], decouverte_uno:[1,1], decouverte_duo:[2,2],
  full_poulet:[0,0], full_fromage:[0,0], full_frit:[1,1]
};

for (const id in BOXES) {
  BOXES[id].baguettes = OFFERS[id][0];
  BOXES[id].sauces = OFFERS[id][1];
}

export const PRESETS = {
  decouverte_mini: {
    "California Saumon Fromage":1,"California Saumon Avocat":1,"California Smoky":1,"California Thon Avocat":1,
    "California Chicken":1,"California Avocado Saumon":1,"California Tempura":1,"California Italia Fusion":1
  },
  decouverte_uno: {
    "California Saumon Fromage":1, "California Saumon Avocat":1, "California Smoky":1, "California Thon Avocat":1,
    "Californian Thon Boursin":1, "California Poulet Fromage":1, "Maki Saumon":1, "California Vegetable":1,
    "California Chicken":1, "California Avocado Saumon":1, "California Salmon Spicy":1, "California Mimosa":1,
    "California Tempura":1, "California Avocado Poulet Karaage":1, "California Aburi Roll":1, "California Italia Fusion":1
  },
  decouverte_duo: {
    "California Saumon Fromage":2, "California Saumon Avocat":2, "California Smoky":2, "California Thon Avocat":2,
    "Californian Thon Boursin":2, "California Poulet Fromage":2, "Maki Saumon":2, "California Vegetable":2,
    "California Chicken":2, "California Avocado Saumon":2, "California Salmon Spicy":2, "California Mimosa":2,
    "California Tempura":2, "California Avocado Poulet Karaage":2, "California Aburi Roll":2, "California Italia Fusion":2
  },
  full_poulet:  {"California Poulet Fromage":3,"California Chicken":3,"California Avocado Poulet Karaage":2},
  full_fromage: {"California Saumon Fromage":2,"California Smoky":2,"Californian Thon Boursin":2,"Maki Saumon":2},
  full_frit:    {"Golden Poulet Cheddar":3,"Golden Atlantic Spicy":3,"Golden Campagnard":2}
};

/* Extras : un seul bloc par produit, le format se choisit dans la carte */
