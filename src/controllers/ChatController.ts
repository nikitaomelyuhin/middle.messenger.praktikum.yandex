import ChatApi from "../api/ChatApi";
import socket from "../api/Socket";
import Router from "../utils/Router";
import store, { SidebarItem } from "../utils/Store";

export interface CreateChat {
  title: string;
}

export interface AddUserData {
  users: number[];
  chatId: number;
}

export interface socketPayload {
  chatId: number;
  userId: number;
}

class ChatController {
  private api: ChatApi;

  constructor() {
    this.api = new ChatApi();
  }

  async createChat(data: CreateChat) {
    try {
      await this.api.create(data);
      await this.fetchChats();
      const storeData = store.getState();
      const newId = storeData.chat!.sidebarData![0].id;
      this.setActiveClass(newId);
      const router = new Router("#app");
      const newData = { ...storeData.chat };
      store.set("chat", newData);
      store.set("activeChatId", newId);
      router.go(`/messenger?id=${newId}`);
      const storeChats = store.getState().chat?.sidebarData;
      const storeUserId = store.getState().currentUser?.data.id;
      if (storeChats?.length && storeUserId) {
        storeChats.forEach((chat) => {
          this.connectSocket({
            chatId: chat.id,
            userId: storeUserId,
          });
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async fetchChats() {
    try {
      const response = await this.api.read() as SidebarItem[];
      response.forEach((item) => {
        if (store.getState().activeChatId !== item.id) {
          item.activeClass = null;
        } else {
          item.activeClass = "chat-list__item_active";
        }
      });
      store.set("chat.sidebarData", response);
      if (response.length) {
        const socketKeys = socket.getSocketsKeys();
        response.forEach((item) => {
          if (!socketKeys.includes(item.id)) {
            this.connectSocket({
              chatId: item.id,
              userId: store.getState()!.currentUser!.data!.id,
            });
          }
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async addUser(data: AddUserData) {
    try {
      store.set("addUser.loading", true);
      await this.api.addUser(data);
      await socket.sendMessage("Добавил нового пользователя", data.chatId);
      store.set("addUser.error", null);
    } catch (error) {
      if (error?.response?.data?.description) {
        store.set("addUser.error", error.response.data.description);
      } else {
        store.set("addUser.error", "Что-то пошло не так, попробуйте еще раз");
      }
    } finally {
      store.set("addUser.loading", false);
    }
  }

  async connectSocket(props: socketPayload) {
    const { chatId, userId } = props;
    try {
      const response = await this.api.connectSocket(chatId);
      const { token } = response;
      socket.identification({
        userId,
        chatId,
        token,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  getChats(chatId: number) {
    socket.getMessage(chatId);
  }

  setActiveClass(pageChatId: number) {
    const sidebarList = store.getState().chat?.sidebarData as SidebarItem[] | undefined;
    if (sidebarList) {
      const supportArray = [...sidebarList].reduce((acc, item) => {
        if (item.id === pageChatId) {
          item.activeClass = "chat-list__item_active";
        } else {
          item.activeClass = null;
        }
        return [...acc, item];
      }, []);
      store.set("chat.sidebarData", [...supportArray]);
    }
  }

  setActiveId(id: number) {
    store.set("activeChatId", id);
  }

  async getChatUsers(chatId: number) {
    try {
      const response = await this.api.getChatUsers(chatId);
      store.set(`chatUsers.data.${chatId}`, response);
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeChat(chatId: number) {
    try {
      await this.api.delete({
        users: [
          store.getState().currentUser!.data.id,
        ],
        chatId,
      });
      const storeData = store.getState();
      const router = new Router("#app");
      if (storeData?.chat?.sidebarData?.length) {
        await this.fetchChats();
        const nextChatId = storeData.chat.sidebarData[0]?.id;
        if (nextChatId) {
          router.go(`/messenger?id=${nextChatId}`);
          store.set("activeChatId", nextChatId);
          this.setActiveClass(nextChatId);
        } else {
          router.go("/messenger?id=0");
          store.set("activeChatId", 0);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new ChatController();