import store from "../utils/Store";

interface SocketConnectData {
  userId: number;
  chatId: number;
  token: string;
}

class Socket {
  private connectionProps: SocketConnectData;

  private socket: any = {};

  private userId: number;

  constructor() {
  }

  public identification(props: SocketConnectData) {
    this.connectionProps = props;
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
    this.socket[`${chatId}`].addEventListener("open", (event) => {
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
    this.socket[`${chatId}`].send(JSON.stringify({
      content: "0",
      type: "get old",
    }));
  }

  public getMessage(chatId: number) {
    this.socket[`${chatId}`].addEventListener("message", (event: any) => {
      const data = JSON.parse(event.data);
      // console.log(event);
      // console.log(data.type, chatId);
      // debugger;
      if (Array.isArray(data)) {
        console.log(data);
        data.forEach((message) => {
          if (message.user_id === this.userId) {
            message.isSelf = true;
            return;
          }
          message.isSelf = false;
        });
        store.set(`chat.lastMessages.${chatId}`, data.reverse());
      }
      // }
    });
  }
}

const socket = new Socket();

export default socket;