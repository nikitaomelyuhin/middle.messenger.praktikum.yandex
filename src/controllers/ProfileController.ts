import { SignUpData } from "../api/AuthApi";
import ProfileApi from "../api/ProfileApi";
import Router from "../utils/Router";
import AuthController from "./AuthController";
import ChatController from "./ChatController";

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
    const router = new Router("#app");
    try {
      await this.api.changePassword(data);
      router.go("/settings");
    } catch (err) {
      throw new Error(err);
    }
  }

  async changeAvatar(data: FormData) {
    const router = new Router("#app");
    try {
      await this.api.changeAvatar(data);
      router.go("/settings");
      await AuthController.fetchUser();
      await ChatController.fetchChats();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ProfileController();