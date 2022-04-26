import ChatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import Button from "../button/index";
import Input from "../input/index";
import template from "./addUserModal.hbs";

export class AddUserModal extends Block {
  private userId: number;

  constructor() {
    super();
  }

  protected initChildren() {
    this.children.addUserInput = new Input({
      type: "number",
      placeholder: "Введите id пользвателя",
      events: {
        keyup: (e) => this.setUserToChat(e),
      },
    });
    this.children.button = new Button({
      type: "simple",
      text: "Добавить пользователя",
      events: {
        click: () => this.addUser(),
      },
    });
  }

  private setUserToChat(e: any) {
    this.userId = e.target.value;
  }

  private addUser() {
    const currentPageId = getQueryParameterByName("id");

    ChatController.addUser({
      users: [
        this.userId,
      ],
      chatId: parseFloat(currentPageId),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}