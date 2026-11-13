import { EXTRA_ITEMS } from "../data/extras.js";
import { load } from "./storage.js";
import { loadSession } from "../services/auth.js";

// État partagé de l'application : panier, compte client, commandes et profil
export const state = {
  cart: load("fs_cart", {box:null, mode:null, picks:{}, extras:{}, tip:{on:false, amount:0}, pokes:[]}),
  session: loadSession(),      // {token, id, email} quand le client est connecté
  profile: null,               // coordonnées du client (table profiles)
  orders: null,                // commandes du client (null tant qu'elles ne sont pas chargées)
  draft: {},
  protein: "tous",
  pokeDraft: {size:"moyen", protein:[], toppings:[], graines:[], sauce:[]},
};
state.cart.extras ||= {};
state.cart.pokes ||= [];
state.cart.tip ||= {on:false, amount:0};
for (const k in state.cart.extras) {
  const e = state.cart.extras[k];
  if (!EXTRA_ITEMS[k] || typeof e !== "object" || typeof e.qty === "number") delete state.cart.extras[k];
}
