import axios from "axios";
import { BACKEND_URL } from "../../../config.js";
import store from "../../store/store.jsx";
import { USER_LOGGED_IN_ID } from "../../store/actions.jsx";

// TODO: [MERNSTACK-162] Save userId as state in Redux store

const verifyToken = async (token) => {
  if (token) {
    await axios
      .get(BACKEND_URL + "/auth/verify-token?token=" + token)
      .then((response) => {
        const userId = response.data.userId;
        console.log(
          "response.data.userId in verifyToken.jsx (should be userId): ",
          userId
        );
        store.dispatch({
          type: USER_LOGGED_IN_ID,
          payload: userId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default verifyToken;
