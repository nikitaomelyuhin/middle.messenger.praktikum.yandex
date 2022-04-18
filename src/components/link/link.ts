import Block from "../../utils/Block";
import template from "./link.hbs";
import { Events } from "../../typings/global";

interface LinkProps {
  text: string,
  events: Events
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}