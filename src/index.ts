import { Button } from "./components/button";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const button = new Button({
    label: "Click me",
    events: {
      click: () => console.log("click"),
    },
  });

  renderDOM("#app", button);

  setTimeout(() => {
    button.setProps({
      label: "WTF!",
    });
  }, 2000);
});