import Block from "../../utils/Block";
import template from "./text.hbs";

type TextProps = {
  textField: string | undefined
}

export class Text extends Block {
  constructor(props: TextProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}