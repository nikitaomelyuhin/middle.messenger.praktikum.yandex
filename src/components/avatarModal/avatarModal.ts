import ProfileController from "../../controllers/ProfileController";
import Block from "../../utils/Block";
import { Button } from "../button/button";
import { Input } from "../input/input";
import template from "./avatarModal.hbs";

export class AvatarModal extends Block {
  constructor() {
    super();
    // if (this.element) {
    //   const avatarForm: HTMLFormElement | null = this.element.querySelector(".modal-content__form");
    //   avatarForm?.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     const form = new FormData(avatarForm);
    //     ProfileController.changeAvatar(form);
    //   });
    // form.append("avatar", avatar?.files[0], "my-file-name.png");
    // }
  }

  protected initChildren() {
    this.children.button = new Button({
      text: "Применить",
      events: {
        click: (e) => this.saveAvatar(e),
      },
    });
  }

  private saveAvatar(e: any) {
    e.preventDefault();
    const avatarForm: HTMLFormElement | null = document.querySelector(".modal-content__form");
    if (avatarForm) {
      const form = new FormData(avatarForm);
      ProfileController.changeAvatar(form);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}