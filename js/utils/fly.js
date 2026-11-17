import { IMAGES } from "../data/images.js";

// Fait tomber un sushi depuis le bouton « + » jusque dans la boîte du composeur
export function flyToBox(from, name) {
  const target = document.getElementById("boxViz");
  if (!from || !target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly";
  dot.innerHTML = IMAGES[name] ? `<img src="${IMAGES[name]}" alt="">` : "🍣";
  dot.style.left = (a.left + a.width / 2 - 30) + "px";
  dot.style.top = (a.top + a.height / 2 - 30) + "px";
  document.body.appendChild(dot);
  const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
  const dy = (b.top + b.height * 0.35) - (a.top + a.height / 2);
  dot.animate([
    {transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1},
    {transform: `translate(${dx * 0.45}px, ${dy * 0.2 - 140}px) scale(1.15) rotate(-12deg)`, opacity: 1, offset: 0.45},
    {transform: `translate(${dx}px, ${dy}px) scale(.4) rotate(18deg)`, opacity: 0.3},
  ], {duration: 820, easing: "cubic-bezier(.45,0,.55,1)"}).onfinish = () => {
    dot.remove();
    target.classList.remove("bump"); void target.offsetWidth; target.classList.add("bump");
  };
}
