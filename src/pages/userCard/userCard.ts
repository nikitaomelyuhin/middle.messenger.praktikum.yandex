import Block from "../../utils/Block";
import template from "./userCard.hbs";
import Button from "../../components/button/index";
import CardRow from "../../components/cardRow/index";
import AuthController from "../../controllers/AuthController";
import BackButton from "../../components/backButton/index";
import Router from "../../utils/Router";
import Text from "../../components/text/index";
import Avatar from "../../components/avatar/index";
import ProfileModal from "../../components/profileModal/index";
import PasswordModal from "../../components/passwordModal/index";
import AvatarModal from "../../components/avatarModal/index";
import { isEqual } from "../../utils/helpers";

export class UserCard extends Block {
  private profileModal: HTMLElement | null = null;

  private passwordModal: HTMLElement | null = null;

  private avatarModal: HTMLElement | null = null;

  constructor(props: any) {
    super(props);
    if (this.element) {
      this.profileModal = this.element.querySelector(".profile-modal");
      this.passwordModal = this.element.querySelector(".password-modal");
      this.avatarModal = this.element.querySelector(".avatar-modal");
    }
    this.profileModal?.addEventListener("click", (e) => this.closeModal(e));
    this.passwordModal?.addEventListener("click", (e) => this.closeModal(e));
    this.avatarModal?.addEventListener("click", (e) => this.closeModal(e));
  }

  protected initChildren() {
    this.children.profileModal = new ProfileModal(this.props);
    this.children.passwordModal = new PasswordModal();
    this.children.avatarModal = new AvatarModal();
    this.children.backButton = new BackButton({
      events: {
        click: () => Router.go("/chat"),
      },
    });
    this.children.title = new Text({
      text: this.props.data?.first_name,
    });
    this.children.avatar = new Avatar({
      text: "Поменять аватар",
      noAvatar: !this.props.data?.avatar,
      image: this.props.data?.avatar,
      events: {
        click: () => this.showModal(".avatar-modal"),
      },
    });
    this.children.cardRowMail = new CardRow({
      title: "Почта",
      value: this.props.data?.email,
    });
    this.children.cardRowLogin = new CardRow({
      title: "Логин",
      value: this.props.data?.login,
    });
    this.children.cardRowName = new CardRow({
      title: "Имя",
      value: this.props.data?.first_name,
    });
    this.children.cardRowLastName = new CardRow({
      title: "Фамилия",
      value: this.props.data?.second_name,
    });
    this.children.cardRowChatName = new CardRow({
      title: "Имя в чате",
      value: this.props.data?.display_name,
    });
    this.children.cardRowPhone = new CardRow({
      title: "Телефон",
      value: this.props.data?.phone,
    });
    this.children.buttonChange = new Button({
      text: "Изменить данные",
      type: "simple",
      events: {
        click: () => this.showModal(".profile-modal"),
      },
    });
    this.children.buttonPassword = new Button({
      text: "Изменить пароль",
      type: "simple",
      events: {
        click: () => this.showModal(".password-modal"),
      },
    });
    this.children.buttonLogout = new Button({
      text: "Выйти",
      type: "simple",
      additionalType: "danger",
      events: {
        click: () => this.onLogout(),
      },
    });
  }

  showModal(selector: string): void {
    const modal = document.querySelector(selector);
    modal?.classList.add("modal_active");
  }

  closeModal(e: any): void {
    if (e.target.classList.contains("modal__backdrop")) {
      e.currentTarget.classList.remove("modal_active");
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.profileModal.setProps(newProps);
      this.children.title.setProps({
        text: newProps.data?.first_name,
      });
      this.children.cardRowMail.setProps({
        value: newProps.data?.email,
      });
      this.children.cardRowLogin.setProps({
        value: newProps.data?.login,
      });
      this.children.cardRowName.setProps({
        value: newProps.data?.first_name,
      });
      this.children.cardRowLastName.setProps({
        value: newProps.data?.second_name,
      });
      this.children.cardRowChatName.setProps({
        value: newProps.data?.display_name,
      });
      this.children.cardRowPhone.setProps({
        value: newProps.data?.phone,
      });
      return true;
    }
    return false;
  }

  async onLogout() {
    await AuthController.logout();
  }

  render() {
    return this.compile(template, []);
  }
}