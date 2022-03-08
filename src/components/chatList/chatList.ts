import Block from "../../utils/Block";
import template from "./chatList.hbs";

interface chatItem {
  activeClass?: string,
  image?: string,
  chatName: string,
  sender?: string,
  message: string,
  time: string,
  notificationCount?: number
}

interface sidebarList {
  chatList: chatItem[]
}

export class SidebarList extends Block {
  constructor(props: sidebarList) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}