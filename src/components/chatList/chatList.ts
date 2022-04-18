import Block from "../../utils/Block";
import { SidebarListData } from "../../utils/Store";
import template from "./chatList.hbs";

export class SidebarList extends Block {
  constructor(props: SidebarListData) {
    super(props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}