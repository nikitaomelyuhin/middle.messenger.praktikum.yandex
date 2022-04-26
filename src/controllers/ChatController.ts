import ChatApi from "../api/ChatApi";
import socket from "../api/Socket";
import Router from "../utils/Router";
import store, { SidebarItem, SidebarListData } from "../utils/Store";

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
      Router.go("/messenger");
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  }

  async addUser(data: AddUserData) {
    try {
      await this.api.addUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  async connectSocket(props: socketPayload) {
    const { chatId, userId } = props;
    try {
      const response = await this.api.connectSocket(chatId);
      socket.identification({
        userId,
        chatId,
        token: response.token,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getChats(chatId: number) {
    socket.getMessage(chatId);
  }

  setActiveClass(pageChatId: number) {
    const sidebarList = store.getState().chat?.sidebarData as SidebarItem[] | undefined;
    if (sidebarList) {
      const supportArray = sidebarList.reduce((acc, item) => {
        if (item.id === pageChatId) {
          item.activeClass = "chat-list__item_active";
        } else {
          item.activeClass = null;
        }
        return [...acc, item];
      }, []);
      store.set("chat.sidebarData", supportArray);
    }
  }
}

export default new ChatController();