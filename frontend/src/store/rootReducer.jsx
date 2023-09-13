import { combineReducers } from "redux";
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
  userIdReducer,
  userReducer,
} from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
  userId: userIdReducer,
  user: userReducer,
});

export default rootReducer;
