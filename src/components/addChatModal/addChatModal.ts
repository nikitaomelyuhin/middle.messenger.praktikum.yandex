import ChatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import Button from "../button/index";
import Input from "../input/index";
import template from "./addChatModal.hbs";

export class AddChatModal extends Block {
  private chatName = "";

  constructor() {
    super();
  }

  protected initChildren() {
    this.children.addChatInput = new Input({
      type: "text",
      placeholder: "Введите название чата",
      events: {
        keyup: (e) => this.setChatName(e),
      },
    });
    this.children.button = new Button({
      type: "simple",
      text: "Создать чат",
      events: {
        click: () => this.addChat(),
      },
    });
  }

  private setChatName(e: any) {
    this.chatName = e.target.value;
  }

  private addChat() {
    ChatController.createChat({
      title: this.chatName,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}