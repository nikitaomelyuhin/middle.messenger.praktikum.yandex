import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import template from "./input.hbs";

interface inputProps {
  type: string;
  placeholder: string;
  value?: string;
  error?: string;
  stateClass?: string;
  events?: Events;
}

export class Input extends Block {
  constructor(props: inputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}