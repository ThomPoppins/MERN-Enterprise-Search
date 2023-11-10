import { combineReducers } from "redux";
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
  userIdReducer,
  userReducer,
  pendingRecievedInvitesReducer,
} from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
  userId: userIdReducer,
  user: userReducer,
  pendingRecievedInvites: pendingRecievedInvitesReducer,
});

export default rootReducer;
