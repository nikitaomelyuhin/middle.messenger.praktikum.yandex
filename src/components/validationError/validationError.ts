import Block from "../../utils/Block";
import template from "./validationError.hbs";

interface ValidationErrorProps {
  text?: string;
  hasError: boolean;
}

export class ValidationError extends Block {
  constructor(props: ValidationErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}