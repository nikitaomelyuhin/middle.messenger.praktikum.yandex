import ProfileApi from "../api/ProfileApi";
import { ProfileData } from "../components/profileModal/profileModal";
import Router from "../utils/Router";
import store from "../utils/Store";
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

  async changeProfile(data: ProfileData) {
    try {
      await this.api.update(data);
      AuthController.fetchUser();
      ChatController.fetchChats();
    } catch (err) {
      throw new Error(err);
    }
  }

  async changePassword(data: passwordsData) {
    try {
      await this.api.changePassword(data);
      store.set("changePasswordError", null);
    } catch (err) {
      store.set("changePasswordError", "Старый пароль неверен");
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