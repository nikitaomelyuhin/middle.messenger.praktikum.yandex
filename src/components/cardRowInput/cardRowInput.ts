import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import template from "./cardRowInput.hbs";

interface inputProps {
  value: string,
  error?: string,
  events?: Events
}

export class CardRowInput extends Block {
  constructor(props: inputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}