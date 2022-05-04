import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import template from "./smallCardContent.hbs";

interface SmallCardProps {
  events?: Events;
  image: string;
  name: string;
  id: number;
}

export class SmallCardContent extends Block {
  constructor(props: SmallCardProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}