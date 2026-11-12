// Réception des commandes et envoi d'une notification Telegram.
// Les identifiants ne sont PAS dans ce fichier : ils sont dans
// Apps Script → Paramètres du projet → Propriétés du script
//   TG_TOKEN : 9001853243:AAGhaDnRTF-DrvA8cUhUptEmIm1F7yfhdO8
//   TG_CHAT  : 9025679648

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TG_TOKEN");
  const chat = props.getProperty("TG_CHAT");
  const d = JSON.parse(e.postData.contents);

  const adresse = d.address.numero + " " + d.address.rue +
    (d.address.complement ? ", " + d.address.complement : "") +
    ", " + d.address.cp + " " + d.address.ville;
  const total = Number(d.total).toFixed(2).replace(".", ",") + " €";

  const lines = [
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
    d.tip ? "💝 Pourboire : " + Number(d.tip).toFixed(2).replace(".", ",") + " €" : "",
    "💰 TOTAL : " + total
  ];

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: chat, text: lines.filter(x => x !== "").join("\n") })
  });

  return ContentService.createTextOutput("ok");
}
