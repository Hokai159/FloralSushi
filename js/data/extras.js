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

EXTRA_ITEMS.rouleau = {name:"Rouleau friture", desc:"Un rouleau frit, à ajouter à votre commande.", group:"Friture",
  sizes:[{n:1,price:10}], allergens:["Gluten","Œufs","Lait"]};
EXTRA_ITEMS.sauce = {name:"Sauce", desc:"Choisissez sucrée ou salée, 0,20 € la sauce.", group:"Sauces",
  sizes:[{n:"sucree",label:"Sucrée",price:0.2},{n:"salee",label:"Salée",price:0.2}], allergens:["Soja"]};

export const FLAVORS = ["Matcha","Fraise","Vanille","Chocolat","Mangue"]; // parfums à confirmer

FLAVORS.forEach(f => {
  EXTRA_ITEMS["mochi_" + f.toLowerCase()] = {name:"Mochi " + f.toLowerCase(), desc:"Mochi glacé " + f.toLowerCase() + ".", group:"Mochi",
    sizes:[{n:1,price:3.5},{n:2,price:6.5}], allergens:["Lait","Œufs"]};
});
