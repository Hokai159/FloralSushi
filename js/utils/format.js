export const eur = n => n.toFixed(2).replace(".", ",") + " €";

export const esc = v => (v ?? "").toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");

export const jsStr = s => s.replace(/\\/g,"\\\\").replace(/'/g,"\\'");

/* ===== CALCULS ===== */
