import Block from "../../utils/Block";
import template from "./input.hbs";

interface inputProps {
  type: string
  placeholder: string
}

export class Input extends Block {
  constructor(props: inputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}