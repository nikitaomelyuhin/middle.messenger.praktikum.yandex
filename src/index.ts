import Router from "./utils/Router";
import LoginPage from "./pages/login/index";
import { RegisterPage } from "./pages/register/register";
import ChatPage from "./pages/chat/index";
import UserCard from "./pages/userCard/index";
import AuthController from "./controllers/AuthController";
import store, { StoreEvents } from "./utils/Store";
import ChatController from "./controllers/ChatController";

document.addEventListener("DOMContentLoaded", async () => {
  Router
    .use("/", LoginPage)
    .use("/chat", ChatPage)
    .use("/register", RegisterPage)
    .use("/user-card", UserCard)
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
