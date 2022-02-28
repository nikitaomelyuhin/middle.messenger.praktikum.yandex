import Block from "../../utils/Block";
import template from "./sidebarItem.hbs";

interface SidebarItemProps {
  activeClass?: string,
  image?: string,
  chatName: string,
  sender?: string,
  message: string,
  time: string,
  notificationCount?: number
}

export class SidebarItem extends Block {
  constructor(props: SidebarItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}