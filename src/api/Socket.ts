import store from "../utils/Store";

interface SocketConnectData {
  userId: number;
  chatId: number;
  token: string;
}

class Socket {
  private connectionProps: SocketConnectData;

  private socket: any;

  private userId: number;

  constructor() {
  }

  public identification(props: SocketConnectData) {
    this.connectionProps = props;
    this.socketConnect(props);
    this.getMessage();
  }

  private socketConnect(props?: SocketConnectData) {
    if (props) {
      const { userId, chatId, token } = props;
      this.userId = userId;
      if (!this.socket) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      }
      this.supportConnection();
    }
  }

  private supportConnection() {
    this.socket.addEventListener("open", (event) => {
      setInterval(() => {
        this.socket.send(JSON.stringify({
          type: "ping",
        }));
      }, 30000);
      this.socket.send(JSON.stringify({
        content: "0",
        type: "get old",
      }));
    });
  }

  public sendMessage(message: string) {
    this.socket.send(JSON.stringify({
      type: "message",
      content: message,
    }));
    this.socket.send(JSON.stringify({
      content: "0",
      type: "get old",
    }));
  }

  private getMessage() {
    this.socket.addEventListener("message", (event: any) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        data.forEach((message) => {
          if (message.user_id === this.userId) {
            message.isSelf = true;
            return;
          }
          message.isSelf = false;
        });
        store.set("chat.lastMessages", data.reverse());
        return;
      }

      if (data.type === "message") {
        this.socket.send(JSON.stringify({
          content: "0",
          type: "get old",
        }));
      }
    });
  }
}

const socket = new Socket();

export default socket;