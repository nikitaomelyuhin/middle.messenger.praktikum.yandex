import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/button/index";
import Input from "../../components/input/index";

export class LoginPage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.button = new Button({
      text: "Войти",
      link: "/chat.html",
    });
    this.children.inputLogin = new Input({
      type: "text",
      placeholder: "Логин",
    });
    this.children.inputPassword = new Input({
      type: "password",
      placeholder: "Пароль",
    });
  }

  render() {
    return this.compile(template, []);
  }
}