import { state } from "../state/state.js";
import { render } from "./router.js";

// Change le filtre par protéine, puis réaffiche la page
export function setProtein(protein) {
  state.protein = protein;
  render();
}
