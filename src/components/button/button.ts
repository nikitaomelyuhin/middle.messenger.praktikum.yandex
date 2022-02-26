import Block from "../../utils/Block";
import template from "./button.hbs";

interface ButtonProps {
  type?: string,
  text: string,
  link?: string,
  additionalType?: string,
  events?: {
    click?: () => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}