import { EXTRA_ITEMS } from "../data/extras.js";

export const DEFAULT_SIZE = key => EXTRA_ITEMS[key].sizes[0].n;

export const sizePrice = (key, size) => EXTRA_ITEMS[key].sizes.find(s => String(s.n) === String(size)).price;

export const sizeLabel = (key, size) => { const x = EXTRA_ITEMS[key].sizes.find(s => String(s.n) === String(size)); return x.label || "×" + x.n; };

export function displayName(k, size) {
  const e = EXTRA_ITEMS[k];
  if (e.plain) return e.name;
  const sz = e.sizes.find(x => String(x.n) === String(size));
  return sz.label ? `${e.name} ${sz.label.toLowerCase()}` : `${e.name} ×${sz.n}`;
}

export function emojiOf(k) {
  if (k.startsWith("mochi")) return "🍡";
  if (k === "karaage") return "🍗";
  if (k === "tempura") return "🍤";
  if (k === "rings") return "🧅";
  if (k === "sauce") return "🥫";
  if (k === "baguettes") return "🥢";
  return "🍣";
}
