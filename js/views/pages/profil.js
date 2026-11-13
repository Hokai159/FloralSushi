import { favoriOf } from "../../services/history.js";
import { rewardsOf } from "../../domain/loyalty.js";
import { register, login, logout, saveProfile, repeatOrder, tapLot } from "../../controllers/account.js";
import { gaugeHtml } from "../components/gauge.js";
import { state } from "../../state/state.js";
import { esc, eur } from "../../utils/format.js";

export function authView() {
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Mon compte</span>
    <h1 class="display">Créer mon compte</h1>
    <p>Avec votre email et un mot de passe, retrouvez vos coordonnées, vos commandes et vos points de fidélité, sur tous vos appareils.</p>
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
  </div></section>`;
}

export function pageProfil() {
  if (!state.session) return authView();
  const p = state.profile || {};
  const orders = state.orders || [];
  const fav = favoriOf(orders);
  const dispo = rewardsOf(orders);
  return `
  <section class="page-head"><div class="wrap">
    <span class="eyebrow">Mon compte</span>
    <h1 class="display">Bonjour</h1>
    <p>Connecté : <b>${esc(state.session.email)}</b> · <button class="link-btn" onclick="logout()">Se déconnecter</button></p>
  </div></section>
  <section style="padding-top:10px"><div class="wrap">
    ${gaugeHtml(orders)}
    ${dispo.length ? `<div class="notice" style="margin:16px 0">🎁 Vous avez ${dispo.length} lot(s) à utiliser sur votre prochaine commande, dans le panier.</div>` : ""}
    ${fav ? `<div class="panel reveal"><h2>Votre favori</h2><p>${esc(fav.nom)} · commandé ${fav.quantite} fois</p></div>` : ""}
    <div class="panel reveal"><h2>Mes commandes</h2>
      ${orders.length ? orders.map(o => `
        <div class="row">
          <span><b>${esc(o.order_ref)}</b> · ${new Date(o.created_at).toLocaleDateString("fr-FR")}
            <small>${esc((o.items && o.items.box) || "Extras")} · ${esc(o.status)}</small></span>
          <span>${eur(o.total)} <button class="btn ghost sm" onclick="repeatOrder(${o.id})">Repasser</button></span>
        </div>`).join("") : `<p class="note">Vous n'avez pas encore de commande.</p>`}
    </div>
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
        <div><label>Ville</label><input name="ville" value="${esc(p.ville)}"></div>
      </div>
      <div style="text-align:right;margin-top:20px"><button class="btn" type="submit">Enregistrer <span class="arrow">→</span></button></div>
    </form>
  </div></section>`;
}
