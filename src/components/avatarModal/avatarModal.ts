import ProfileController from "../../controllers/ProfileController";
import Block from "../../utils/Block";
import { Button } from "../button/button";
import template from "./avatarModal.hbs";
import FileInput from "../fileInput/index";

export class AvatarModal extends Block {
  private _choosenFile = null;

  protected initChildren() {
    this.children.button = new Button({
      text: "Применить",
      events: {
        click: (e) => this.saveAvatar(e),
      },
    });
    this.children.fileInput = new FileInput({
      text: "Выберите файл на компьютере",
      events: {
        change: (e) => this._loadingImage(e),
      },
    });
  }

  private _loadingImage(e: any) {
    const fileName = e.target.files[0].name;
    const file = e.target.files[0];
    this._choosenFile = file;
    this.children.fileInput.setProps({
      text: `Выбранный файл: ${fileName}`,
    });
  }

  private saveAvatar(e: any) {
    e.preventDefault();
    if (this._choosenFile) {
      const form = new FormData();
      form.append("avatar", this._choosenFile);

      ProfileController.changeAvatar(form);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}