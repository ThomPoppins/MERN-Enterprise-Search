import axios from "axios";
import { PENDING_RECIEVED_INVITES } from "../../store/actions";

export const getPendingRecievedInvites = async () => {
  try {
    // Get the pending invites for the user
    const response = await axios
      .get(`${BACKEND_URL}/invites/reciever/${userId}/pending`)
      .then((response) => {
        console.log("Invites response: ", response);

        // Update the pending reciever invites Redux state
        store.dispatch({
          type: PENDING_RECIEVED_INVITES,
          payload: response.data,
        });

        // Update the invites state
        setInvites(response.data);
      })
      .catch((error) => {
        console.log("ERROR in InvitesList.jsx get pending invites: ", error);
      });
  } catch (error) {
    // TODO: Handle error
    console.log(error);
  }
};
