import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import { SmallCardContent } from "../smallCardContent/smallCardContent";
import template from "./smallCard.hbs";

interface SmallCardProps {
  events?: Events
}

export class SmallCard extends Block {
  constructor(props: SmallCardProps) {
    super(props);
  }

  protected initChildren(): void {
    this.children.smallCardContent = new SmallCardContent({
      image: this.props?.data?.avatar,
      name: this.props?.data?.display_name || this.props?.data?.first_name,
      id: this.props?.data?.id,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.smallCardContent.setProps({
      image: newProps?.data?.avatar,
      name: newProps?.data?.display_name || newProps?.data?.first_name,
      id: newProps?.data?.id,
    });
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}