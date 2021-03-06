import { renderDOM } from "./renderDOM";

import Block from "./Block";

class Route {
  public _pathname: string;

  private _blockClass: any;

  private _block: Block | null;

  private _props: any;

  constructor(pathname: string, view: unknown, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  get pathname() {
    return this._pathname;
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    if (this._block) {
      renderDOM(this._props.rootQuery, this._block);
    }
  }
}

export default Route;