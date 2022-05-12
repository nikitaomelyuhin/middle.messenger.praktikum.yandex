import Router from "./utils/Router";
import LoginPage from "./pages/login/index";
import SignUpPage from "./pages/signUp/index";
import MessengerPage from "./pages/messenger/index";
import Settings from "./pages/settings/index";
import AuthController from "./controllers/AuthController";
import ChatController from "./controllers/ChatController";
import store from "./utils/Store";

document.addEventListener("DOMContentLoaded", async () => {
  const router = new Router("#app");
  router
    .use("/", LoginPage)
    .use("/messenger", MessengerPage)
    .use("/sign-up", SignUpPage)
    .use("/settings", Settings)
    .start();
  await AuthController.fetchUser();
  if (store.getState().currentUser?.data) {
    await ChatController.fetchChats();
    // пока не придумал как по другому получить чат, когда тебя добавляет другой пользователь в чат
    setInterval(() => {
      ChatController.fetchChats();
    }, 30000);
  }
});
