import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/button/index";
import Input from "../../components/input/index";
import Validation from "../../utils/validate";

interface FormFields {
  [key: string]: string
}

type Field = {
  error: boolean,
  errorMessage: string,
  value: string,
  type: string
}
export class LoginPage extends Block {
  private _formFields: FormFields = {
    login: "",
    password: "",
  };

  private _form = new Validation(this._formFields);

  constructor() {
    super();
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
        keyup: (e) => { this._form.updateFields("login", e.target.value); },
        blur: () => this._updateProp("login"),
      },
    });
    this.children.passwordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      events: {
        keyup: (e) => { this._form.updateFields("password", e.target.value); },
        blur: () => this._updateProp("password"),
      },
    });
  }

  private _formHandler(e: any) {
    e.preventDefault();
    this._updateProp("login");
    this._updateProp("password");

    for (let i = 0; i < this._form.getForm.length; i++) {
      const field = this._form.getForm[i];
      if (field.error) {
        Object.keys(this._formFields).forEach((key) => {
          this._formFields[key] = "";
        });
        break;
      }
      this._formFields[field.type] = field.value;
    }
    const promise = new Promise((resolve: any, reject: any) => {
      Object.values(this._formFields).forEach((value) => {
        if (!value) {
          reject(new Error("Validation failed"));
        }
      });
      resolve(this._formFields);
    });

    promise.then((res) => {
      console.log(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  private _updateProp(propType: string) {
    const prop = this._form.form.find((el) => el.type === propType);
    if (prop) {
      const stateClass = this._getStateClass(prop);
      this.children[`${propType}Input`].setProps({
        error: prop.errorMessage,
        stateClass,
      });
      this.children[`${propType}Input`].element!.querySelector("input")!.value = prop.value;
    }
  }

  private _getStateClass(field: Field): string {
    if (field.error && !field.value) {
      return "app-input__textfield_error app-input__textfield_empty";
    } if (field.error) {
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