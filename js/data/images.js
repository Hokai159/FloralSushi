// Photos des produits, affichées sous le nom dans la carte, le composeur et les extras.
// Clé : nom exact du produit. Pour les variantes (sésame, crispy), clé « nom · variante ».
export const IMAGES = {
  "Sushi Saumon": "img/produits/nigiri-saumon.png",
  "Sushi Thon": "img/produits/nigiri-thon.png",
  "Sushi Saumon Fromage": "img/produits/tataki-saumon-fromage.png",
  "California Saumon Avocat": "img/produits/california-saumon-avocat.png",
  "California Tempura": "img/produits/california-tempura.png",
  "Spring Roll Saumon Avocat": "img/produits/spring-saumon-avocat.jpg",
  "Spring Roll Saumon Fromage": "img/produits/spring-saumon-fromage.jpg",
  "Sashimi saumon": "img/produits/sashimi-saumon.webp",
  "Sashimi thon": "img/produits/sashimi-thon.webp",
  "Sashimi mixte thon saumon": "img/produits/sashimi-mixte.webp",
  "Maki Fromage": "img/produits/maki-fromage.png",
  "Maki Avocat": "img/produits/maki-avocat.jpg",
  "Maki Saumon": "img/produits/maki-saumon.png",
  "Maki Thon": "img/produits/maki-thon.jpg",
  "Maki Saumon Fromage": "img/produits/maki-saumon-fromage.png",
  "Gyoza": "img/produits/gyoza-poulet.webp",
  "Yakitori poulet": "img/produits/yakitori-poulet.webp",
  "Yakitori boeuf fromage": "img/produits/yakitori-boeuf-fromage.webp",
  "Coca-Cola": "img/produits/coca-cola-33cl.webp",
  "Coca-Cola Zéro": "img/produits/coca-cola-zero-33cl.webp",
  "Orangina": "img/produits/orangina-33cl.png",
  "Fuzetea pêche": "img/produits/fuzetea-33cl.webp",
  "Badoit": "img/produits/badoit-50cl.webp",
  "Evian": "img/produits/evian-50cl.webp",
  "Yakitori boeuf fromage": "img/produits/yakitori-boeuf-fromage.webp",
  "Mochi coco": "img/produits/mochi-coco.webp",
  "Mochi mangue": "img/produits/mochi-mangue.webp",
  "Mochi pistache": "img/produits/mochi-pistache.webp",
  "California Thon Avocat": "img/produits/california-thon-avocat.png",
  "California Thon Avocat · sesame": "img/produits/california-thon-avocat-sesame.jpg",
  "California Thon Avocat · crispy": "img/produits/california-thon-avocat-crispy.jpg",
  "California Saumon Avocat · sesame": "img/produits/california-saumon-avocat-sesame.jpg",
  "California Saumon Avocat · crispy": "img/produits/california-saumon-avocat-crispy.jpg",
  "California Saumon Fromage · crispy": "img/produits/california-saumon-fromage-crispy.jpg",
  "California Tempura · crispy": "img/produits/california-tempura-crispy.jpg",
};

// Photo d'un produit, à placer sous son nom (vide si pas de photo)
export function photo(name) {
  return IMAGES[name]
    ? `<img class="product-photo" src="${IMAGES[name]}" alt="${name}" loading="lazy">`
    : "";
}
