import Block from "../../utils/Block";
import template from "./avatar.hbs";
import { Events } from "../../typings/global";

interface AvatarProps {
  text: string;
  noAvatar: boolean;
  image?: string;
  events?: Events;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}