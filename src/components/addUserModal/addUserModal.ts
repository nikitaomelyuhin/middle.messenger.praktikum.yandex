import ChatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import store from "../../utils/Store";
import Button from "../button/index";
import Error from "../error/index";
import Input from "../input/index";
import template from "./addUserModal.hbs";

type AddUserModalProps = {
  active: string;
  hasError?: false;
}
export class AddUserModal extends Block {
  private userId: number;

  constructor(props: AddUserModalProps) {
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
      const addUserModal = document.querySelector(".add-user-modal");
      addUserModal?.addEventListener("click", (e) => this.closeModal(e));
      return;
    }
    this.props.active = "";
  }

  private closeModal(e: any): void {
    if (e.target.classList.contains("modal__backdrop")) {
      this.props.active = "";
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}