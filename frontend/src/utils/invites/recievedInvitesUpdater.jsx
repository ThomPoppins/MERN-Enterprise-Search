import axios from "axios";
import store from "../../store/store";
import { PENDING_RECIEVED_INVITES } from "../../store/actions";
import { BACKEND_URL } from "../../../config";
import { useSelector } from "react-redux";

// Get pending recieved invites from Redux store
export const getPendingRecievedInvites = async (userId) => {
  if (!userId) {
    return;
  }

  // Promise to get the recieved pending invites
  const updateRecievedPendingInvitesPromise = new Promise(
    async (resolve, reject) => {
      // Get the recieving pending invites for the user
      axios
        .get(BACKEND_URL + `/invites/reciever/${userId}/pending`)
        .then((response) => {
          // console.log("Invites response: ", response); //! TODO: Remove

          if (response.data.length > 0) {
            resolve(response.data);
          }
          reject("No pending invites");
        })
        .catch((error) => {
          console.log("ERROR in InvitesList.jsx get pending invites: ", error);
          reject(error);
        });
    }
  );

  Promise.resolve(updateRecievedPendingInvitesPromise)
    .then((invites) => {
      console.log(
        "InvitesList.jsx getPendingRecievedInvites invites: ",
        invites
      ); // ! TODO: Remove

      // Update the pending reciever invites Redux state
      store.dispatch({
        type: PENDING_RECIEVED_INVITES,
        payload: invites,
      });
    })
    .catch((error) => {
      console.log("ERROR in InvitesList.jsx get pending invites: ", error);
      // Update the pending reciever invites Redux state with 0 invites
      store.dispatch({
        type: PENDING_RECIEVED_INVITES,
        payload: [],
      });
    });
};

//   // Get the recieving pending invites for the user
//   await axios
//     .get(BACKEND_URL + `/invites/reciever/${userId}/pending`)
//     .then((response) => {
//       // console.log("Invites response: ", response); //! TODO: Remove

//       // Update the pending reciever invites Redux state
//       store.dispatch({
//         type: PENDING_RECIEVED_INVITES,
//         payload: response.data,
//       });
//     })
//     .catch((error) => {
//       console.log("ERROR in InvitesList.jsx get pending invites: ", error);
//     });
// } catch (error) {
//   // TODO: Handle error
//   console.log(error);
// }
// };
