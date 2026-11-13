import { clearCard, login, logout, register, saveProfile } from "../../controllers/account.js";
import { state } from "../../state/state.js";
import { esc } from "../../utils/format.js";

export function authView() {
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Mon compte</span>
    <h1 class="display">Créer mon compte</h1>
    <p>Avec votre email et un mot de passe, retrouvez vos adresses et votre moyen de paiement à chaque commande.</p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    <div class="two-col">
      <form class="panel reveal" onsubmit="register(event)">
        <h2>Nouveau compte</h2>
        <label>Adresse email</label><input type="email" name="email" required autocomplete="email">
        <label>Mot de passe (6 caractères minimum)</label><input type="password" name="pwd" minlength="6" required autocomplete="new-password">
        <label>Confirmer le mot de passe</label><input type="password" name="pwd2" minlength="6" required autocomplete="new-password">
        <div style="text-align:right;margin-top:20px"><button class="btn" type="submit">Créer mon compte <span class="arrow">→</span></button></div>
      </form>
      <form class="panel reveal" onsubmit="login(event)">
        <h2>J'ai déjà un compte</h2>
        <label>Adresse email</label><input type="email" name="email" required autocomplete="email">
        <label>Mot de passe</label><input type="password" name="pwd" required autocomplete="current-password">
        <div style="text-align:right;margin-top:20px"><button class="btn ghost" type="submit">Se connecter <span class="arrow">→</span></button></div>
      </form>
    </div>
    <p class="note" style="margin-top:16px">Démonstration : le compte est enregistré dans ce navigateur uniquement.</p>
  </div></section>`;
}

export function pageProfil() {
  if (!state.session) return authView();
  const p = state.profile || {};
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Mon profil</span>
    <h1 class="display">Vos infos</h1>
    <p>Connecté : <b>${state.session}</b> · <button class="link-btn" onclick="logout()">Se déconnecter</button></p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap" style="max-width:760px">
    <form class="panel reveal" onsubmit="saveProfile(event)">
      <h2>Mes informations</h2>
      <div class="two">
        <div><label>Nom</label><input name="nom" value="${esc(p.nom)}"></div>
        <div><label>Téléphone</label><input name="tel" value="${esc(p.tel)}"></div>
      </div>
      <div class="two">
        <div><label>Rue</label><input name="rue" value="${esc(p.rue)}"></div>
        <div><label>Numéro / bâtiment</label><input name="numero" value="${esc(p.numero)}"></div>
      </div>
      <label>Complément</label><input name="complement" value="${esc(p.complement)}">
      <div class="two">
        <div><label>Code postal</label><input name="cp" value="${esc(p.cp)}"></div>
        <div><label>Ville</label><input name="ville" list="villes" value="${esc(p.ville)}"></div>
      </div>
      <div style="text-align:right;margin-top:20px"><button class="btn" type="submit">Enregistrer <span class="arrow">→</span></button></div>
    </form>
  </div></section>`;
}
