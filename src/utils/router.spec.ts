import { expect } from "chai";
import { JSDOM } from "jsdom";
import Router from "./Router";
import Route from "./Route";

class TestRouteComponent {
  render() {
    // comment to prevent ts warning
  }

  dispatchComponentDidMount() {
    // comment to prevent ts warning
  }

  getContent() {
    // comment to prevent ts warning
  }

  hide() {
    // comment to prevent ts warning
  }
}
class TestRouteComponent2 {
  render() {
    // comment to prevent ts warning
  }

  dispatchComponentDidMount() {
    // comment to prevent ts warning
  }

  getContent() {
    // comment to prevent ts warning
  }

  hide() {
    // comment to prevent ts warning
  }
}

describe("Router", () => {
  function initRouter() {
    const root = window.document.createElement("div");
    root.setAttribute("id", "app");
    document.body.appendChild(root);
    const router = new Router("#app");
    return router;
  }
  beforeEach(function regDom() {
    this.jsdom = new JSDOM(undefined, { url: "http://localhost:1234" });
    global.window = this.jsdom.window;
    global.document = this.jsdom.window.document;
    const router = initRouter();
    router
      .use("/test", TestRouteComponent)
      .use("/test2", TestRouteComponent2)
      .start();
  });
  it("should correct register routes", () => {
    const router = initRouter();
    expect(router.routes.length).to.eq(2);
    expect(router.routes[0]).to.be.an.instanceof(Route);
    expect(router.routes[1].pathname).to.eq("/test2");
    expect(router.routes.length).to.eq(2);
  });
  it("Should return correct history length", () => {
    const router = initRouter();
    router.go("/test");
    router.go("/test2");
    expect(router.history.length).to.eq(3);
  });
  it("Should return correct pathname", () => {
    const router = initRouter();
    router.go("/test2");
    router.go("/test");
    const pathname = router.currentRoute?.pathname;
    expect(pathname).to.eq("/test");
  });
});