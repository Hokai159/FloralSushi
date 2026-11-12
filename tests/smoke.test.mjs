// Tests de fumée : calculs, résumé de commande et affichage des pages.
// Lancer avec : node tests/smoke.test.mjs
const store = new Map();
globalThis.localStorage = { getItem:k=>store.has(k)?store.get(k):null, setItem:(k,v)=>store.set(k,String(v)), removeItem:k=>store.delete(k) };
const el = () => ({ innerHTML:"", classList:{add(){},remove(){},toggle(){}}, querySelectorAll:()=>[], querySelector:()=>null, appendChild(){}, remove(){}, addEventListener(){}, dataset:{}, textContent:"" });
globalThis.document = { getElementById: el, querySelectorAll: ()=>[], querySelector: ()=>null, addEventListener(){}, createElement: el, title: "" };
globalThis.window = globalThis; globalThis.location = { hash: "" };

const J = new URL("../js/", import.meta.url).href;
const cart = await import(J+"domain/cart.js");
const { state } = await import(J+"state/state.js");
const boxes = await import(J+"data/boxes.js");
const orders = await import(J+"services/orders.js");
const { pageAccueil } = await import(J+"views/pages/home.js");
const { pageBoxes } = await import(J+"views/pages/boxes.js");
const { pageComposer } = await import(J+"views/pages/composer.js");
const { pageExtras } = await import(J+"views/pages/extras.js");
const { pagePanier } = await import(J+"views/pages/panier.js");
const { pageProfil } = await import(J+"views/pages/profil.js");
const { pageInfos } = await import(J+"views/pages/info.js");
const { pageCarte } = await import(J+"views/pages/carte.js");

let fails = 0;
const check = (label, cond) => { console.log((cond ? "OK   " : "FAIL ") + label); if (!cond) fails++; };
const near = (a, b) => Math.abs(a - b) < 1e-9;

// 1. Box Mini composée : 4 Classique, 3 Signature, 1 Golden → 25 € + 10 € de supplément Golden
state.cart = { box:"mini", mode:"custom", picks:{
  "California Saumon Fromage":2, "California Smoky":2,
  "California Chicken":1, "California Tempura":1, "California Avocado Saumon":1,
  "Golden Poulet Cheddar":1 }, extras:{}, tip:{on:false, amount:0} };
check("total box Mini avec Golden = 35 €", near(cart.boxTotal(), 35));
check("box complète", cart.isComplete() === true);

// 2. Extras par format : karaage ×4 (1), mochi matcha ×2 (2), tempura ×2 (1)
state.cart.extras = { karaage:{"4":1}, mochi_matcha:{"2":2}, tempura:{"2":1} };
check("extras : 6,50 + 13 + 3,50 = 23 €", near(cart.extrasTotal(), 23));
check("livraison 2 € quand il y a une box", cart.deliveryFee() === 2);
check("total général = 35 + 23 + 2 = 60 €", near(cart.grandTotal(), 60));

// 3. Pourboire ajouté au total
state.cart.tip = { on:true, amount:5 };
check("pourboire ajouté au total (65 €)", near(cart.grandTotal(), 65));
state.cart.tip = { on:false, amount:0 };

// 4. Résumé regroupé par produit, sans détail de calcul
const txt = orders.buildResume(boxes.BOXES.uno, { sucree:0, salee:2 }).join("\n");
check("résumé : mochi matcha = 4 pièces", /Mochi matcha : 4 pièce/.test(txt));
check("résumé : sauce salée offerte affichée", /Sauce salée : 2 sauce/.test(txt));
check("résumé : baguettes offertes Uno = 1 paire", /Baguettes à sushi : 1 paire/.test(txt));
check("résumé : pas de détail de packs", !/pack/.test(txt));

// 5. Pages : pas d'erreur et éléments clés présents
const home = pageAccueil(), boxesHtml = pageBoxes(), composer = pageComposer(),
  carte = pageCarte("maki"), extras = pageExtras(), panier = pagePanier(),
  profil = pageProfil(), faq = pageInfos("faq");
check("accueil : box thématiques présentes", home.includes("Mini Full Poulet"));
check("box : formats à composer présents", boxesHtml.includes("Composer"));
check("composer : barre de progression", composer.includes("dock"));
check("carte filtrée Maki : le maki apparaît", carte.includes("Maki Saumon"));
check("extras : rubrique Autres", extras.includes("Autres"));
check("panier : récapitulatif et total", panier.includes("total-big"));
check("profil sans compte : création de compte", profil.includes("Nouveau compte"));
check("FAQ : règle des baguettes", faq.includes("baguettes"));

// 6. Makis et filtre par protéine : les rubriques restent visibles
const { MENU } = await import(J+"data/menu.js");
const { setProtein } = await import(J+"controllers/filters.js");
const makis = MENU.Classique.map(([n]) => n).filter(n => n.startsWith("Maki"));
check("4 makis distincts (saumon, avocat, fromage, poivron chèvre)", makis.length === 4);
const carteTous = pageCarte("tous");
check("carte : rubrique Saumon", carteTous.includes("<h2>Saumon</h2>"));
check("carte : rubrique Autres pour les sushis sans protéine", carteTous.includes("<h2>Autres</h2>"));
check("carte : Maki Avocat classé dans Autres", /Autres[\s\S]*Maki Avocat/.test(carteTous));
state.protein = "poulet";
const cartePoulet = pageCarte("tous");
check("filtre poulet : rubrique Poulet affichée", cartePoulet.includes("<h2>Poulet</h2>"));
check("filtre poulet : rubriques Saumon masquées", !cartePoulet.includes("<h2>Saumon</h2>"));
state.protein = "tous";

console.log(fails ? `\n${fails} échec(s)` : "\nTous les tests passent.");
process.exitCode = fails ? 1 : 0;
