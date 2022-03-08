import Block from "../../utils/Block";
import template from "./cardRow.hbs";

interface CardRowProps {
  title: string,
  value: string
}

export class CardRow extends Block {
  constructor(props: CardRowProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}