import { SignUpData } from "../../api/AuthApi";
import ProfileController from "../../controllers/ProfileController";
import Block from "../../utils/Block";
import { isEqual } from "../../utils/helpers";
import Button from "../button/index";
import Input from "../input/index";
import template from "./profileModal.hbs";

export class ProfileModal extends Block {
  private inputs: SignUpData = { ...this.props.data };

  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    this.children.cardRowInputEmail = new Input({
      type: "text",
      placeholder: "Почта",
      stateClass: this.props.data?.email ? "app-input__textfield_valid" : "",
      value: this.props.data?.email,
      events: {
        keyup: (e) => this.checkEqual(e, "email"),
      },
    });
    this.children.cardRowInputLogin = new Input({
      type: "text",
      placeholder: "Логин",
      value: this.props.data?.login,
      events: {
        keyup: (e) => this.checkEqual(e, "login"),
      },
    });
    this.children.cardRowInputName = new Input({
      type: "text",
      placeholder: "Имя",
      value: this.props.data?.first_name,
      events: {
        keyup: (e) => this.checkEqual(e, "first_name"),
      },
    });
    this.children.cardRowInputLastName = new Input({
      type: "text",
      placeholder: "Фамилия",
      value: this.props.data?.second_name,
      events: {
        keyup: (e) => this.checkEqual(e, "second_name"),
      },
    });
    this.children.cardRowInputDisplayName = new Input({
      type: "text",
      placeholder: "Имя в чате",
      value: this.props.data?.display_name,
      events: {
        keyup: (e) => this.checkEqual(e, "display_name"),
      },
    });
    this.children.cardRowInputPhone = new Input({
      type: "text",
      placeholder: "Телефон",
      value: this.props.data?.phone,
      events: {
        keyup: (e) => this.checkEqual(e, "phone"),
      },
    });
    this.children.button = new Button({
      type: "simple",
      additionalType: "inactive",
      text: "Применить",
      events: {
        click: () => this.setNewProfile(),
      },
    });
  }

  checkEqual(e: any, field: string) {
    this.inputs[field] = e.target.value;

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

  async setNewProfile() {
    await ProfileController.changeProfile(this.inputs);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}