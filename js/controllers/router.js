import { cartCount } from "../domain/cart.js";
import { observeReveals } from "../utils/dom.js";
import { pageBoxes } from "../views/pages/boxes.js";
import { pageCarte } from "../views/pages/carte.js";
import { pageCommande } from "../views/pages/commande.js";
import { pageComposer } from "../views/pages/composer.js";
import { pageExtras } from "../views/pages/extras.js";
import { pageAccueil } from "../views/pages/home.js";
import { pageInfos } from "../views/pages/info.js";
import { pagePanier } from "../views/pages/panier.js";
import { pageProfil } from "../views/pages/profil.js";

export let lastRoute = null;

export function render() {
  const h = location.hash.replace("#","") || "accueil";
  const keepScroll = h === lastRoute;
  const scrollY = window.scrollY;
  lastRoute = h;
  const [page, arg] = h.split("/");
  const views = {accueil:pageAccueil, boxes:pageBoxes, composer:pageComposer, extras:pageExtras, panier:pagePanier, profil:pageProfil};
  let html;
  if (page === "commande") html = pageCommande(arg);
  else if (page === "carte") html = pageCarte(arg);
  else if (["mentions","faq","contact"].includes(page)) html = pageInfos(page);
  else html = (views[page] || pageAccueil)();
  document.getElementById("view").innerHTML = html;
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === page));
  const n = cartCount();
  let dot = document.querySelector('[data-nav="panier"] .dot');
  if (n) {
    if (!dot) { dot = document.createElement("span"); dot.className = "dot"; document.querySelector('[data-nav="panier"]').appendChild(dot); }
    dot.textContent = n;
  } else if (dot) dot.remove();
  if (keepScroll) document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  observeReveals();
  document.title = (page === "accueil" ? "" : (document.querySelector("h1")?.textContent || "") + " · ") + "Floral Sushi";
  window.scrollTo({top: keepScroll ? scrollY : 0, behavior:"instant"});
}
