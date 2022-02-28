import Block from "../../utils/Block";
import template from "./input.hbs";

interface inputProps {
  type: string
  placeholder: string,
  error?: string,
  stateClass?: string,
  events?: {
    keyup?: (e: any) => void,
    blur?: (e: any) => void,
    focus?: (e: any) => void;
  }
}

export class Input extends Block {
  constructor(props: inputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}