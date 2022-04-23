import { withStore } from "../../utils/Store";
import { SmallCard } from "./smallCard";

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(SmallCard);