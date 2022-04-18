import { AddUserData, CreateChat } from "../controllers/ChatController";
import BaseAPI from "./baseApi";

export default class ChatApi extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read() {
    return this.http.get("/");
  }

  create(data: CreateChat) {
    return this.http.post("/", data);
  }

  addUser(data: AddUserData) {
    return this.http.put("/users", data);
  }

  connectSocket(id: number) {
    return this.http.post(`/token/${id}`);
  }

  update = undefined;

  delete = undefined;
}