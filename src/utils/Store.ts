/* eslint-disable arrow-body-style */
import { isEqual, set } from "./helpers";
import EventBus from "./EventBus";
import Block from "./Block";
import { Events } from "../typings/global";

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  Updated = "updated"
}

export type SignUpDataTypes = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
} | Record<string, unknown>

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export type LastMessage = {
  user: User;
}

export type SidebarItem = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: LastMessage | null;
  time: string;
  content: string;
  events: Events;
  activeClass: null | string;
}
export type LastMessagesItem = {
  chat_id: number;
  content: string;
  file: string | null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export type ChatUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

export type ChatUsersObject = {
  [key: string]: ChatUser[];
}

export type DefaultState<T> = {
  data: T;
  loading: boolean;
  error: unknown;
}

type StoreData = {
  currentUser?: DefaultState<User>
  signIn?: DefaultState<number>
  signUp?: DefaultState<SignUpDataTypes>
  chat?: {
    sidebarData?: SidebarItem[]
    lastMessages?: any
  }
  chatUsers?: DefaultState<ChatUsersObject>
}

class Store extends EventBus {
  private state: StoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: Record<string, unknown>;

  return class extends Component {
    constructor(props: any) {
      state = mapStateToProps(store.getState());
      super({ ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        this.setProps({
          ...newState,
        });
      });
    }
  };
};

export default store;