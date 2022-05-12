import Block from "../../utils/Block";
import template from "./chatName.hbs";

interface ChatNameProps {
  name: string;
  avatar: string;
}

export class ChatName extends Block {
  constructor(props: ChatNameProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}