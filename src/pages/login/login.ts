import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/button/index";
import Input from "../../components/input/index";
import Link from "../../components/link/index";
import Validation from "../../utils/validate";
import AuthController from "../../controllers/AuthController";
import { SignInData } from "../../api/AuthApi";
import Router from "../../utils/Router";

type ValidationFields = {
  login: boolean;
  password: boolean;
}

export class LoginPage extends Block {
  private _formFields: SignInData = {
    login: "",
    password: "",
  };

  private _validationResult: ValidationFields = {
    login: false,
    password: false,
  };

  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.button = new Button({
      text: "Войти",
      events: {
        click: (e) => this._formHandler(e),
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
    this.children.passwordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      events: {
        keyup: (e) => { this._updateFields("password", e.target.value); },
        blur: () => this._updateProp("password"),
      },
    });
    this.children.link = new Link({
      text: "Нет аккаунта?",
      events: {
        click: () => {
          Router.go("/sign-up");
        },
      },
    });
  }

  private _updateFields(type: keyof SignInData, newValue: string) {
    this._formFields[type] = newValue;
  }

  private async _formHandler(e: any) {
    e.preventDefault();
    this._updateProp("login");
    this._updateProp("password");

    let isValidationSuccess = true;

    Object.values(this._validationResult).forEach((key) => {
      if (!key) {
        isValidationSuccess = false;
      }
    });
    if (isValidationSuccess) {
      await AuthController.signIn(this._formFields);
    }
  }

  private _updateProp(propType: keyof SignInData) {
    const prop = this._formFields[propType];
    const validateProp = new Validation();
    if (propType === "login") {
      validateProp.validateLogin(prop);
    }
    if (propType === "password") {
      validateProp.validatePassword(prop);
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
    this.children.loginInput.setProps(newProps);
    this.children.passwordInput.setProps(newProps);

    return true;
  }

  render() {
    return this.compile(template, []);
  }
}