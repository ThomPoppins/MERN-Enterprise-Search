import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { BACKEND_URL } from "../../../config.js";

const ShowCompany = () => {
  const [company, setCompany] = useState({});
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(BACKEND_URL + `/companies/${id}`)
      .then((response) => {
        setCompany(response.data);

        const ownerPromises = response.data.owners.map((owner) =>
          axios.get(BACKEND_URL + `/users/user/${owner.userId}`)
        );

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map((response) => response.data);
            setOwners(ownersData);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton destination={"/companies"} />
      <h1 className="text-3xl my-4">Show Company</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          {/* TODO: [MERNSTACK-133] Add all fields of the company model here. Copy paste outer div with ".my-4" class below to achieve this. */}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{company._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name</span>
            <span>{company.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Email</span>
            <span>{company.email}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Phone</span>
            <span>{company.phone}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Start Year</span>
            <span>{company.startYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Owners</span>
            <span>
              {owners
                .map((owner) => owner.firstName + " " + owner.lastName)
                .join(", ")}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(company.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(company.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCompany;
