import Block from "../../utils/Block";
import template from "./messenger.hbs";
import SidebarList from "../../components/chatList/index";
import Button from "../../components/button/index";
import AddChatModal from "../../components/addChatModal/index";
import { getQueryParameterByName, isEmptyObject, isEqual } from "../../utils/helpers";
import SmallCard from "../../components/smallCard/index";
import MessengerChat from "../../components/messengerChat/index";
import Router from "../../utils/Router";
import ChatController from "../../controllers/ChatController";
import store from "../../utils/Store";

export class MessengerPage extends Block {
  private addChatModal: HTMLElement | null = null;

  private currentChatId: number | undefined;

  constructor(props?: any) {
    super(props);
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
      lastMessages: null,
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

  chatItemClick(e: any) {
    const chatId = e.currentTarget.getAttribute("data-id");
    const currentPageId = getQueryParameterByName("id");
    if (!currentPageId || currentPageId !== chatId) {
      Router.go(`/messenger?id=${chatId}`);
    }
    const updatedProps = (Object.values(this.props.sidebarData) as any);
    this.children.chatList.setProps({
      chatList: updatedProps,
    });
    ChatController.setActiveClass(parseFloat(chatId));
    // ChatController.getChats(chatId);
  }

  private _sidebarChatClickHandler() {
    const currentPageId = getQueryParameterByName("id");
    this.currentChatId = parseFloat(currentPageId);
    const elements = document.querySelectorAll(".chat-list__item");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.addEventListener("click", this.chatItemClick.bind(this));
    }
    this.children.messengerChat.setProps({
      chatId: this.currentChatId,
      lastMessages: this.props.lastMessages,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this._sidebarChatClickHandler();
    if (!isEqual(oldProps, newProps)) {
      // const currentPageId = getQueryParameterByName("id");
      // this.currentChatId = parseFloat(currentPageId);
      if (!isEmptyObject(newProps)) {
        const updatedProps = (Object.values(newProps.sidebarData) as any);
        this.currentChatId = updatedProps[0]?.id;
        this.children.chatList = new SidebarList({
          chatList: updatedProps,
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
