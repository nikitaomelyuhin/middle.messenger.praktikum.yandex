import Block from "../../utils/Block";
import { getQueryParameterByName } from "../../utils/helpers";
import Router from "../../utils/Router";
import { SidebarListData } from "../../utils/Store";
import template from "./chatList.hbs";

export class SidebarList extends Block {
  constructor(props: SidebarListData) {
    super(props);
    const chats = document.querySelectorAll(".chat-list__item");
    if (chats && chats.length) {
      const defaultChat = chats[0];
      const defaultChatId = defaultChat.getAttribute("data-id");
      Router.go(`/messenger?id=${defaultChatId}`);
      defaultChat.classList.add("chat-list__item_active");
      const pageChatId = getQueryParameterByName("id");
      this.props.chatList.forEach((item) => {
        if (item.id === pageChatId) {
          item.activeClass = "chat-list__item_active";
        }
      });
      console.log(this.props.chatList);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  render() {
    const chats = document.querySelectorAll(".chat-list__item");
    return this.compile(template, { ...this.props });
  }
}
