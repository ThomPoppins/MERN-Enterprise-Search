import { combineReducers } from "redux";
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
} from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
});

export default rootReducer;
