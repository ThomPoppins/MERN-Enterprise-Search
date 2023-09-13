import axios from "axios";
import { BACKEND_URL } from "../../../config.js";
import store from "../../store/store.jsx";
import { USER_ID, USER } from "../../store/actions.jsx";
import { useSelector } from "react-redux";

const verifyToken = async (token) => {
  if (token) {
    await axios
      .get(BACKEND_URL + "/auth/verify-token?token=" + token)
      .then(async (response) => {
        const userId = response.data.userId;
        console.log(
          "response.data.userId in verifyToken.jsx (should be userId): ",
          userId
        );
        store.dispatch({
          type: USER_ID,
          payload: userId,
        });
        await axios
          .get(BACKEND_URL + "/users/" + userId)
          .then((response) => {
            const user = response.data;
            console.log("user in verifyToken.jsx: ", user);
            store.dispatch({
              type: USER,
              payload: user,
            });
          })
          .catch((error) => {
            store.dispatch({
              type: USER,
              payload: null,
            });
            console.log("ERROR in verifyToken.jsx: ", error);
          });
      })
      .catch((error) => {
        store.dispatch({
          type: USER_ID,
          payload: null,
        });
        console.log("ERROR in verifyToken.jsx: ", error);
      });
  }
};

export default verifyToken;
