import Router from "./utils/Router";
import LoginPage from "./pages/login/index";
import { SignUpPage } from "./pages/signUp/signUp";
import MessengerPage from "./pages/messenger/index";
import Settings from "./pages/settings/index";
import AuthController from "./controllers/AuthController";
import store, { StoreEvents } from "./utils/Store";
import ChatController from "./controllers/ChatController";

document.addEventListener("DOMContentLoaded", async () => {
  Router
    .use("/", LoginPage)
    .use("/messenger", MessengerPage)
    .use("/sign-up", SignUpPage)
    .use("/settings", Settings)
    .start();
  await AuthController.fetchUser();
  await ChatController.fetchChats();
  const storeChats = store.getState().chat?.sidebarData;
  const storeUserId = store.getState().currentUser?.data.id;
  if (storeChats && storeChats.length) {
    ChatController.connectSocket({
      chatId: storeChats[0].id,
      userId: storeUserId,
    });
  }
  store.on(StoreEvents.Updated, () => {
    // console.log(store.getState().lastMessages);
  });
});
