import { SignUpData } from "../api/AuthApi";
import ProfileApi from "../api/ProfileApi";
import Router from "../utils/Router";
import AuthController from "./AuthController";

export interface passwordsData {
  oldPassword: string,
  newPassword: string
}

class ProfileController {
  private api: ProfileApi;

  constructor() {
    this.api = new ProfileApi();
  }

  async changeProfile(data: SignUpData) {
    try {
      await this.api.update(data);
      AuthController.fetchUser();
    } catch (err) {
      throw new Error(err);
    }
  }

  async changePassword(data: passwordsData) {
    try {
      await this.api.changePassword(data);
      Router.go("/user-card");
    } catch (err) {
      console.error(err);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
      Router.go("/user-card");
      AuthController.fetchUser();
    } catch (err) {
      console.error(err);
    }
  }
}

export default new ProfileController();