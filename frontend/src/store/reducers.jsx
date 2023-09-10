const booksListShowTypeReducer = (state = "table", action) => {
  switch (action.type) {
    case "SET_SHOW_TYPE":
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
export { booksListShowTypeReducer };
