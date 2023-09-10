import { combineReducers } from "redux";
import { booksListShowTypeReducer } from "./reducers.jsx";

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
});

export default rootReducer;
