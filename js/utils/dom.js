export function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), {threshold:.15});
  els.forEach(e => io.observe(e));
}

export function buildPetals() {
  const host = document.getElementById("petals");
  const colors = ["#f1d4e0","#f9e6ee","#e7b3c9","#fff"];
  host.innerHTML = Array.from({length:16}, () => {
    const s = 10 + Math.random()*14, left = Math.random()*100, dur = 14 + Math.random()*16, delay = -Math.random()*20;
    const c = colors[Math.floor(Math.random()*colors.length)];
    return `<span class="petal" style="left:${left}%;width:${s}px;height:${s*.8}px;animation-duration:${dur}s;animation-delay:${delay}s;background:radial-gradient(circle at 30% 30%,#fff,${c} 55%,#e09ab8)"></span>`;
  }).join("");
}
