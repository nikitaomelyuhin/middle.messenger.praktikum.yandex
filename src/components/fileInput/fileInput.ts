import { Events } from "../../typings/global";
import Block from "../../utils/Block";
import template from "./fileInput.hbs";

interface inputProps {
  text: string;
  events?: Events
}

export class FileInput extends Block {
  constructor(props: inputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}