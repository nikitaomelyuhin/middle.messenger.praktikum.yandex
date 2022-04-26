import ChatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import Router from "../../utils/Router";
import store, { SidebarListData, StoreEvents } from "../../utils/Store";
import template from "./chatList.hbs";

export class SidebarList extends Block {
  constructor(props: SidebarListData) {
    super(props);
  }

  protected componentDidMount(): void {
    const chats = document.querySelectorAll(".chat-list__item");

    if (chats && chats.length) {
      const defaultChat = chats[0];
      const queryId = getQueryParameterByName("id");
      const defaultChatId = defaultChat.getAttribute("data-id");
      if (queryId && queryId !== defaultChatId) {
        return;
      }
      Router.go(`/messenger?id=${defaultChatId}`);
      let pageChatId = getQueryParameterByName("id");
      if (pageChatId) {
        pageChatId = parseFloat(pageChatId);
        ChatController.setActiveClass(pageChatId);
      }
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
