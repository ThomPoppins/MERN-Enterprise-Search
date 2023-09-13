import { combineReducers } from "redux";
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
  userLoggedInIdReducer,
} from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
  userLoggedInId: userLoggedInIdReducer,
});

export default rootReducer;
