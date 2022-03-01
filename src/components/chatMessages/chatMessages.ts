import Block from "../../utils/Block";
import template from "./chatMessages.hbs";

interface message {
  type: string,
  content: string,
  time: string,
  check?: boolean,
  delivered?: boolean
}

interface messagePerson {
  messageBlock: message[]
}

interface messages {
  messages: messagePerson[]
}

export class Messages extends Block {
  constructor(props: messages) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}