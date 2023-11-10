import axios from "axios";
import store from "../../store/store";
import { PENDING_RECIEVED_INVITES } from "../../store/actions";
import { BACKEND_URL } from "../../../config";
import { useSelector } from "react-redux";

export const getPendingRecievedInvites = async (userId) => {
  if (!userId) {
    return;
  }

  try {
    // Get the pending invites for the user
    const response = await axios
      .get(BACKEND_URL + `/invites/reciever/${userId}/pending`)
      .then((response) => {
        console.log("Invites response: ", response);

        // Update the pending reciever invites Redux state
        store.dispatch({
          type: PENDING_RECIEVED_INVITES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("ERROR in InvitesList.jsx get pending invites: ", error);
      });
  } catch (error) {
    // TODO: Handle error
    console.log(error);
  }
};
