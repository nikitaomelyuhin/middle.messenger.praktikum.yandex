import Block from "../../utils/Block";
import template from "./register.hbs";
import Button from "../../components/button/index";
import Input from "../../components/input/index";

export class RegisterPage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
    });
    this.children.inputMail = new Input({
      type: "text",
      placeholder: "Почта",
    });
    this.children.inputLogin = new Input({
      type: "text",
      placeholder: "Логин",
    });
    this.children.inputName = new Input({
      type: "text",
      placeholder: "Имя",
    });
    this.children.inputLastName = new Input({
      type: "text",
      placeholder: "Фамилия",
    });
    this.children.inputPhone = new Input({
      type: "number",
      placeholder: "Телефон",
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