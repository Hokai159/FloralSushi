// Réception des commandes :
// 1. envoie le message de commande sur Telegram ;
// 2. met à jour un second message Telegram : le total du jour (rouleaux et sushis),
//    qui repart à zéro chaque jour.
// Identifiants dans : Paramètres du projet → Propriétés du script (TG_TOKEN, TG_CHAT).

const FUSEAU = "Europe/Paris";

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("9001853243:AAGhaDnRTF-DrvA8cUhUptEmIm1F7yfhdO8");
  const chat = props.getProperty("9025679648");
  const d = JSON.parse(e.postData.contents);

  // 1. Message de commande
  const adresse = d.address.numero + " " + d.address.rue +
    (d.address.complement ? ", " + d.address.complement : "") +
    ", " + d.address.cp + " " + d.address.ville;
  const lignes = [
    "🍣 NOUVELLE COMMANDE " + d.id,
    "━━━━━━━━━━━━━━━━━━━━",
    "👤 " + d.nom,
    "📞 " + d.tel,
    "📍 " + adresse,
    "🕐 " + d.slot,
    "🗓 Commandée le " + d.date,
    "━━━━━━━━━━━━━━━━━━━━",
    d.resume.join("\n"),
    "━━━━━━━━━━━━━━━━━━━━",
    d.tip ? "💝 Pourboire : " + euros(d.tip) : "",
    "💰 TOTAL : " + euros(d.total),
  ];
  envoyer(token, chat, lignes.filter(x => x !== "").join("\n"));

  // 2. Total du jour
  majTotalDuJour(token, chat, d.counts);

  return ContentService.createTextOutput("ok");
}

function euros(n) {
  return Number(n).toFixed(2).replace(".", ",") + " €";
}

function envoyer(token, chat, texte) {
  const rep = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post", contentType: "application/json", muteHttpExceptions: true,
    payload: JSON.stringify({ chat_id: chat, text: texte }),
  });
  return JSON.parse(rep.getContentText()).result;
}

function majTotalDuJour(token, chat, counts) {
  if (!counts) return;
  const props = PropertiesService.getScriptProperties();
  const jour = Utilities.formatDate(new Date(), FUSEAU, "yyyy-MM-dd");
  const cle = "jour:" + jour;
  const etat = JSON.parse(props.getProperty(cle) || '{"produits":{},"sushis":0,"pokes":0}');

  for (const nom in counts.produits) {
    etat.produits[nom] = (etat.produits[nom] || 0) + counts.produits[nom];
  }
  etat.sushis += counts.sushis;
  etat.pokes += counts.pokes;
  etat.rouleaux = Math.ceil(etat.sushis / 8);   // 1 rouleau = 8 sushis

  const lignes = Object.keys(etat.produits).sort().map(n => "• " + etat.produits[n] + " × " + n);
  const texte = "📊 TOTAL DU JOUR · " + Utilities.formatDate(new Date(), FUSEAU, "dd/MM/yyyy") + "\n" +
    "━━━━━━━━━━━━━━━━━━━━\n" +
    "🍱 Rouleaux : " + etat.rouleaux + " (" + etat.sushis + " sushis)\n" +
    (etat.pokes ? "🥗 Poké bowls : " + etat.pokes + "\n" : "") +
    (lignes.length ? "━━━━━━━━━━━━━━━━━━━━\n" + lignes.join("\n") : "");

  if (etat.msgId) {
    const rep = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/editMessageText", {
      method: "post", contentType: "application/json", muteHttpExceptions: true,
      payload: JSON.stringify({ chat_id: chat, message_id: etat.msgId, text: texte }),
    });
    if (JSON.parse(rep.getContentText()).ok) { props.setProperty(cle, JSON.stringify(etat)); return; }
  }
  const envoye = envoyer(token, chat, texte);
  etat.msgId = envoye && envoye.message_id;
  props.setProperty(cle, JSON.stringify(etat));
}
