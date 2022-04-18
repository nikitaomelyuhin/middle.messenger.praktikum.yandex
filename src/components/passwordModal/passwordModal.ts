import ProfileController from "../../controllers/ProfileController";
import Block from "../../utils/Block";
import { Button } from "../button/button";
import { Input } from "../input/input";
import template from "./passwordModal.hbs";

export class PasswordModal extends Block {
  private oldPassword = "";

  private newPassword = "";

  private confirmPassword = "";

  constructor() {
    super();
  }

  protected initChildren() {
    this.children.cardRowInputOldPassword = new Input({
      type: "password",
      placeholder: "Введите старый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterOldPassword(e),
      },
    });
    this.children.cardRowInputNewPassword = new Input({
      type: "password",
      placeholder: "Введите новый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterNewPassword(e),
      },
    });
    this.children.cardRowInputConfirmPassword = new Input({
      type: "password",
      placeholder: "Подтвердите новый пароль",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.enterConfirmPassword(e),
      },
    });
    this.children.button = new Button({
      type: "simple",
      additionalType: "inactive",
      text: "Применить",
      events: {
        click: () => this.changePassword(),
      },
    });
  }

  private enterOldPassword(e: any) {
    this.oldPassword = e.target.value;
  }

  private enterNewPassword(e: any) {
    this.newPassword = e.target.value;
    this.checkEqualPasswords();
  }

  private enterConfirmPassword(e: any) {
    this.confirmPassword = e.target.value;
    this.checkEqualPasswords();
  }

  private checkEqualPasswords() {
    const isEqualPasswords = this.newPassword === this.confirmPassword && this.newPassword && this.confirmPassword;
    if (isEqualPasswords) {
      this.children.button.setProps({
        additionalType: "valid",
      });
    } else {
      this.children.button.setProps({
        additionalType: "inactive",
      });
    }
  }

  private changePassword() {
    ProfileController.changePassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}