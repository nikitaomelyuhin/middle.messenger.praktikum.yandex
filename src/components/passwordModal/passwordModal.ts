import ProfileController from "../../controllers/ProfileController";
import Block from "../../utils/Block";
import Router from "../../utils/Router";
import store from "../../utils/Store";
import Validation from "../../utils/validate";
import { Button } from "../button/button";
import { Input } from "../input/input";
import template from "./passwordModal.hbs";

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export class PasswordModal extends Block {
  private _passwords: Passwords = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  private _validationResult: {
    oldPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  } = {
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    };

  protected initChildren() {
    this.children.oldPasswordCardRowInput = new Input({
      type: "password",
      placeholder: "Введите старый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterOldPassword(e),
        blur: () => this._updateProp("oldPassword"),
      },
    });
    this.children.newPasswordCardRowInput = new Input({
      type: "password",
      placeholder: "Введите новый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterNewPassword(e),
        blur: () => this._updateProp("newPassword"),
      },
    });
    this.children.confirmPasswordCardRowInput = new Input({
      type: "password",
      placeholder: "Подтвердите новый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterConfirmPassword(e),
        blur: () => this._updateProp("confirmPassword"),
      },
    });
    this.children.button = new Button({
      type: "simple",
      text: "Применить",
      events: {
        click: () => this.changePassword(),
      },
    });
  }

  private _updateProp(propType: keyof Passwords) {
    const prop = this._passwords[propType];
    const validateProp = new Validation();
    validateProp.validatePassword(this._passwords[propType]);

    const validationResult = validateProp.result;
    this._validationResult[propType] = validationResult.isValid;
    const stateClass = this._getStateClass(validationResult.isValid);
    this.children[`${propType}CardRowInput`].setProps({
      error: validationResult.message,
      value: prop,
      stateClass,
    });
  }

  private _getStateClass(isValid: boolean): string {
    if (!isValid) {
      return "app-input__textfield_error";
    }
    return "app-input__textfield_valid";
  }

  private enterOldPassword(e: any) {
    this._passwords.oldPassword = e.target.value;
  }

  private enterNewPassword(e: any) {
    this._passwords.newPassword = e.target.value;
    this.checkEqualPasswords();
  }

  private enterConfirmPassword(e: any) {
    this._passwords.confirmPassword = e.target.value;
    this.checkEqualPasswords();
  }

  private checkEqualPasswords() {
    if (this._passwords.newPassword !== this._passwords.confirmPassword) {
      return false;
    }
    return true;
  }

  private async changePassword() {
    if (!this.checkEqualPasswords()) {
      this.children.newPasswordCardRowInput.setProps({
        error: "Пароли не совпадают",
        stateClass: "app-input__textfield_error",
      });
      this.children.confirmPasswordCardRowInput.setProps({
        error: "Пароли не совпадают",
        stateClass: "app-input__textfield_error",
      });
    } else {
      await ProfileController.changePassword({
        oldPassword: this._passwords.oldPassword,
        newPassword: this._passwords.newPassword,
      });
      const error = store.getState().changePasswordError;
      if (error) {
        this.children.oldPasswordCardRowInput.setProps({
          error,
          stateClass: "app-input__textfield_error",
        });
      } else {
        const router = new Router("#app");
        router.go("/settings");
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}