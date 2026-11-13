// Configuration de la boutique : seul fichier à modifier pour les réglages courants
export const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbyNv24HRDDKVsqmHQhAIehwEMplJ0NoCITVfQRVOir-Z7h72RIzmzaalpUnP06OHsL6FA/exec";   // URL du script Google Sheets (à renseigner)
export const SHOP_PHONE = "";        // numéro WhatsApp de la boutique, format 33 6 XX XX XX XX sans espaces (à renseigner)
export const GOLDEN_SUPPLEMENT = 10;   // € par rouleau Golden dans les box à composer
export const DELIVERY_FEE = 2;         // € de livraison, ajoutés à la commande
export const ZONE_VILLES = ["Amiens","Camon","Longueau","Salouël","Dury","Glisy","Rivery","Saleux","Boves"];   // villes desservies (à valider)
export const SHOP_EMAIL = "benjaminpedrak@gmail.com";   // email pour les demandes de devis

// Base de données Supabase (clé publique uniquement : jamais la clé secrète)
export const SUPABASE_URL = "https://thnjvhaqmrxzvnygavyt.supabase.co";
export const SUPABASE_KEY = "sb_publishable_cNpRv-ri3SzyaVTiJljs8g_OANyRt_2";
