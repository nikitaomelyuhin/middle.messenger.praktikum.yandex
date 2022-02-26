import Block from "../utils/Block";

interface ButtonProps {
  label: string,
  events?: {
    click?: () => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    return this.props.label;
  }
}