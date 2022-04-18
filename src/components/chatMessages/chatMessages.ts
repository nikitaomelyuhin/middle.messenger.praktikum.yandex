import Block from "../../utils/Block";
import template from "./chatMessages.hbs";

interface message {
  chat_id: number
  content: string
  file: null
  id: number
  isSelf: boolean
  is_read: boolean
  time: string
  type: string
  user_id: number
}

interface messages {
  messages: message[]
}

export class Messages extends Block {
  constructor(props: messages) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}