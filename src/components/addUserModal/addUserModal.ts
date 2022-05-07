import ChatController from "../../controllers/ChatController";
import { Modal } from "../../typings/global";
import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import store from "../../utils/Store";
import Button from "../button/index";
import Error from "../error/index";
import Input from "../input/index";
import template from "./addUserModal.hbs";

export class AddUserModal extends Block {
  private userId: number;

  constructor(props: Modal) {
    super(props);
  }

  protected initChildren() {
    this.children.button = new Button({
      type: "simple",
      text: "Добавить пользователя",
      events: {
        click: () => this.addUser(),
      },
    });
    this.children.addUserInput = new Input({
      type: "number",
      placeholder: "Введите id пользвателя",
      value: "",
      events: {
        keyup: (e) => this.setUserToChat(e),
      },
    });
    this.children.error = new Error({
      error: null,
    });
  }

  private setUserToChat(e: any) {
    this.userId = e.target.value;
  }

  private async addUser() {
    const currentPageId = getQueryParameterByName("id");
    if (currentPageId) {
      await ChatController.addUser({
        users: [
          this.userId,
        ],
        chatId: parseFloat(currentPageId),
      });
    }
    const addUserData = store.getState().addUser;
    if (addUserData?.error) {
      this.props.hasError = true;
      this.children.error.setProps({
        error: addUserData.error,
      });
      this._closeModal();
      return;
    }
    this.props.active = "";
  }

  private _closeModal(): void {
    this.props.active = "";
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}