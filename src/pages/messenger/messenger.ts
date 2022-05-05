import Block from "../../utils/Block";
import template from "./messenger.hbs";
import SidebarList from "../../components/chatList/index";
import Button from "../../components/button/index";
import AddChatModal from "../../components/addChatModal/index";
import { getQueryParameterByName, isEmptyObject } from "../../utils/helpers";
import SmallCard from "../../components/smallCard/index";
import MessengerChat from "../../components/messengerChat/index";
import Router from "../../utils/Router";
import ChatController from "../../controllers/ChatController";
import store from "../../utils/Store";

type Id = string | null | number
export class MessengerPage extends Block {
  private addChatModal: HTMLElement | null = null;

  private currentChatId: Id;

  constructor(props?: any) {
    super(props);
    const router = new Router("#app");
    let pageId: Id = getQueryParameterByName("id");
    if (this.props.sidebarData && this.props.sidebarData.length && !pageId) {
      router.go(`/messenger?id=${this.props.sidebarData[0].id}`);
      pageId = this.props.sidebarData[0].id;
      store.set("chat", this.props);
      this.children.messengerChat.setProps({
        chatId: this.currentChatId,
        lastMessages: this.props.lastMessages,
        isEmpty: !this.currentChatId,
      });
    }
    if (this.element) {
      this.addChatModal = this.element.querySelector(".add-chat-modal");
    }
    this.addChatModal?.addEventListener("click", (e) => this.closeModal(e));
  }

  public getChatId() {
    return this.currentChatId;
  }

  protected initChildren() {
    this.children.smallCard = new SmallCard({});
    this.children.addChatModal = new AddChatModal();
    this.children.addChat = new Button({
      text: "Добавить новый чат",
      type: "simple",
      events: {
        click: () => this.openModal(".add-chat-modal"),
      },
    });
    this.children.messengerChat = new MessengerChat({
      chatId: this.currentChatId,
      lastMessages: this.props.lastMessages,
      isEmpty: !(this.currentChatId),
    });
    this.children.chatList = new SidebarList({
      chatList: this.props.sidebarData,
      events: {
        click: (e: any) => this._sidebarChatClickHandler(e),
      },
    });
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

  private _sidebarChatClickHandler(e: any) {
    let currentElement = e.target;
    let currentId: Id = null;
    while (!currentId) {
      currentId = parseFloat(currentElement.getAttribute("data-id"));
      currentElement = currentElement.parentNode;
    }
    let pageId: Id = getQueryParameterByName("id");
    const router = new Router("#app");
    if (pageId) {
      pageId = parseFloat(pageId);
      router.go(`/messenger?id=${currentId}`);
      this.currentChatId = currentId;
      ChatController.setActiveClass(currentId);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const pageId = getQueryParameterByName("id");
    if (pageId) {
      this.currentChatId = parseFloat(pageId);
    }
    this.children.messengerChat.setProps({
      chatId: this.currentChatId,
      lastMessages: newProps.lastMessages,
      isEmpty: !this.currentChatId,
    });
    if (!isEmptyObject(newProps)) {
      const updatedProps = (Object.values(newProps.sidebarData) as any);
      this.children.chatList.setProps({
        chatList: updatedProps,
      });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, []);
  }
}
