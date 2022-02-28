import Block from "../../utils/Block";
import template from "./chat.hbs";
import SidebarItem from "../../components/sidebarItem/index";

// import Button from "../../components/button/index";
// import Input from "../../components/input/index";

export class ChatPage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.sidebarItemFirst = new SidebarItem({
      chatName: "Виталий",
      message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
      time: "Ср",
      notificationCount: 3,
    });
    this.children.sidebarItemSecond = new SidebarItem({
      chatName: "Алексей",
      sender: "Вы",
      message: "Lorem, ipsum dolor",
      time: "10:49",
    });
    this.children.sidebarItemThird = new SidebarItem({
      chatName: "Бани Эстонии",
      message: "Lorem, ipsum dolor iusto cumque facere officiis",
      time: "20:45",
      notificationCount: 129,
    });
    this.children.sidebarItemFourth = new SidebarItem({
      chatName: "Олеся",
      sender: "Вы",
      message: "Lorem, ipsum dolor",
      time: "13:15",
      activeClass: "sidebar-item_active",
    });
    this.children.sidebarItemFifth = new SidebarItem({
      chatName: "Алексей",
      sender: "Вы",
      message: "Lorem, ipsum dolor",
      time: "10:49",
    });
    this.children.sidebarItemSixth = new SidebarItem({
      chatName: "Алексей",
      sender: "Вы",
      message: "Lorem, ipsum dolor",
      time: "10:49",
    });
    // this.children.button = new Button({
    //   text: "Войти",
    //   link: "/chat.html",
    // });
    // this.children.inputLogin = new Input({
    //   type: "text",
    //   placeholder: "Логин",
    // });
    // this.children.inputPassword = new Input({
    //   type: "password",
    //   placeholder: "Пароль",
    // });
  }

  render() {
    return this.compile(template, []);
  }
}