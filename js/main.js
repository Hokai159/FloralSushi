// Point d'entrée : relie les vues, les contrôleurs et les événements du navigateur.
import { render } from "./controllers/router.js";
import { buildPetals } from "./utils/dom.js";
import { closeItem, openItem } from "./views/components/modal.js";
import { toast } from "./views/components/toast.js";
import {
  chooseBox, changePick, changeExtra, removeExtra, clearBox, clearCart,
  saveDraft, toggleTip, setTip, setCustomTip,
} from "./controllers/cart.js";
import { placeOrder } from "./controllers/order.js";
import { setProtein } from "./controllers/filters.js";
import { register, login, logout, saveProfile, clearCard } from "./controllers/account.js";

// Actions appelées depuis le HTML (onclick, onsubmit, oninput, onchange)
Object.assign(window, {
  chooseBox, changePick, changeExtra, removeExtra, clearBox, clearCart,
  saveDraft, toggleTip, setTip, setCustomTip, placeOrder,
  register, login, logout, saveProfile, clearCard,
  openItem, closeItem, toast, setProtein,
});

document.addEventListener("keydown", e => { if (e.key === "Escape") closeItem(); });
window.addEventListener("hashchange", render);
buildPetals();
render();
