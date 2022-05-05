import socket from "../../api/Socket";
import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import { getQueryParameterByName, isEmptyObject } from "../../utils/helpers";
import Router from "../../utils/Router";
import store, { LastMessagesItem } from "../../utils/Store";
import AddChatModal from "../addChatModal/index";
import AddUserModal from "../addUserModal/index";
import Button from "../button/index";
import Messages from "../chatMessages/index";
import ChatName from "../chatName/index";
import Input from "../input/index";
import Link from "../link/index";
import template from "./messengerChat.hbs";

type MessengerChatProps = {
  events?: Events;
  chatId: string | number | null;
  isEmpty?: boolean;
  lastMessages: LastMessagesItem[];

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
          const router = new Router("#app");
          router.go("/settings");
        },
      },
    });
    this.children.sendMessageInput = new Input({
      type: "text",
      value: "",
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
    if (e.key === "Enter") {
      this.sendMessage();
    }
  }

  private sendMessage() {
    const currentPageId = getQueryParameterByName("id");
    if (this.message && currentPageId) {
      socket.sendMessage(this.message, parseFloat(currentPageId));
      this.message = "";
      this.children.sendMessageInput.element.querySelector("input").value = "";
    }
  }

  private _getChatAvatar(currentChat: any) {
    if (!currentChat.avatar) {
      if (!currentChat.last_message && store.getState().currentUser) {
        return store.getState().currentUser?.data.avatar;
      }
      return currentChat.last_message.user.avatar;
    }
    return currentChat.avatar;
  }

  componentDidMount(): void {

  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const isAvailableChat = !!store.getState().chat && !!store.getState().chat?.sidebarData && this.props && this.props.chatId;
    if (isAvailableChat) {
      const currentChat = store.getState().chat!.sidebarData!.find((item) => item.id === this.props.chatId);

      const avatar = this._getChatAvatar(currentChat);
      if (currentChat) {
        this.children.chatName = new ChatName({
          name: currentChat.title,
          avatar,
        });
      }
    }
    if (!newProps.chatId) {
      newProps.isEmpty = true;
    } else {
      newProps.isEmpty = false;
    }
    if (oldProps.lastMessages) {
      if (!isEmptyObject(newProps)) {
        setTimeout(() => {
          document.querySelector(".messenger__body")?.scroll({ top: document.querySelector(".messenger__body")!.scrollHeight });
        });
        this.children.messages = new Messages({
          messages: newProps.lastMessages[`${newProps.chatId}`],
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