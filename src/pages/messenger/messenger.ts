import Block from "../../utils/Block";
import template from "./messenger.hbs";
import SidebarList from "../../components/chatList/index";
import Button from "../../components/button/index";
import AddChatModal from "../../components/addChatModal/index";
import { isEmptyObject } from "../../utils/helpers";
import SmallCard from "../../components/smallCard/index";
import MessengerChat from "../../components/messengerChat/index";
import Router from "../../utils/Router";
import ChatController from "../../controllers/ChatController";
import store from "../../utils/Store";

type Id = string | null | number
export class MessengerPage extends Block {
  private currentChatId: Id = store.getState()?.activeChatId;

  constructor(props?: any) {
    super(props);
    this.currentChatId = store.getState()?.activeChatId;
  }

  public getChatId() {
    return this.currentChatId;
  }

  protected initChildren() {
    this.children.smallCard = new SmallCard({});
    this.children.addChatModal = new AddChatModal({
      active: "",
    });
    this.children.addChat = new Button({
      text: "Добавить новый чат",
      type: "simple",
      events: {
        click: () => this.openModal(),
      },
    });
    this.children.messengerChat = new MessengerChat({
      chatId: store.getState()?.activeChatId,
      lastMessages: store.getState().chat?.lastMessages[`${store.getState()?.activeChatId}`],
      isEmpty: !(store.getState()?.activeChatId),
    });
    this.children.chatList = new SidebarList({
      chatList: this.props.sidebarData,
      events: {
        click: (e: any) => this._sidebarChatClickHandler(e),
      },
    });
  }

  private openModal() {
    this.children.addChatModal.setProps({
      active: "modal_active",
    });
    this.children.addChatModal.element.addEventListener("click", (e: any) => this.closeModal(e));
  }

  closeModal(e: any): void {
    if (e.target.classList.contains("modal__backdrop")) {
      this.children.addChatModal.setProps({
        active: "",
      });
    }
  }

  private _sidebarChatClickHandler(e: any) {
    let currentElement = e.target;
    let currentId: Id = null;
    while (!currentId) {
      currentId = parseFloat(currentElement.getAttribute("data-id"));
      currentElement = currentElement.parentNode;
    }
    const pageId = store.getState().activeChatId;
    const router = new Router("#app");
    if (pageId && !currentElement.classList.contains("sidebar-item__block")) {
      router.go(`/messenger?id=${currentId}`);
      this.currentChatId = currentId;
      ChatController.setActiveClass(currentId);
      ChatController.setActiveId(currentId);
    }
    if (currentElement.classList.contains("sidebar-item__block")) {
      this._removeChat(currentId);
    }
  }

  private async _removeChat(id: number) {
    await ChatController.removeChat(id);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.currentChatId = store.getState().activeChatId;
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
    aa;
  }

  render() {
    return this.compile(template, []);
  }
}
