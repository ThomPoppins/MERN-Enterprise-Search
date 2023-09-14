import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BACKEND_URL } from "../../../config";
import CompaniesTable from "../../components/companiesList/CompaniesTable";
import CompaniesCard from "../../components/companiesList/CompaniesCard";
import { COMPANIES_LIST_SHOW_TYPE } from "../../store/actions";

const CompaniesList = () => {
  // useDispatch() is a hook that returns the reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // useSelector() is a hook that takes the current state as an argument and returns whatever data you want from it.
  const showType = useSelector((state) => state.companiesListShowType);
  const [companies, setCompanies] = useState([]);
  const [owners, setOwners] = useState([]);
  const userId = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(BACKEND_URL + "/companies/owned-companies/" + userId)
      .then((response) => {
        setCompanies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleShowTypeChange = (showType) => {
    // dispatch() is a function of the Redux store. You call store.dispatch to dispatch an action.
    // The object passed to the dispatch() function is called action.
    dispatch({ type: COMPANIES_LIST_SHOW_TYPE, payload: showType });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/"} />
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => handleShowTypeChange("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => handleShowTypeChange("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Companies List</h1>
        <Link to="/companies/register">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <CompaniesTable companies={companies} />
      ) : (
        <CompaniesCard companies={companies} />
      )}
    </div>
  );
};

export default CompaniesList;
