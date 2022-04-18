import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";
import { isEqual } from "./helpers";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = uuidv4();

  private _element: HTMLElement | null = null;

  private _elementForEvents: HTMLElement | null = null;

  private _meta: { props: any };

  protected props: any;

  // eslint-disable-next-line no-use-before-define
  protected children: Record<string, any>;

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this.initChildren();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => (v instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected initChildren() { }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: any, newProps: any) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    const elementForEvent = newElement.querySelector("[data-event]");
    if (elementForEvent) {
      this._elementForEvents = elementForEvent as HTMLElement;
    }

    this._removeEvents();

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this._element || null;
  }

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _removeEvents() {
    // eslint-disable-next-line prefer-destructuring
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._elementForEvents) {
        this._elementForEvents.removeEventListener(event, listener);
      } else {
        this._element!.removeEventListener(event, listener);
      }
    });
  }

  _addEvents() {
    // eslint-disable-next-line prefer-destructuring
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      if (this._elementForEvents) {
        this._elementForEvents.addEventListener(event, listener);
      } else {
        this._element!.addEventListener(event, listener);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
        return;
      }
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(context);

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);

        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);
          if (!stub) {
            return;
          }
          stub.replaceWith(ch.getContent());
        });
        return;
      }
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hide() { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  show() { }
}

export default Block;