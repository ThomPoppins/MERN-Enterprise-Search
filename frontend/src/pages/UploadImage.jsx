import React from "react";
import Layout from "../components/layout/Layout";
import { BACKEND_URL } from "../../config";
import axios from "axios";

const UploadImage = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);

    axios
      .post(`${BACKEND_URL}/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("RESPONSE from /upload/image route: ", response);
      })
      .catch((error) => {
        console.log("ERROR from /upload/image route: ", error);
      });
  };

  return (
    <Layout>
      <h1>UploadImage</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="file" name="image" />
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
};

export default UploadImage;
