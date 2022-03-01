import Block from "../../utils/Block";
import template from "./chat.hbs";
import SidebarList from "../../components/chatList/index";
import Messages from "../../components/chatMessages/index";

export class ChatPage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.chatList = new SidebarList({
      chatList: [
        {
          chatName: "Виталий",
          message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
          time: "Ср",
          notificationCount: 3,
        },
        {
          chatName: "Алексей",
          sender: "Вы",
          message: "Lorem, ipsum dolor",
          time: "10:49",
        },
        {
          chatName: "Бани Эстонии",
          message: "Lorem, ipsum dolor iusto cumque facere officiis",
          time: "20:45",
          notificationCount: 129,
        },
        {
          chatName: "Олеся",
          sender: "Вы",
          message: "Lorem, ipsum dolor",
          time: "13:15",
          activeClass: "sidebar-item_active",
        },
        {
          chatName: "Алексей",
          sender: "Вы",
          message: "Lorem, ipsum dolor",
          time: "10:49",
        },
        {
          chatName: "Алексей",
          sender: "Вы",
          message: "Lorem, ipsum dolor",
          time: "10:49",
        },
      ],
    });
    this.children.messages = new Messages({
      messages: [
        {
          messageBlock: [
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
              time: "12:45",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta",
              time: "12:46",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
              time: "12:47",
            },
            {
              type: "text",
              content: "Lorem, ipsum ",
              time: "12:47",
            },
          ],
        },
        {
          messageBlock: [
            {
              type: "text",
              content: "Lorem, ipsum dolor ipsum dolor ipsum dolor",
              time: "12:48",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor ipsum dolor ipsum dolor. Lorem, ipsum dolor ipsum dolor ipsum dolor",
              time: "12:48",
            },
          ],
        },
        {
          messageBlock: [
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
              time: "12:55",
            },
            {
              type: "text",
              content: "Lorem",
              time: "13:00",
            },
            {
              type: "text",
              content: "Lorem, ipsum",
              time: "13:00",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta",
              time: "13:22",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae",
              time: "13:25",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta",
              time: "13:34",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor",
              time: "13:34",
            },
            {
              type: "text",
              content: "Lorem, ipsum",
              time: "13:34",
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae soluta in commodi, totam laudantium, quas eaque aut impedit, doloribus nisi repellendus iusto cumque facere officiis voluptate temporibus illum expedita!",
              time: "13:35",
            },
            {
              type: "text",
              content: "Lorem, ipsum",
              time: "14:46",
            },
          ],
        },
        {
          messageBlock: [
            {
              type: "text",
              content: "Lorem, ipsum dolor ipsum dolor ipsum dolor",
              time: "13:15",
              check: true,
              delivered: true,
            },
            {
              type: "text",
              content: "Lorem, ipsum dolor",
              time: "13:15",
              check: true,
            },
          ],
        },
      ],
    });
  }

  render() {
    return this.compile(template, []);
  }
}