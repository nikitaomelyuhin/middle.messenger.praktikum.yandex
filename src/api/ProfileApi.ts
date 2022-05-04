import { passwordsData } from "../controllers/ProfileController";
import { SignUpData } from "./AuthApi";
import BaseAPI from "./BaseApi";

export default class ProfileApi extends BaseAPI {
  constructor() {
    super("/user");
  }

  update(data: SignUpData) {
    return this.http.put("/profile", data);
  }

  changePassword(data: passwordsData) {
    return this.http.put("/password", data);
  }

  changeAvatar(data: FormData) {
    return this.http.put("/profile/avatar", data);
  }

  create = undefined;

  read = undefined;

  delete = undefined;
}