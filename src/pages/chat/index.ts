import { ChatPage } from "./chat";
import { withStore } from "../../utils/Store";

const withChat = withStore((state) => ({ ...state.chat }));

export default withChat(ChatPage);