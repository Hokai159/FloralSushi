export function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.remove("show"), 2600);
}
