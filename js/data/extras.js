export const EXTRA_ITEMS = {
  karaage: {name:"Poulet karaage", desc:"Croustillant, à partager ou à garder.", group:"Poulet",
            sizes:[{n:4,price:6.5},{n:8,price:12}], allergens:["Gluten","Soja","Œufs"]}
};

EXTRA_ITEMS.baguettes = {name:"Baguettes à sushi", desc:"Une paire de baguettes pour manger.", group:"Accessoires",
  sizes:[{n:1,price:0.5}], allergens:[], plain:true};

EXTRA_ITEMS.tempura = {name:"Tempura crevettes", desc:"Crevettes en tempura croustillantes.", group:"Friture",
  sizes:[{n:2,price:3.5},{n:4,price:6.5}], allergens:["Crustacés","Gluten","Œufs","Soja"]};

EXTRA_ITEMS.rings = {name:"Oignon rings", desc:"Rondelles d'oignon croustillantes.", group:"Friture",
  sizes:[{n:4,price:4.5},{n:8,price:8.5}], allergens:["Gluten","Œufs","Lait"]};

EXTRA_ITEMS.rouleau = {name:"Golden (rouleau frit)", desc:"Un rouleau Golden, panné et frit.", group:"Friture",
  sizes:[{n:1,price:10}], allergens:["Gluten","Œufs","Lait"]};
EXTRA_ITEMS.sauce = {name:"Sauce", desc:"Choisissez sucrée ou salée, 0,20 € la sauce.", group:"Sauces",
  sizes:[{n:"sucree",label:"Sucrée",price:0.2},{n:"salee",label:"Salée",price:0.2}], allergens:["Soja"]};

export const FLAVORS = ["Matcha","Fraise","Vanille","Chocolat","Mangue"]; // parfums à confirmer

FLAVORS.forEach(f => {
  EXTRA_ITEMS["mochi_" + f.toLowerCase()] = {name:"Mochi " + f.toLowerCase(), desc:"Mochi glacé " + f.toLowerCase() + ".", group:"Mochi",
    sizes:[{n:1,price:3.5},{n:2,price:6.5}], allergens:["Lait","Œufs"]};
});

// Gyoza, yakitori, sashimi, boissons et oignon frit : uniquement dans les extras
EXTRA_ITEMS.gyoza = {name:"Gyoza", desc:"Raviolis grillés, à partager.", group:"Friture",
  sizes:[{n:4,price:5},{n:8,price:9}], allergens:["Gluten","Soja","Œufs"]};
EXTRA_ITEMS.yakitori = {name:"Yakitori poulet", desc:"Brochettes de poulet grillées, sauce yakitori.", group:"Friture",
  sizes:[{n:2,price:4.5},{n:4,price:8}], allergens:["Gluten","Soja"]};
EXTRA_ITEMS.sashimi_saumon = {name:"Sashimi saumon", desc:"Tranches de saumon frais.", group:"Sashimi",
  sizes:[{n:4,price:7},{n:8,price:13}], allergens:["Poisson"]};
EXTRA_ITEMS.sashimi_thon = {name:"Sashimi thon", desc:"Tranches de thon frais.", group:"Sashimi",
  sizes:[{n:4,price:8},{n:8,price:15}], allergens:["Poisson"]};
EXTRA_ITEMS.sashimi_daurade = {name:"Sashimi daurade", desc:"Tranches de daurade fraîche.", group:"Sashimi",
  sizes:[{n:4,price:8},{n:8,price:15}], allergens:["Poisson"]};
EXTRA_ITEMS.boisson_coca = {name:"Coca-Cola", desc:"Soda divers, canette.", group:"Boissons",
  sizes:[{n:1,label:"Canette 33 cl",price:2.5}], allergens:[]};
EXTRA_ITEMS.boisson_orangina = {name:"Orangina", desc:"Soda divers, bouteille.", group:"Boissons",
  sizes:[{n:1,label:"Bouteille 25 cl",price:2.5}], allergens:[]};
EXTRA_ITEMS.boisson_icetea = {name:"Ice tea pêche", desc:"Soda divers, bouteille.", group:"Boissons",
  sizes:[{n:1,label:"Bouteille 33 cl",price:2.5}], allergens:[]};
EXTRA_ITEMS.boisson_ramune = {name:"Ramune", desc:"Soda japonais aux billes, saveur originale.", group:"Boissons",
  sizes:[{n:1,label:"Bouteille 200 ml",price:3.5}], allergens:[]};
EXTRA_ITEMS.boisson_calpis = {name:"Calpis", desc:"Boisson japonaise lactée, goût yaourt.", group:"Boissons",
  sizes:[{n:1,label:"Bouteille 250 ml",price:3.5}], allergens:["Lait"]};
EXTRA_ITEMS.oignon_frit = {name:"Oignon frit", desc:"Oignons frits croustillants.", group:"Autres",
  sizes:[{n:1,label:"Portion",price:0.5}], allergens:["Gluten"], plain:true};

