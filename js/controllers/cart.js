import { render } from "./router.js";
import { BOXES, PRESETS } from "../data/boxes.js";
import { gradeOf } from "../data/menu.js";
import { canAdd, counts } from "../domain/cart.js";
import { state } from "../state/state.js";
import { store } from "../state/storage.js";
import { toast } from "../views/components/toast.js";

export function chooseBox(id) {
  const b = BOXES[id];
  if (b.fixed) {
    state.cart.box = id; state.cart.mode = "fixed"; state.cart.picks = {...PRESETS[id]};
    store("fs_cart", state.cart);
    toast(b.name + " ajoutée ✓ Ajoutez des extras si vous voulez.");
    location.hash = "extras";
    return;
  }
  state.cart.box = id; state.cart.mode = "custom"; state.cart.picks = {};
  store("fs_cart", state.cart);
  toast(b.name + " : composez-la !");
  location.hash = "composer";
}

export function changePick(name, d) {
  if (d > 0 && !canAdd(name)) {
    const b = BOXES[state.cart.box], c = counts();
    if (c.total >= b.pieces) toast("Votre box est pleine.");
    else toast("Quota " + gradeOf[name] + " atteint pour cette box.");
    return;
  }
  const v = (state.cart.picks[name] || 0) + d;
  if (v <= 0) delete state.cart.picks[name]; else state.cart.picks[name] = v;
  store("fs_cart", state.cart); render();
}

export function changeExtra(key, size, d) {
  const entry = state.cart.extras[key] || {};
  const q = Math.max(0, (entry[size] || 0) + d);
  if (q === 0) delete entry[size]; else entry[size] = q;
  if (Object.keys(entry).length) state.cart.extras[key] = entry; else delete state.cart.extras[key];
  store("fs_cart", state.cart); render();
}

export function removeExtra(key, size) {
  const entry = state.cart.extras[key] || {};
  delete entry[size];
  if (Object.keys(entry).length) state.cart.extras[key] = entry; else delete state.cart.extras[key];
  store("fs_cart", state.cart); toast("Retiré du panier"); render();
}

export function saveDraft(form) {
  state.draft = {};
  new FormData(form).forEach((v, k) => state.draft[k] = v);
}

export function clearBox() {
  state.cart.box = null; state.cart.mode = null; state.cart.picks = {};
  store("fs_cart", state.cart); toast("Box retirée du panier"); render();
}

export function clearCart() {
  state.cart = {box:null, mode:null, picks:{}, extras:{}, tip:{on:false, amount:0}};
  store("fs_cart", state.cart); toast("Panier vidé"); render();
}

export function toggleTip(on) {
  state.cart.tip = {on, amount: on ? state.cart.tip.amount : 0};
  store("fs_cart", state.cart); render();
}

export function setTip(amount) {
  state.cart.tip = {on:true, amount};
  store("fs_cart", state.cart); render();
}

export function setCustomTip(value) {
  const n = Math.round(parseFloat(String(value).replace(",", ".")) * 100) / 100;
  if (!(n > 0)) { toast("Entrez un montant supérieur à 0."); render(); return; }
  state.cart.tip = {on:true, amount:n};
  store("fs_cart", state.cart); render();
}
