import ChatApi from "../api/ChatApi";
import socket from "../api/Socket";
import Router from "../utils/Router";
import store from "../utils/Store";

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
      const response = await this.api.read();
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
      if (!this.token) {
        socket.identification({
          userId,
          chatId,
          token: response.token,
        });
      }
      this.token = response.token;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ChatController();