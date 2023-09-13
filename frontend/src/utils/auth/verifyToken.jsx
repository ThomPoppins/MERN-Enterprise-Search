import axios from "axios";
import { BACKEND_URL } from "../../../config.js";

const verifyToken = async (token) => {
  console.log("JWT token in verifyToken.jsx: ", token);

  if (token) {
    await axios
      .get(BACKEND_URL + "/auth/verify-token?token=" + token)
      .then((response) => {
        const userId = response.data.userId;
        console.log(
          "response.data.userId in verifyToken.jsx (should be userId): ",
          userId
        );
        return userId;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default verifyToken;
