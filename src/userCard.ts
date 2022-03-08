import { UserCard } from "./pages/userCard/userCard";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const userCard = new UserCard();
  renderDOM("#app", userCard);
});