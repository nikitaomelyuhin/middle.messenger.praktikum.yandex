import Block from "../../utils/Block";
import store from "../../utils/Store";
import template from "./chatMessages.hbs";

type message = {
  chat_id?: number;
  content?: string;
  file?: null;
  id?: number;
  isSelf?: boolean;
  is_read?: boolean;
  time?: string;
  type?: string;
  user_id?: number;
  avatar?: string;
  name: string;
}

type messages = {
  messages: message[]
}

export class Messages extends Block {
  constructor(props: messages) {
    super(props);
    this.setAvatarToProps(this.props);
  }

  private setAvatarToProps(props: any) {
    if (props.messages?.[0]?.[0]) {
      const chatUsers = store.getState().chatUsers?.data[props.messages[0][0].chat_id];
      props.messages?.forEach((userMessages: message[]) => {
        chatUsers?.forEach((chatUser) => {
          if (chatUser?.id === userMessages[0].user_id) {
            userMessages.unshift({
              avatar: chatUser.avatar,
              isSelf: userMessages[0].isSelf,
              name: chatUser.display_name ? chatUser.display_name : chatUser.first_name,
            });
          }
        });
      });
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.setAvatarToProps(newProps);
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}