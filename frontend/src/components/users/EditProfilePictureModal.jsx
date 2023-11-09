import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BACKEND_URL } from "../../../config";
import store from "../../store/store.jsx";
import axios from "axios";

const EditProfilePictureModal = ({ userId, onClose }) => {
  // Handle the form submit event
  const handleFormSubmit = (event) => {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    // Add the image data to the FormData object
    formData.append("image", event.target.image.files[0]);

    // Send the image to the server
    axios
      .post(`${BACKEND_URL}/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.imageId) {
          // Save the image id of the profile picture to the user's document in the database
          axios
            .put(`${BACKEND_URL}/users/profile-picture`, {
              userId: userId,
              imageId: response.data.imageId,
            })
            .then((response) => {
              axios
                .get(`${BACKEND_URL}/users/user/${userId}`)
                .then((response) => {
                  console.log("RESPONSE from /users/user/:id: ", response);
                  const user = response.data;
                  store.dispatch({
                    type: "USER",
                    payload: user,
                  });
                })
                .catch((error) => {
                  console.log(
                    "ERROR in EditProfilePictureModal from /users/user/:id: ",
                    error
                  );
                });

              // Close the modal
              onClose();
            })
            .catch((error) => {
              console.log("ERROR from /users/profile-picture: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("ERROR from /upload/image route: ", error);
      });
  };

  return (
    <div
      className="fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-auto border-2 border-purple-900 bg-violet-950/40 rounded-lg px-4 py-2 m-4 flex flex-col relative"
        data-test-id="company-modal"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-green-300 hover:text-red-500 cursor-pointer"
          onClick={onClose}
          data-test-id="close-button"
        />
        <h1>Upload Profile Picture</h1>

        <form onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfilePictureModal;
