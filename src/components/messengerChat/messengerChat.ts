import socket from "../../api/Socket";
import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import { isEmptyObject, isEqual } from "../../utils/helpers";
import Router from "../../utils/Router";
import AddChatModal from "../addChatModal/index";
import AddUserModal from "../addUserModal/index";
import Button from "../button/index";
import Messages from "../chatMessages/index";
import Input from "../input/index";
import Link from "../link/index";
import template from "./messengerChat.hbs";

interface MessengerChatProps {
  events?: Events
  chatId: number | undefined
}

export class MessengerChat extends Block {
  private addUserModal: HTMLElement | null = null;

  private addChatModal: HTMLElement | null = null;

  private message: string;

  constructor(props: MessengerChatProps) {
    super(props);
    if (!this.props.chatId) {
      this.props.isEmpty = true;
    } else {
      this.props.isEmpty = false;
    }
    if (this.element) {
      this.addUserModal = this.element.querySelector(".add-user-modal");
      this.addChatModal = this.element.querySelector(".add-chat-modal");
    }
    this.addUserModal?.addEventListener("click", (e) => this.closeModal(e));
    this.addChatModal?.addEventListener("click", (e) => this.closeModal(e));
  }

  protected initChildren(): void {
    this.children.addUsersButton = new Button({
      text: "Добавить нового пользователя",
      events: {
        click: () => this.openModal(".add-user-modal"),
      },
    });
    this.children.addChatButton = new Button({
      text: "Добавить новый чат",
      events: {
        click: () => this.openModal(".add-chat-modal"),
      },
    });
    this.children.link = new Link({
      text: "Ваш профиль",
      events: {
        click: () => {
          Router.go("/settings");
        },
      },
    });
    this.children.sendMessageInput = new Input({
      type: "text",
      placeholder: "Сообщение",
      events: {
        keyup: (e) => this.setMessageText(e),
      },
    });
    this.children.sendMessageButton = new Button({
      isIconed: true,
      iconClass: "fa-solid fa-arrow-right",
      type: "round",
      events: {
        click: () => this.sendMessage(),
      },
    });
    this.children.addUserModal = new AddUserModal();
    this.children.addChatModal = new AddChatModal();
  }

  private openModal(selector: string) {
    const modal = document.querySelector(selector);
    modal?.classList.add("modal_active");
  }

  closeModal(e: any): void {
    if (e.target.classList.contains("modal__backdrop")) {
      e.currentTarget.classList.remove("modal_active");
    }
  }

  private setMessageText(e: any) {
    this.message = e.target.value;
  }

  private sendMessage() {
    socket.sendMessage(this.message);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    setTimeout(() => {
      document.querySelector(".messenger__body")!.scrollTop = document.querySelector(".messenger__body")!.scrollHeight;
    });
    if (!isEqual(oldProps, newProps)) {
      if (!isEmptyObject(newProps)) {
        this.children.messages = new Messages({
          messages: newProps.lastMessages,
        });
        return true;
      }
    }
    return false;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}