import Block from "../../utils/Block";
import template from "./text.hbs";

interface text {
  text: string
}

export class Text extends Block {
  constructor(props: text) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}