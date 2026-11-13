import { POKE_OPTIONS, POKE_SIZES } from "../data/poke.js";
import { pokeIsValid, pokePrice } from "../domain/poke.js";
import { state } from "../state/state.js";
import { store } from "../state/storage.js";
import { render } from "./router.js";
import { toast } from "../views/components/toast.js";

// Choix en cours dans le constructeur de poké
export function setPokeSize(size) {
  state.pokeDraft.size = size;
  render();
}

export function togglePokeOption(key, value) {
  const list = state.pokeDraft[key];
  const i = list.indexOf(value);
  if (i >= 0) list.splice(i, 1); else list.push(value);
  render();
}

export function addPoke() {
  const d = state.pokeDraft;
  if (!pokeIsValid(d)) {
    toast("Choisissez au moins une protéine et une sauce.");
    return;
  }
  const selection = {protein:[...d.protein], toppings:[...d.toppings], graines:[...d.graines], sauce:[...d.sauce]};
  const item = {
    id: Date.now(),
    size: d.size,
    sizeLabel: POKE_SIZES.find(s => s.id === d.size).label,
    selection,
    price: pokePrice(d.size, selection),
  };
  state.cart.pokes.push(item);
  store("fs_cart", state.cart);
  state.pokeDraft = {size:d.size, protein:[], toppings:[], graines:[], sauce:[]};
  toast("Poké bowl ajouté au panier ✓");
  location.hash = "panier";
}

export function removePoke(id) {
  state.cart.pokes = state.cart.pokes.filter(p => p.id !== id);
  store("fs_cart", state.cart);
  toast("Poké bowl retiré");
  render();
}
