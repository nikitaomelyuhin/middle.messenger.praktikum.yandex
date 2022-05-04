import { AddUserData, CreateChat } from "../controllers/ChatController";
import BaseAPI from "./BaseApi";

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

  connectSocket(id: number): Promise<any> {
    return this.http.post(`/token/${id}`);
  }

  getChatUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  update = undefined;

  delete = undefined;
}