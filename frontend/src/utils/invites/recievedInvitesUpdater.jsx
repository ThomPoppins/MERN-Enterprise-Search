import axios from 'axios'
import store from '../../store/store'
import { PENDING_RECIEVED_INVITES } from '../../store/actions'
import { BACKEND_URL } from '../../../config'

// Get pending recieved invites from Redux store
export const getPendingRecievedInvites = (userId) => {
  if (!userId) {
    return
  }

  // Promise to get the recieved pending invites
  const updateRecievedPendingInvitesPromise = new Promise((resolve, reject) => {
    // Get the recieving pending invites for the user
    axios
      .get(`${BACKEND_URL}/invites/receiver/${userId}/pending`)
      .then((response) => {
        // console.log("Invites response: ", response); //! TODO: Remove

        if (response.data.length > 0) {
          resolve(response.data)
        }
        reject(new Error('No pending invites'))
      })
      .catch((error) => {
        console.log('ERROR in InvitesList.jsx get pending invites: ', error)
      })
  })

  Promise.resolve(updateRecievedPendingInvitesPromise)
    .then((invites) => {
      // ! TODO: Remove console.log
      console.log(
        'InvitesList.jsx getPendingRecievedInvites invites: ',
        invites,
      )

      // Update the pending receiver invites Redux state
      store.dispatch({
        type: PENDING_RECIEVED_INVITES,
        payload: invites,
      })
    })
    .catch((error) => {
      console.log('ERROR in InvitesList.jsx get pending invites: ', error)
      // Update the pending receiver invites Redux state with 0 invites
      store.dispatch({
        type: PENDING_RECIEVED_INVITES,
        payload: [],
      })
    })
}
