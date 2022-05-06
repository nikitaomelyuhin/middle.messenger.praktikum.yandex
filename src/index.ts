import Router from "./utils/Router";
import LoginPage from "./pages/login/index";
import SignUpPage from "./pages/signUp/index";
import MessengerPage from "./pages/messenger/index";
import Settings from "./pages/settings/index";
import AuthController from "./controllers/AuthController";
import store from "./utils/Store";
import ChatController from "./controllers/ChatController";

document.addEventListener("DOMContentLoaded", async () => {
  const router = new Router("#app");
  router
    .use("/", LoginPage)
    .use("/messenger", MessengerPage)
    .use("/sign-up", SignUpPage)
    .use("/settings", Settings)
    .start();
  await AuthController.fetchUser();
  await ChatController.fetchChats();
  const storeChats = store.getState().chat?.sidebarData;
  const storeUserId = store.getState().currentUser?.data.id;
  if (storeChats?.length && storeUserId) {
    storeChats.forEach((chat) => {
      ChatController.connectSocket({
        chatId: chat.id,
        userId: storeUserId,
      });
    });
  }
});
