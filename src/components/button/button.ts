import Block from "../../utils/Block";
import template from "./button.hbs";
import { Events } from "../../typings/global";

interface ButtonProps {
  type?: string;
  text?: string;
  isIconed?: boolean;
  iconClass?: string;
  additionalType?: string;
  events?: Events
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}