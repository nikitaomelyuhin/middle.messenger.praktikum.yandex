import { Settings } from "./settings";
import { withStore } from "../../utils/Store";

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(Settings);