import { combineReducers } from 'redux'
import {
  booksListShowTypeReducer,
  companiesListShowTypeReducer,
  pendingRecievedInvitesReducer,
  userIdReducer,
  userReducer,
} from './reducers.jsx'

const rootReducer = combineReducers({
  booksListShowType: booksListShowTypeReducer,
  companiesListShowType: companiesListShowTypeReducer,
  userId: userIdReducer,
  user: userReducer,
  pendingRecievedInvites: pendingRecievedInvitesReducer,
})

export default rootReducer
