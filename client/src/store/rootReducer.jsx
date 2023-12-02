import { combineReducers } from 'redux'
import {
  companiesListShowTypeReducer,
  pendingRecievedInvitesReducer,
  userIdReducer,
  userReducer,
} from './reducers.jsx'

const rootReducer = combineReducers({
  companiesListShowType: companiesListShowTypeReducer,
  userId: userIdReducer,
  user: userReducer,
  pendingRecievedInvites: pendingRecievedInvitesReducer,
})

export default rootReducer
