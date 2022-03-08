import Block from "../../utils/Block";
import template from "./userCard.hbs";
import Button from "../../components/button/index";
import CardRow from "../../components/cardRow/index";

export class UserCard extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.cardRowMail = new CardRow({
      title: "Почта",
      value: "smdgy@yandex.ru",
    });
    this.children.cardRowLogin = new CardRow({
      title: "Логин",
      value: "nikitaomelyuhin",
    });
    this.children.cardRowName = new CardRow({
      title: "Имя",
      value: "Никита",
    });
    this.children.cardRowLastName = new CardRow({
      title: "Фамилия",
      value: "Омелюхин",
    });
    this.children.cardRowChatName = new CardRow({
      title: "Имя в чате",
      value: "Никита",
    });
    this.children.cardRowPhone = new CardRow({
      title: "Телефон",
      value: "8 (800) 555-35-35",
    });
    this.children.buttonChange = new Button({
      text: "Изменить данные",
      type: "simple",
    });
    this.children.buttonPassword = new Button({
      text: "Изменить пароль",
      type: "simple",
    });
    this.children.buttonLogout = new Button({
      text: "Выйти",
      type: "simple",
      additionalType: "danger",
      link: "../../index.html",
    });
  }

  render() {
    return this.compile(template, []);
  }
}