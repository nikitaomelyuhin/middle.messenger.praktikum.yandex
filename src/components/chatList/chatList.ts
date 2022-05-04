import ChatController from "../../controllers/ChatController";
import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import Router from "../../utils/Router";
import { SidebarItem } from "../../utils/Store";
import template from "./chatList.hbs";

type SidebarProps = {
  events: Events;
  chatList: SidebarItem[];
}

export class SidebarList extends Block {
  private isEnabledActiveClass = false;

  constructor(props: SidebarProps) {
    super(props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!this.isEnabledActiveClass) {
      const chats = document.querySelectorAll(".chat-list__item");

      if (chats && chats.length) {
        const defaultChat = chats[0];
        const queryId = getQueryParameterByName("id");
        const defaultChatId = defaultChat.getAttribute("data-id");
        if (queryId && queryId !== defaultChatId) {
          return true;
        }
        const router = new Router("#app");
        router.go(`/messenger?id=${defaultChatId}`);
        let pageChatId: string | number | null = getQueryParameterByName("id");
        if (pageChatId) {
          pageChatId = parseFloat(pageChatId);
          this.isEnabledActiveClass = true;
          ChatController.setActiveClass(pageChatId);
        }
      }
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
