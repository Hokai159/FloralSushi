export const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

export const store = (k, v) => localStorage.setItem(k, JSON.stringify(v));
