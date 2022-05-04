import Block from "../../utils/Block";
import template from "./backButton.hbs";
import { Events } from "../../typings/global";

interface backButtonProps {
  events: Events
}

export class BackButton extends Block {
  constructor(props: backButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}