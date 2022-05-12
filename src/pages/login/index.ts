import { LoginPage } from "./login";
import { withStore } from "../../utils/Store";

const withUser = withStore((state) => ({ ...state.signIn }));

export default withUser(LoginPage);