// Photos des produits, affichées sous le nom dans la carte, le composeur et les extras.
// Clé : nom exact du produit. Pour les variantes (sésame, crispy), clé « nom · variante ».
export const IMAGES = {
  "Sushi Saumon": "img/produits/nigiri-saumon.webp",
  "Sushi Thon": "img/produits/nigiri-thon.webp",
  "Sushi Saumon Fromage": "img/produits/tataki-saumon-fromage.webp",
  "California Saumon Avocat": "img/produits/california-saumon-avocat.webp",
  "California Tempura": "img/produits/california-tempura.webp",
  "Spring Roll Saumon Avocat": "img/produits/spring-saumon-avocat.webp",
  "Spring Roll Saumon Fromage": "img/produits/spring-saumon-fromage.webp",
  "Sashimi saumon": "img/produits/sashimi-saumon.webp",
  "Sashimi thon": "img/produits/sashimi-thon.webp",
  "Sashimi mixte thon saumon": "img/produits/sashimi-mixte.webp",
  "Maki Fromage": "img/produits/maki-fromage.webp",
  "Maki Avocat": "img/produits/maki-avocat.webp",
  "Maki Saumon": "img/produits/maki-saumon.webp",
  "Maki Thon": "img/produits/maki-thon.webp",
  "Maki Saumon Fromage": "img/produits/maki-saumon-fromage.webp",
  "Gyoza": "img/produits/gyoza-poulet.webp",
  "Yakitori poulet": "img/produits/yakitori-poulet.webp",
  "Yakitori boeuf fromage": "img/produits/yakitori-boeuf-fromage.webp",
  "Coca-Cola": "img/produits/coca-cola-33cl.webp",
  "Coca-Cola Zéro": "img/produits/coca-cola-zero-33cl.webp",
  "Orangina": "img/produits/orangina-33cl.webp",
  "Fuzetea pêche": "img/produits/fuzetea-33cl.webp",
  "Badoit": "img/produits/badoit-50cl.webp",
  "Evian": "img/produits/evian-50cl.webp",
  "Yakitori boeuf fromage": "img/produits/yakitori-boeuf-fromage.webp",
  "Mochi coco": "img/produits/mochi-coco.webp",
  "Mochi mangue": "img/produits/mochi-mangue.webp",
  "Mochi pistache": "img/produits/mochi-pistache.webp",
  "California Thon Avocat": "img/produits/california-thon-avocat.webp",
  "California Thon Avocat · sesame": "img/produits/california-thon-avocat-sesame.webp",
  "California Thon Avocat · crispy": "img/produits/california-thon-avocat-crispy.webp",
  "California Saumon Avocat · sesame": "img/produits/california-saumon-avocat-sesame.webp",
  "California Saumon Avocat · crispy": "img/produits/california-saumon-avocat-crispy.webp",
  "California Saumon Fromage · crispy": "img/produits/california-saumon-fromage-crispy.webp",
  "California Tempura · crispy": "img/produits/california-tempura-crispy.webp",
  "Ramune": "img/produits/ramune.webp",
  "Calpis": "img/produits/calpis.webp",
  "Baguettes à sushi": "img/produits/baguettes-sushi.webp",
  "Oignon frit": "img/produits/oignon-frit.webp",
  "Sauce": "img/produits/sauce-soja.webp",
  "Mochi chocolat": "img/produits/mochi-chocolat.webp",
  "Mochi vanille": "img/produits/mochi-vanille.webp",
  "Oignon rings": "img/produits/oignon-rings.webp",
  "Tempura crevettes": "img/produits/tempura-crevettes.webp",
  "California Saumon Fromage": "img/produits/california-saumon-fromage.webp",
};

// Photo d'un produit, à placer sous son nom (vide si pas de photo)
export function photo(name) {
  return IMAGES[name]
    ? `<img class="product-photo" src="${IMAGES[name]}" alt="${name}" loading="lazy">`
    : "";
}
