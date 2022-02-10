import chatComponent from "./chat.hbs"
const home = document.querySelector("#home")
home.innerHTML = chatComponent

const chat = document.querySelector(".chat__body")
if (chat) {
  chat.scrollTop = chat.scrollHeight;
}