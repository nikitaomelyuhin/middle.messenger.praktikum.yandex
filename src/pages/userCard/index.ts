import { UserCard } from "./userCard";
import { withStore } from "../../utils/Store";

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(UserCard);