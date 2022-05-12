import ProfileController from "../../controllers/ProfileController";
import { ValidationFields } from "../../pages/signUp/signUp";
import Block from "../../utils/Block";
import { isEqual } from "../../utils/helpers";
import Validation from "../../utils/validate";
import Button from "../button/index";
import Input from "../input/index";
import template from "./profileModal.hbs";

export type ProfileData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
}
export class ProfileModal extends Block {
  private inputs: ProfileData = { ...this.props.data };

  private _validationResult: ValidationFields = {
    email: false,
    login: false,
    first_name: false,
    second_name: false,
    phone: false,
    display_name: false,
  };

  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.emailCardRowInput = new Input({
      type: "text",
      placeholder: "Почта",
      stateClass: this.props.data?.email ? "app-input__textfield_valid" : "",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.checkEqual(e, "email"),
        blur: () => this._updateProp("email"),
      },
    });
    this.children.loginCardRowInput = new Input({
      type: "text",
      placeholder: "Логин",
      value: this.props.data?.login,
      events: {
        keyup: (e) => this.checkEqual(e, "login"),
        blur: () => this._updateProp("login"),
      },
    });
    this.children.first_nameCardRowInput = new Input({
      type: "text",
      placeholder: "Имя",
      value: this.props.data?.first_name,
      events: {
        keyup: (e) => this.checkEqual(e, "first_name"),
        blur: () => this._updateProp("first_name"),
      },
    });
    this.children.second_nameCardRowInput = new Input({
      type: "text",
      placeholder: "Фамилия",
      value: this.props.data?.second_name,
      events: {
        keyup: (e) => this.checkEqual(e, "second_name"),
        blur: () => this._updateProp("second_name"),
      },
    });
    this.children.display_nameCardRowInput = new Input({
      type: "text",
      placeholder: "Имя в чате",
      value: this.props.data?.display_name,
      events: {
        keyup: (e) => this.checkEqual(e, "display_name"),
        blur: () => this._updateProp("display_name"),
      },
    });
    this.children.phoneCardRowInput = new Input({
      type: "text",
      placeholder: "Телефон",
      value: this.props.data?.phone,
      events: {
        keyup: (e) => this.checkEqual(e, "phone"),
        blur: () => this._updateProp("phone"),
      },
    });
    this.children.button = new Button({
      type: "simple",
      additionalType: "inactive",
      text: "Применить",
      events: {
        click: (e) => this.setNewProfile(e),
      },
    });
  }

  private _updateProp(propType: keyof ProfileData) {
    const prop = this.inputs[propType];
    const validateProp = new Validation();
    if (propType === "login") {
      validateProp.validateLogin(prop);
    }
    if (propType === "first_name" || propType === "second_name") {
      validateProp.validateName(prop);
    }
    if (propType === "display_name") {
      validateProp.validateDisplayName(prop);
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
    this.children[`${propType}CardRowInput`].setProps({
      error: validationResult.message,
      value: prop,
      stateClass,
    });
  }

  checkEqual(e: any, field: string) {
    this.inputs[field as keyof ProfileData] = e.target.value;

    if (!isEqual(this.inputs, this.props.data)) {
      this.children.button.setProps({
        additionalType: "valid",
      });
    } else {
      this.children.button.setProps({
        additionalType: "inactive",
      });
    }
  }

  private _getStateClass(isValid: boolean): string {
    if (!isValid) {
      return "app-input__textfield_error";
    }
    return "app-input__textfield_valid";
  }

  async setNewProfile(e: any) {
    e.preventDefault();
    this._updateProp("email");
    this._updateProp("login");
    this._updateProp("first_name");
    this._updateProp("second_name");
    this._updateProp("display_name");
    this._updateProp("phone");
    let isValidationSuccess = true;

    Object.values(this._validationResult).forEach((key) => {
      if (!key) {
        isValidationSuccess = false;
      }
    });
    if (isValidationSuccess) {
      await ProfileController.changeProfile(this.inputs);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}