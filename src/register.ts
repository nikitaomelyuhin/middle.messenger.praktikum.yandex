// import { Button } from "./components/button/button";
import { RegisterPage } from "./pages/register/register";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const registerPage = new RegisterPage();
  renderDOM("#app", registerPage);
});