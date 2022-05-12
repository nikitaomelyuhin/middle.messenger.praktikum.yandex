import Block from "../../utils/Block";
import template from "./signUp.hbs";
import Button from "../../components/button/index";
import Input from "../../components/input/index";
import Link from "../../components/link/index";
import ValidationError from "../../components/validationError/index";
import Validation from "../../utils/validate";
import AuthController from "../../controllers/AuthController";
import { SignUpData } from "../../api/AuthApi";
import Router from "../../utils/Router";
import store, { DefaultState, SignUpDataTypes } from "../../utils/Store";
import ChatController from "../../controllers/ChatController";

export type ValidationFields = {
  email: boolean;
  login: boolean;
  first_name: boolean;
  second_name: boolean;
  phone: boolean;
  password?: boolean;
  display_name?: boolean;
};
export class SignUpPage extends Block {
  private _formFields: SignUpData = {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    phone: "",
    password: "",
  };

  private _validationResult: ValidationFields = {
    email: false,
    login: false,
    first_name: false,
    second_name: false,
    phone: false,
    password: false,
  };

  constructor(props: DefaultState<SignUpDataTypes>) {
    super(props);
  }

  protected initChildren() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
      events: {
        click: (e) => this._formHandler(e),
      },
    });
    this.children.emailInput = new Input({
      type: "text",
      placeholder: "Почта",
      events: {
        keyup: (e) => { this._updateFields("email", e.target.value); },
        blur: () => this._updateProp("email"),
      },
    });
    this.children.loginInput = new Input({
      type: "text",
      placeholder: "Логин",
      events: {
        keyup: (e) => { this._updateFields("login", e.target.value); },
        blur: () => this._updateProp("login"),
      },
    });
    this.children.first_nameInput = new Input({
      type: "text",
      placeholder: "Имя",
      events: {
        keyup: (e) => { this._updateFields("first_name", e.target.value); },
        blur: () => this._updateProp("first_name"),
      },
    });
    this.children.second_nameInput = new Input({
      type: "text",
      placeholder: "Фамилия",
      events: {
        keyup: (e) => { this._updateFields("second_name", e.target.value); },
        blur: () => this._updateProp("second_name"),
      },
    });
    this.children.phoneInput = new Input({
      type: "text",
      placeholder: "Телефон",
      events: {
        keyup: (e) => { this._updateFields("phone", e.target.value); },
        blur: () => this._updateProp("phone"),
      },
    });
    this.children.passwordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      events: {
        keyup: (e) => { this._updateFields("password", e.target.value); },
        blur: () => this._updateProp("password"),
      },
    });
    this.children.link = new Link({
      text: "Войти",
      events: {
        click: () => {
          const router = new Router("#app");
          router.go("/");
        },
      },
    });
    this.children.validationError = new ValidationError({
      hasError: false,
    });
  }

  private _updateFields(type: keyof SignUpData, newValue: string) {
    this._formFields[type] = newValue;
  }

  private async _formHandler(e: any) {
    e.preventDefault();
    this._updateProp("email");
    this._updateProp("login");
    this._updateProp("first_name");
    this._updateProp("second_name");
    this._updateProp("phone");
    this._updateProp("password");

    let isValidationSuccess = true;

    Object.values(this._validationResult).forEach((key) => {
      if (!key) {
        isValidationSuccess = false;
      }
    });
    if (isValidationSuccess) {
      await AuthController.signUp(this._formFields);
      const signUpStore = store.getState().signUp;
      if (signUpStore?.error) {
        this.children.validationError.setProps({
          hasError: true,
          text: signUpStore.error,
        });
        return;
      }
      const router = new Router("#app");
      if (!signUpStore?.error) {
        await AuthController.fetchUser();
        await ChatController.fetchChats();
        router.go("/messenger");
      }
    }
  }

  private _updateProp(propType: keyof SignUpData) {
    const prop = this._formFields[propType];
    const validateProp = new Validation();
    if (propType === "login") {
      validateProp.validateLogin(prop);
    }
    if (propType === "password") {
      validateProp.validatePassword(prop);
    }
    if (propType === "first_name" || propType === "second_name") {
      validateProp.validateName(prop);
    }
    if (propType === "phone") {
      validateProp.validatePhone(prop);
    }
    if (propType === "email") {
      validateProp.validateEmail(prop);
    }

    const validationResult = validateProp.result;
    this._validationResult[propType] = validationResult.isValid;
    const stateClass = this._getStateClass(validationResult.isValid);
    this.children[`${propType}Input`].setProps({
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

  componentDidUpdate(oldProps: any, newProps: any) {
    this.children.mailInput.setProps(newProps);
    this.children.loginInput.setProps(newProps);
    this.children.nameInput.setProps(newProps);
    this.children.lastNameInput.setProps(newProps);
    this.children.phoneInput.setProps(newProps);
    this.children.passwordInput.setProps(newProps);

    return true;
  }

  render() {
    return this.compile(template, []);
  }
}