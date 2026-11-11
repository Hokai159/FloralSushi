import { DELIVERY_FEE, GOLDEN_SUPPLEMENT } from "../../config.js";
import { eur } from "../../utils/format.js";

export function pageInfos(k) {
  const wrap = (title, body) => `
    <section class="page-head"><div class="wrap"><span class="eyebrow">Floral Sushi</span><h1 class="display">${title}</h1></div></section>
    <section style="padding-top:10px"><div class="wrap" style="max-width:820px"><div class="panel reveal">${body}</div></div></section>`;

  if (k === "mentions") return wrap("Mentions légales", `
    <h3>Éditeur du site</h3>
    <p>Floral Sushi, activité de préparation et livraison de sushis.<br>
    Responsable de publication : <span class="placeholder">[nom du responsable]</span><br>
    Statut juridique et numéro SIRET : <span class="placeholder">[à compléter]</span><br>
    Adresse : <span class="placeholder">[adresse à compléter]</span><br>
    Contact : <span class="placeholder">[email et téléphone à compléter]</span></p>
    <h3>Hébergement</h3>
    <p>Le site est hébergé par WordPress.com (Automattic Inc.).</p>
    <h3>Propriété intellectuelle</h3>
    <p>Les textes, photographies, logos et éléments graphiques du site sont protégés. Toute reproduction sans autorisation écrite est interdite.</p>
    <h3>Données personnelles</h3>
    <p>Les informations saisies (nom, adresse, téléphone, email) servent uniquement à préparer et livrer vos commandes. Elles ne sont pas revendues. Les commandes sont stockées dans un tableur accessible uniquement par la boutique. Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant. Les données de profil sont enregistrées dans votre navigateur.</p>
    <h3>Cookies et stockage</h3>
    <p>Le site n'utilise pas de cookies publicitaires. Il enregistre dans votre navigateur votre panier et votre profil, pour votre confort.</p>
    <h3>Allergènes</h3>
    <p>Les informations sur les allergènes sont données à titre indicatif, à partir des recettes habituelles. Signalez toute allergie avant de commander.</p>`);

  if (k === "faq") return wrap("FAQ", `
    <h3>Où livrez-vous ?</h3>
    <p>Autour d'Amiens : Amiens, Camon, Longueau, Salouël, Dury, Glisy, Rivery, Saleux et Boves. La liste peut évoluer.</p>
    <h3>Quels sont les créneaux de livraison ?</h3>
    <p>Nous livrons de 18 h à 21 h, sur les 7 prochains jours, avec un créneau d'une heure.</p>
    <h3>Combien coûte la livraison ?</h3>
    <p>${eur(DELIVERY_FEE)} par commande, ajoutés au récapitulatif du panier.</p>
    <h3>Comment fonctionne l'offre de baguettes ?</h3>
    <p>Les box Uno et Duo (à composer ou découverte) et la Mini Full Frit offrent des baguettes et des sauces : 1 paire de baguettes et 1 sauce pour l'Uno et la Full Frit, 2 paires et 2 sauces pour la Duo. Les mini box n'ont pas d'offre. Les sauces, sucrées ou salées, se précisent à la commande. Des baguettes supplémentaires coûtent 0,50 € la paire, et des sauces supplémentaires 0,20 € l'unité, dans la rubrique Autres.</p>
    <h3>Puis-je laisser un pourboire ?</h3>
    <p>Oui, depuis le panier : activez l'option puis choisissez 1 €, 2 € ou 5 €. Le montant s'ajoute au total de la commande.</p>
    <h3>Puis-je modifier une box composée ?</h3>
    <p>Oui, dans la limite des quotas de la box, tant que vous n'avez pas validé la commande. Les box déjà faites ne se modifient pas.</p>
    <h3>Comment savoir si un sushi contient un allergène ?</h3>
    <p>Cliquez sur le « i » d'un sushi, dans la carte ou dans le composeur. Vous y verrez les ingrédients et les allergènes. Signalez toute allergie avant de commander : nous ne pouvons pas garantir l'absence de traces.</p>
    <h3>Les sushis sont-ils faits maison ?</h3>
    <p>Oui, ils sont préparés chaque jour.</p>
    <h3>Comment fonctionne le supplément Golden ?</h3>
    <p>Dans une box à composer, chaque rouleau Golden ajoute ${GOLDEN_SUPPLEMENT} €. Les mini box thématiques ont un prix fixe qui inclut ce supplément.</p>
    <h3>Quels moyens de paiement ?</h3>
    <p>Le paiement en ligne sera disponible au lancement. Votre carte peut être enregistrée dans votre profil, sans que le numéro complet ne soit stocké sur le site.</p>
    <h3>Puis-je annuler ma commande ?</h3>
    <p>Contactez-nous le plus tôt possible. Une commande déjà préparée ne peut pas être annulée.</p>`);

  if (k === "contact") return `
    <section class="page-head"><div class="wrap"><span class="eyebrow">Contact</span><h1 class="display">Écrivez-nous</h1>
      <p>Une question, une allergie, un souci de livraison ? Nous répondons vite.</p></div></section>
    <section style="padding-top:10px"><div class="wrap" style="max-width:760px">
      <div class="contact-list reveal">
        <a class="contact-line" href="tel:+330000000000">
          <span class="ico">📞</span><div><b>Téléphone</b><small><span class="placeholder">+33 X XX XX XX XX (à remplacer)</span></small></div>
        </a>
        <a class="contact-line" href="mailto:contact@votre-domaine.fr">
          <span class="ico">✉️</span><div><b>Email</b><small><span class="placeholder">contact@votre-domaine.fr (à remplacer)</span></small></div>
        </a>
        <a class="contact-line" href="https://www.facebook.com/" target="_blank" rel="noopener">
          <span class="ico">f</span><div><b>Facebook</b><small><span class="placeholder">lien de la page à renseigner</span></small></div>
        </a>
        <a class="contact-line" href="https://www.instagram.com/" target="_blank" rel="noopener">
          <span class="ico">◎</span><div><b>Instagram</b><small><span class="placeholder">lien du compte à renseigner</span></small></div>
        </a>
      </div>
      <p class="note" style="margin-top:20px">Zone de livraison : autour d'Amiens. Créneaux de livraison de 18 h à 21 h, 7 jours sur 7.</p>
    </div></section>`;
}

/* ===== ROUTEUR & ANIMATIONS ===== */
