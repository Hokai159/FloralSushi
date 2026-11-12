import { EXTRA_ITEMS } from "../data/extras.js";
import { load } from "./storage.js";

// État partagé de l'application : panier, session et profil du client
export const state = {
  cart: load("fs_cart", {box:null, mode:null, picks:{}, extras:{}, tip:{on:false, amount:0}}),
  session: load("fs_session", null),
  profile: null,
  draft: {},
  protein: "tous",
};
state.cart.extras ||= {};
state.cart.tip ||= {on:false, amount:0};
for (const k in state.cart.extras) {
  const e = state.cart.extras[k];
  if (!EXTRA_ITEMS[k] || typeof e !== "object" || typeof e.qty === "number") delete state.cart.extras[k];
}

// Comptes clients (stockés dans le navigateur)
export const users = () => load("fs_users", {});

export function refreshProfile() {
  const u = state.session && users()[state.session];
  state.profile = u ? (u.profile || null) : null;
}
refreshProfile();
