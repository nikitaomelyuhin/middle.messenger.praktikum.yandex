import { LoginPage } from "./pages/login/login";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const loginPage = new LoginPage();
  renderDOM("#app", loginPage);
});