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

  private token: string;

  constructor() {
    this.api = new ChatApi();
  }

  async createChat(data: CreateChat) {
    try {
      await this.api.create(data);
      this.fetchChats();
    } catch (err) {
      throw new Error(err);
    }
  }

  async fetchChats() {
    try {
      const response = await this.api.read() as SidebarItem[];
      response.forEach((item) => {
        item.activeClass = null;
      });
      store.set("chat.sidebarData", response);
    } catch (err) {
      throw new Error(err);
    }
  }

  async addUser(data: AddUserData) {
    try {
      store.set("addUser.loading", true);
      await this.api.addUser(data);
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

  async getChatUsers(chatId: number) {
    try {
      const response = await this.api.getChatUsers(chatId);
      store.set(`chatUsers.data.${chatId}`, response);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ChatController();