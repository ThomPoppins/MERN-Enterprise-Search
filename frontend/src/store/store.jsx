import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

// const store = configureStore(showTypeReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});

export default store;
