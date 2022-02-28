import { ChatPage } from "./pages/chat/chat";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const chatPage = new ChatPage();
  renderDOM("#app", chatPage);
});