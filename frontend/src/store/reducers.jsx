import { BOOKS_LIST_SHOW_TYPE, COMPANIES_LIST_SHOW_TYPE } from "./actions.jsx";

const booksListShowTypeReducer = (state = "table", action) => {
  switch (action.type) {
    case BOOKS_LIST_SHOW_TYPE:
      // return a new state object
      // the new state object is a copy of the old state object
      // with the showType property updated
      return action.payload;
    default:
      return state;
  }
};

const companiesListShowTypeReducer = (state = "table", action) => {
  switch (action.type) {
    case COMPANIES_LIST_SHOW_TYPE:
      // return a new state object
      // the new state object is a copy of the old state object
      // with the showType property updated
      return action.payload;
    default:
      return state;
  }
};

// Add additional reducers here to the object
// Don't forget to import them at the top of the rootReducer.jsx file
// and add them to the combineReducers() function
export { booksListShowTypeReducer, companiesListShowTypeReducer };
