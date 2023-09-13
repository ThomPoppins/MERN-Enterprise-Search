import { combineReducers } from "redux";
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
  userLoggedInIdReducer,
  userReducer,
} from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
  userLoggedInId: userLoggedInIdReducer,
  user: userReducer,
});

export default rootReducer;
