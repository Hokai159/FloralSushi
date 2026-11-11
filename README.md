# Floral Sushi

Site de commande de sushis faits maison, livrés autour d'Amiens.

## Structure

```
floralsushi/
├── index.html                  Page unique (coquille HTML)
├── css/
│   ├── base.css                Variables, en-tête, boutons, bandeau
│   ├── home.css                Page d'accueil
│   └── components.css          Cartes, panier, modale, formulaires
├── js/
│   ├── main.js                 Point d'entrée : branche les événements
│   ├── config.js               Réglages de la boutique
│   ├── data/                   Données : carte, box, extras
│   │   ├── menu.js               Carte, grades, allergènes, types de sushi
│   │   ├── boxes.js              Box, compositions préfaites, offres
│   │   └── extras.js             Extras (karaage, tempura, mochis, sauces…)
│   ├── domain/                 Règles métier (calculs, sans affichage)
│   │   ├── cart.js               Totaux, quotas, validité du panier
│   │   ├── extras.js             Prix et libellés des extras
│   │   └── offers.js             Baguettes et sauces offertes
│   ├── state/                  État de l'application
│   │   ├── storage.js            Lecture et écriture du navigateur
│   │   └── state.js              Panier, session et profil en cours
│   ├── services/               Échanges avec l'extérieur
│   │   ├── orders.js             Résumé et envoi des commandes
│   │   └── auth.js               Empreinte des mots de passe
│   ├── controllers/            Actions déclenchées par l'utilisateur
│   │   ├── router.js             Navigation entre les pages
│   │   ├── cart.js               Ajout, retrait, pourboire
│   │   ├── order.js              Validation de la commande
│   │   └── account.js            Compte client et profil
│   ├── views/                  Rendu HTML (aucune logique métier)
│   │   ├── pages/                Une page = un fichier
│   │   └── components/           Cartes, modale, toast, lignes du panier
│   └── utils/                  Outils : formatage, animations
├── apps-script/
│   └── Code.gs                 Réception des commandes (Google Apps Script)
├── tests/
│   └── smoke.test.mjs          Tests des calculs et des pages
└── package.json
```

## Lancer le site en local

Les modules JavaScript ne fonctionnent pas en ouvrant directement le fichier. Utilise l'une de ces solutions :
- VS Code avec l'extension **Live Server** : clic droit sur `index.html`, puis **Open with Live Server**.
- Ou la publication GitHub Pages (voir plus bas).

## Lancer les tests

```
node tests/smoke.test.mjs
```

Les tests vérifient les totaux, le résumé des commandes et le rendu de chaque page.

## Modifier les réglages courants

`js/config.js` :
- `ORDER_ENDPOINT` : adresse du script qui reçoit les commandes
- `SHOP_PHONE` : numéro WhatsApp de la boutique (bouton de secours)
- `GOLDEN_SUPPLEMENT` : supplément par rouleau Golden
- `DELIVERY_FEE` : frais de livraison
- `ZONE_VILLES` : villes desservies

## Modifier la carte ou les offres

- Carte et grades : `js/data/menu.js`
- Box et prix : `js/data/boxes.js` (`BOXES`), compositions préfaites (`PRESETS`), offres (`OFFERS`)
- Extras et prix : `js/data/extras.js`

## Modifier une page ou un composant

Chaque page est dans `js/views/pages/`, chaque composant réutilisable dans `js/views/components/`. Les actions des boutons sont dans `js/controllers/`. Les actions appelées depuis le HTML sont listées dans `js/main.js`.

## Recevoir les commandes

1. Crée un projet Apps Script (script.google.com) et colle le contenu de `apps-script/Code.gs`.
2. Dans **Paramètres du projet → Propriétés du script**, ajoute `TG_TOKEN` et `TG_CHAT`.
3. **Déployer → Nouveau déploiement → Application web**, accès « Tout le monde ».
4. Copie l'URL `/exec` dans `ORDER_ENDPOINT`.

Pour une mise à jour du script : **Déployer → Gérer les déploiements → Nouvelle version**. L'URL ne change pas.

## Publier

Le site est hébergé sur GitHub Pages depuis la branche `main`. Tout commit sur `main` met le site à jour en quelques minutes.

## Sécurité

- Aucun token ni mot de passe dans les fichiers du dépôt.
- Si un token a été partagé par erreur, le révoquer avec `/revoke` chez BotFather.
