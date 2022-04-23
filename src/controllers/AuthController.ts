import AuthApi, { SignInData, SignUpData } from "../api/AuthApi";
import Router from "../utils/Router";
import store from "../utils/Store";

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signUp(data: SignUpData, error?: string) {
    if (error) {
      store.set("signUp.error.message", error);
      return;
    }
    try {
      store.set("signUp.error", null);
      store.set("signUp.loading", true);
      const response = this.api.signUp(data);
      store.set("signUp.data", response);
      store.set("signUp.loading", false);
    } catch (err) {
      store.set("signUp.loading", false);
      store.set("signUp.error", err.reason);
    }
  }

  async signIn(data: SignInData, error?: string) {
    if (error) {
      store.set("signIn.error.message", error);
    }
    try {
      store.set("signIn.error", null);
      store.set("signIn.loading", true);
      await this.api.signIn(data);
      store.set("signIn.error", null);
      this.fetchUser();
      store.set("signIn.loading", false);
    } catch (err) {
      store.set("signIn.loading", false);
      store.set("signIn.error", err.reason);
    }
  }

  async logout() {
    try {
      store.set("currentUser.loading", true);
      await this.api.logout();
      store.set("currentUser.loading", false);
      Router.go("/");
    } catch (err) {
      store.set("currentUser.error", err);
    }
  }

  async fetchUser() {
    try {
      store.set("currentUser.loading", true);
      const user = await this.api.fetchUser();
      store.set("currentUser.error", "");
      store.set("currentUser.data", user);
      store.set("currentUser.loading", false);
      if (window.location.pathname === "/") {
        Router.go("/messenger");
      } else {
        Router.go(window.location.pathname);
      }
    } catch (err) {
      Router.go("/");
      store.set("currentUser.loading", false);
      store.set("currentUser.error", err.reason);
    }
  }
}

export default new AuthController();