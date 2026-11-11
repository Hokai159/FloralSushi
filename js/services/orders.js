import { ORDER_ENDPOINT } from "../config.js";
import { EXTRA_ITEMS } from "../data/extras.js";
import { extraLines } from "../domain/cart.js";
import { emojiOf } from "../domain/extras.js";
import { state } from "../state/state.js";
import { eur } from "../utils/format.js";

export async function sendOrder(order) {
  if (!ORDER_ENDPOINT) return false;
  try {
    await fetch(ORDER_ENDPOINT, {method:"POST", mode:"no-cors", headers:{"Content-Type":"text/plain"}, body: JSON.stringify(order)});
    return true;
  } catch { return false; }
}

export function orderText(o) {
  const lines = [`Commande ${o.id} — ${o.nom}`, `Tél : ${o.tel}`, ...(o.resume || [])];
  lines.push(`Adresse : ${o.address.numero} ${o.address.rue}${o.address.complement ? ", " + o.address.complement : ""}, ${o.address.cp} ${o.address.ville}`);
  lines.push(`Créneau : ${o.slot}`);
  lines.push(`Total : ${eur(o.total)}`);
  return lines.join("\n");
}

export function buildResume(box, offered) {
  const L = [];
  if (box) {
    L.push(`📦 ${box.name}`);
    for (const n in state.cart.picks) L.push(`   • ${state.cart.picks[n]} × ${n}`);
  }
  const groups = {};
  const get = (id, name, emoji, unit) => groups[id] || (groups[id] = {name, emoji, unit, total:0, paid:0, off:0, parts:[]});
  for (const [k, e] of extraLines()) {
    const ex = EXTRA_ITEMS[k];
    const sz = ex.sizes.find(x => String(x.n) === String(e.size));
    const isSauce = k === "sauce";
    const id = isSauce ? "sauce-" + sz.n : k;
    const name = isSauce ? "Sauce " + sz.label.toLowerCase() : ex.name;
    const unit = isSauce ? "sauce(s)" : (ex.plain ? "paire(s)" : "pièce(s)");
    const g = get(id, name, emojiOf(k), unit);
    const pieces = e.qty * (typeof sz.n === "number" && !ex.plain ? sz.n : 1);
    g.paid += pieces; g.total += pieces;
    if (!isSauce && !ex.plain) g.parts.push(`${e.qty} pack${e.qty > 1 ? "s" : ""} de ${sz.n}`);
  }
  if (offered.sucree) { const g = get("sauce-sucree", "Sauce sucrée", "🥫", "sauce(s)"); g.off += offered.sucree; g.total += offered.sucree; }
  if (offered.salee)  { const g = get("sauce-salee", "Sauce salée", "🥫", "sauce(s)"); g.off += offered.salee; g.total += offered.salee; }
  if (box && box.baguettes) { const g = get("baguettes", "Baguettes à sushi", "🥢", "paire(s)"); g.off += box.baguettes; g.total += box.baguettes; }

  const list = Object.values(groups);
  if (list.length) {
    L.push("", "🛒 Extras");
    for (const g of list) {
      L.push(`${g.emoji} ${g.name} : ${g.total} ${g.unit}`);
    }
  }
  return L;
}
