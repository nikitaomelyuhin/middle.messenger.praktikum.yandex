// eslint-disable-next-line max-classes-per-file
import Route from "./Route";
import Block from "./Block";

class Router {
  public routes: Route[] = [];

  public history: History;

  private _currentRoute: Route | null = null;

  private _rootQuery: string;

  static __instance: any;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: any) => {
      if (event && event.currentTarget && event.currentTarget) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }

  get currentRoute() {
    return this._currentRoute;
  }
}

export default Router;

export interface WithRouterProps {
  router: Router
}

export function withRouter(Component: typeof Block) {
  return class WithRouter extends Component {
    public static ComponentName = Component.name;

    constructor(props: any) {
      super({ ...props, router: new Router("#app") });
    }
  };
}