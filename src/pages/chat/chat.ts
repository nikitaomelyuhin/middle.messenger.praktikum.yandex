import Block from "../../utils/Block";
import template from "./chat.hbs";
import SidebarList from "../../components/chatList/index";
import Messages from "../../components/chatMessages/index";
import Link from "../../components/link/index";
import Router from "../../utils/Router";
import Button from "../../components/button/index";
import AddChatModal from "../../components/addChatModal/index";
import ChatController from "../../controllers/ChatController";
import { isEmptyObject, isEqual } from "../../utils/helpers";
import { SidebarListData } from "../../utils/Store";
import AddUserModal from "../../components/addUserModal/index";
import Input from "../../components/input/index";
import text from "../../components/text/index";
import socket from "../../api/Socket";

export class ChatPage extends Block {
  private addChatModal: HTMLElement | null = null;

  private addUserModal: HTMLElement | null = null;

  private chat: HTMLElement | null = null;

  private currentChatId: number;

  private message: string;

  constructor(props?: any) {
    super(props);
    if (this.element) {
      this.addChatModal = this.element.querySelector(".add-chat-modal");
      this.addUserModal = this.element.querySelector(".add-user-modal");
    }
    this.addChatModal?.addEventListener("click", (e) => this.closeModal(e));
    this.addUserModal?.addEventListener("click", (e) => this.closeModal(e));
  }

  public getChatId() {
    return this.currentChatId;
  }

  protected initChildren() {
    this.children.addUsersButton = new Button({
      text: "Добавить нового пользователя",
      events: {
        click: () => this.openModal(".add-user-modal"),
      },
    });
    this.children.addChatModal = new AddChatModal();
    this.children.addUserModal = new AddUserModal();
    this.children.addChat = new Button({
      text: "Добавить новый чат",
      type: "simple",
      events: {
        click: () => this.openModal(".add-chat-modal"),
      },
    });
    this.children.link = new Link({
      text: "Нет аккаунта?",
      events: {
        click: () => {
          Router.go("/user-card");
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
  }

  private setMessageText(e: any) {
    this.message = e.target.value;
  }

  private sendMessage() {
    socket.sendMessage(this.message);
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

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    setTimeout(() => {
      document.querySelector(".chat__body")!.scrollTop = document.querySelector(".chat__body")!.scrollHeight;
    });

    if (!isEqual(oldProps, newProps)) {
      if (!isEmptyObject(newProps)) {
        const updatedProps = (Object.values(newProps.sidebarData) as any);
        this.currentChatId = updatedProps[0].id;
        this.children.chatList = new SidebarList({
          chatList: updatedProps,
        });
        this.children.messages = new Messages({
          messages: newProps.lastMessages,
        });
        return true;
      }
    }
    return false;
  }

  render() {
    return this.compile(template, []);
  }
}

// document.addEventListener("DOMContentLoaded", () => {

// });
