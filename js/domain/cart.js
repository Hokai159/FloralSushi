import { DELIVERY_FEE } from "../config.js";
import { BOXES } from "../data/boxes.js";
import { GRADES, gradeOf } from "../data/menu.js";
import { sizePrice } from "./extras.js";
import { state } from "../state/state.js";

export function counts() {
  const c = {Classique:0, Signature:0, Golden:0, total:0};
  for (const n in state.cart.picks) { const p = state.cart.picks[n]; c[gradeOf[n]] += p; c.total += p; }
  return c;
}

export function boxTotal() {
  if (!state.cart.box) return 0;
  const b = BOXES[state.cart.box];
  if (b.fixed) return b.price;
  let t = b.price;
  return t;
}

export function extraLines() {
  const out = [];
  for (const k in state.cart.extras) for (const size in state.cart.extras[k]) {
    const q = state.cart.extras[k][size];
    if (q > 0) out.push([k, {size, qty: q}]);
  }
  return out;
}

export function extrasTotal() { return extraLines().reduce((t,[k,e]) => t + sizePrice(k, e.size) * e.qty, 0); }

export function pokesTotal() { return (state.cart.pokes || []).reduce((t,p) => t + p.price, 0); }
export function hasExtras() { return extraLines().length > 0 || (state.cart.pokes || []).length > 0; }

export function deliveryFee() { return (state.cart.box || hasExtras()) ? DELIVERY_FEE : 0; }

export function tipAmount() { return state.cart.tip && state.cart.tip.on ? state.cart.tip.amount : 0; }

export function grandTotal() { return boxTotal() + extrasTotal() + pokesTotal() + deliveryFee() + tipAmount(); }

export function isComplete() {
  if (!state.cart.box) return false;
  const b = BOXES[state.cart.box], c = counts();
  if (b.fixed) return c.total === b.pieces;
  return c.total === b.pieces && GRADES.every(g => c[g] === b.quota[g]);
}

export function canCheckout() {
  if (state.cart.box) return isComplete();
  return hasExtras();
}

export function cartCount() {
  return Object.values(state.cart.picks).reduce((a,b)=>a+b,0) + extraLines().reduce((a,[,e])=>a+e.qty,0) + (state.cart.pokes || []).length;
}

/* ===== ACTIONS ===== */

export function canAdd(name) {
  const b = BOXES[state.cart.box], c = counts();
  const g = gradeOf[name];
  return c.total < b.pieces && c[g] < b.quota[g];
}
