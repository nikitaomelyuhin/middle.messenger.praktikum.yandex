import ChatController from "../controllers/ChatController";
import { formatDate } from "../utils/helpers";
import store from "../utils/Store";

interface SocketConnectData {
  userId: number;
  chatId: number;
  token: string;
}

class Socket {
  private socket: any = {};

  private userId: number;

  constructor() { }

  public identification(props: SocketConnectData) {
    this.socketConnect(props);
    this.getMessage(props.chatId);
  }

  private socketConnect(props?: SocketConnectData) {
    if (props) {
      const { userId, chatId, token } = props;
      this.userId = userId;
      this.socket[`${chatId}`] = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      this.supportConnection(chatId);
    }
  }

  private supportConnection(chatId: number) {
    this.socket[`${chatId}`].addEventListener("open", () => {
      setInterval(() => {
        this.socket[`${chatId}`].send(JSON.stringify({
          type: "ping",
        }));
      }, 30000);
      this.socket[`${chatId}`].send(JSON.stringify({
        content: "0",
        type: "get old",
      }));
    });
  }

  public sendMessage(message: string, chatId: number) {
    this.socket[`${chatId}`].send(JSON.stringify({
      type: "message",
      content: message,
    }));
  }

  public getMessage(chatId: number) {
    this.socket[`${chatId}`].addEventListener("message", (event: any) => {
      let data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        ChatController.getChatUsers(chatId);
        data = data.reverse();
        const result = [];
        let supportArray = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const previousElement = data[i - 1];
          element.time = formatDate(element.time);
          element.isSelf = data.user_id === this.userId;
          if (previousElement && element.user_id !== previousElement.user_id) {
            result.push(supportArray);
            supportArray = [];
          }
          supportArray.push(element);
          if (i === data.length - 1) {
            result.push(supportArray);
          }
        }
        store.set(`chat.lastMessages.${chatId}`, result);
      }
      if (data.type === "message") {
        const currentState = [...store.getState().chat!.lastMessages[chatId]];
        data.time = formatDate(data.time);
        data.isSelf = data.user_id === this.userId;
        if (currentState[currentState.length - 1][1].user_id === data.user_id) {
          currentState[currentState.length - 1].push(data);
        } else {
          const chatUsers = store.getState().chatUsers?.data[chatId];
          const currentUser = chatUsers?.find((user) => user.id === data.user_id);
          const supportArray = [
            {
              avatar: currentUser?.avatar,
              isSelf: data.user_id === this.userId,
              name: currentUser?.display_name ?? currentUser?.first_name,
            },
            data,
          ];
          currentState.push(supportArray);
        }
        store.set(`chat.lastMessages.${chatId}`, currentState);
      }
    });
  }
}

const socket = new Socket();

export default socket;