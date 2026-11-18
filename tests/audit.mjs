// Audit : rendu de chaque page, images et liens internes
import fs from "fs";
const store = new Map();
globalThis.localStorage = { getItem:k=>store.has(k)?store.get(k):null, setItem:(k,v)=>store.set(k,String(v)), removeItem:k=>store.delete(k) };
const el = () => ({ innerHTML:"", classList:{add(){},remove(){},toggle(){}}, querySelectorAll:()=>[], querySelector:()=>null, appendChild(){}, remove(){}, addEventListener(){}, dataset:{}, textContent:"" });
globalThis.document = { getElementById: el, querySelectorAll: ()=>[], querySelector: ()=>null, addEventListener(){}, createElement: el, title: "" };
globalThis.window = globalThis; globalThis.location = { hash: "" };
const J = new URL("../js/", import.meta.url).href;
const pages = {
  accueil: (await import(J+"views/pages/home.js")).pageAccueil,
  boxes: (await import(J+"views/pages/boxes.js")).pageBoxes,
  composer: (await import(J+"views/pages/composer.js")).pageComposer,
  carte: (await import(J+"views/pages/carte.js")).pageCarte,
  extras: (await import(J+"views/pages/extras.js")).pageExtras,
  panier: (await import(J+"views/pages/panier.js")).pagePanier,
  profil: (await import(J+"views/pages/profil.js")).pageProfil,
  poke: (await import(J+"views/pages/poke.js")).pagePoke,
  bienvenue: (await import(J+"views/pages/bienvenue.js")).pageBienvenue,
  faq: (await import(J+"views/pages/info.js")).pageInfos,
};
const problemes = [];
const root = new URL("../", import.meta.url).pathname;
for (const [nom, f] of Object.entries(pages)) {
  let html;
  try { html = f("faq" === nom ? "faq" : undefined); } catch (e) { problemes.push(`${nom} : erreur ${e.message}`); continue; }
  for (const motif of ["undefined", "NaN", "[object Object]"]) {
    if (html.includes(motif)) problemes.push(`${nom} : « ${motif} » dans le rendu`);
  }
  for (const m of html.matchAll(/src="([^"]+)"/g)) {
    const src = m[1];
    if (src.startsWith("http") || src.startsWith("data:")) continue;
    if (!fs.existsSync(root + src)) problemes.push(`${nom} : image absente ${src}`);
  }
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    const r = m[1].split("/")[0];
    const connues = ["accueil","boxes","composer","carte","extras","panier","profil","poke","bienvenue","faq","mentions","contact","commande"];
    if (!connues.includes(r)) problemes.push(`${nom} : lien interne inconnu #${m[1]}`);
  }
}
console.log(problemes.length ? problemes.join("\n") : "Aucun problème détecté.");
console.log(`pages contrôlées : ${Object.keys(pages).length}`);

// États réels : box en cours, panier rempli, poké ajouté, client connecté
const { state } = await import(J+"state/state.js");
const { BOXES } = await import(J+"data/boxes.js");
state.cart = {box:"uno", mode:"custom", picks:{"California Saumon Fromage":2,"Maki Saumon":1}, extras:{karaage:{"4":1}}, tip:{on:true,amount:2}, pokes:[{id:1,size:"moyen",sizeLabel:"Moyen",price:15,selection:{protein:["Saumon"],toppings:[],graines:[],sauce:["Soja salé"]}}]};
const etats = {
  composer_en_cours: () => pages.composer(),
  panier_rempli: () => pages.panier(),
  carte_filtre_poulet: () => { state.protein="poulet"; const h=pages.carte("tous"); state.protein="tous"; return h; },
};
for (const [nom, f] of Object.entries(etats)) {
  let html;
  try { html = f(); } catch (e) { problemes.push(`${nom} : erreur ${e.message}`); continue; }
  for (const motif of ["undefined", "NaN", "[object Object]"]) if (html.includes(motif)) problemes.push(`${nom} : « ${motif} »`);
}
state.session = {id:"u1", email:"test@test.fr", token:"x", refresh:"y"};
state.orders = [{id:1, order_ref:"FS1", created_at:"2026-11-01T10:00:00Z", total:100, status:"Livrée", items:{box:"Uno Découverte", picks:{}, extras:[]}}];
state.profile = {nom:"Test", tel:"0600000000", rue:"Rue", numero:"1", complement:"", cp:"80000", ville:"Amiens"};
const profil = pages.profil();
if (!profil.includes("250") && !profil.includes("Fidélité")) problemes.push("profil connecté : fidélité absente");
if (!profil.includes("FS1")) problemes.push("profil connecté : historique absent");
if (!profil.includes("Test")) problemes.push("profil connecté : coordonnées absentes");
console.log(problemes.length ? "\nProblèmes :\n" + problemes.join("\n") : "\nÉtats réels : aucun problème.");
