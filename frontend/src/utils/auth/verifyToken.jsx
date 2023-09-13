import axios from "axios";
import { BACKEND_URL } from "../../../config.js";
import store from "../../store/store.jsx";
import { USER_LOGGED_IN_ID } from "../../store/actions.jsx";
import { useSelector } from "react-redux";

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
        // TODO: Get user details from database and set redux user state
      })
      .catch((error) => {
        store.dispatch({
          type: USER_LOGGED_IN_ID,
          payload: null,
        });
        console.log("ERROR in verifyToken.jsx: ", error);
      });
  }
};

export default verifyToken;
