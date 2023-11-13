import {
  COMPANIES_LIST_SHOW_TYPE,
  PENDING_RECIEVED_INVITES,
  USER,
  USER_ID,
} from './actions.jsx'

const companiesListShowTypeReducer = (state = 'card', action) => {
    switch (action.type) {
      case COMPANIES_LIST_SHOW_TYPE:
        return action.payload
      default:
        return state
    }
  },
  userIdReducer = (state = null, action) => {
    switch (action.type) {
      case USER_ID:
        return action.payload
      default:
        return state
    }
  },
  // Save user details in redux store
  userReducer = (state = null, action) => {
    switch (action.type) {
      case USER:
        return action.payload
      default:
        return state
    }
  },
  pendingRecievedInvitesReducer = (state = null, action) => {
    switch (action.type) {
      case PENDING_RECIEVED_INVITES:
        return action.payload
      default:
        return state
    }
  }

/*
 * Add additional reducers here to the object
 * Don't forget to import them at the top of the rootReducer.jsx file
 * and add them to the combineReducers() function
 */
export {
  companiesListShowTypeReducer,
  userIdReducer,
  userReducer,
  pendingRecievedInvitesReducer,
}
