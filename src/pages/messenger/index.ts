import { MessengerPage } from "./messenger";
import { withStore } from "../../utils/Store";

const withChat = withStore((state) => ({ ...state.chat }));

export default withChat(MessengerPage);