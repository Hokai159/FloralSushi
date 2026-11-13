import { state } from "../../state/state.js";

// Affiché juste après la création du compte
export function pageBienvenue() {
  const email = state.session ? state.session.email : "";
  return `
  <section class="page-head"><div class="wrap" style="text-align:center">
    <span class="ok-badge">✓</span>
    <h1 class="display" style="margin-top:20px">Inscription validée</h1>
    <p style="margin:auto">Bienvenue${email ? " " + email : ""} ! Votre compte est créé.</p>
    <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn" href="#boxes">Composer ma box <span class="arrow">→</span></a>
      <a class="btn ghost" href="#profil">Mon compte</a>
    </div>
  </div></section>`;
}
