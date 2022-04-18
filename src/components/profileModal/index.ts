import { ProfileModal } from "./profileModal";
import { withStore } from "../../utils/Store";

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(ProfileModal);