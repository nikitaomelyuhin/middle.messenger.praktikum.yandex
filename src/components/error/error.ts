import Block from "../../utils/Block";
import template from "./error.hbs";

interface ErrorProps {
  error: null | string
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}