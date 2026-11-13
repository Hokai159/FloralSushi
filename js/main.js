// Point d'entrée : relie les vues, les contrôleurs et les événements du navigateur.
import { render } from "./controllers/router.js";
import { state } from "./state/state.js";
import { buildPetals } from "./utils/dom.js";
import { closeItem, openItem, setVariante } from "./views/components/modal.js";
import { toast } from "./views/components/toast.js";
import {
  chooseBox, changePick, changeExtra, removeExtra, clearBox, clearCart,
  saveDraft, toggleTip, setTip, setCustomTip,
} from "./controllers/cart.js";
import { placeOrder } from "./controllers/order.js";
import { setProtein } from "./controllers/filters.js";
import { setPokeSize, togglePokeOption, addPoke, removePoke } from "./controllers/poke.js";
import { register, login, logout, saveProfile, loadOrders, tapLot, repeatOrder } from "./controllers/account.js";
import { refreshProfile } from "./services/profile.js";

// Actions appelées depuis le HTML (onclick, onsubmit, oninput, onchange)
Object.assign(window, {
  chooseBox, changePick, changeExtra, removeExtra, clearBox, clearCart,
  saveDraft, toggleTip, setTip, setCustomTip, placeOrder,
  register, login, logout, saveProfile, tapLot, repeatOrder,
  openItem, closeItem, toast, setProtein, setVariante,
  setPokeSize, togglePokeOption, addPoke, removePoke,
});

document.addEventListener("keydown", e => { if (e.key === "Escape") closeItem(); });
window.addEventListener("hashchange", render);
buildPetals();
render();
if (state.session) { refreshProfile().then(render); loadOrders(); }
