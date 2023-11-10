import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { BACKEND_URL } from '../../../config'
import CompaniesTable from '../../components/companies/CompaniesTable'
import CompaniesCard from '../../components/companies/CompaniesCard'
import { COMPANIES_LIST_SHOW_TYPE } from '../../store/actions'
import { enqueueSnackbar } from 'notistack'

const CompaniesList = () => {
  // useDispatch() is a hook that returns the reference to the dispatch function from the Redux store.
  const dispatch = useDispatch()
  // @ts-ignore useSelector() is a hook that takes the current state as an argument and returns whatever data you want from it.
  const showType = useSelector((state) => state.companiesListShowType)
  // @ts-ignore userId is a string from the Redux store state
  const userId = useSelector((state) => state.userId)
  // companies is an array of objects
  const [companies, setCompanies] = useState([])
  // loading is a boolean that is true when the request to the backend is being sent and false when the response is received
  const [loading, setLoading] = useState(false)

  // updateCompanies is a function that sends a GET request to the backend to get the companies that the user owns
  const updateCompanies = () => {
    setLoading(true)
    axios
      .get(BACKEND_URL + '/companies/owned-companies/' + userId)
      .then((response) => {
        setCompanies(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        enqueueSnackbar('Error loading companies, please try again later.', {
          variant: 'error',
          preventDuplicate: true
        })

        console.log(error) // ! TODO: Remove console.log and write errors to logfile

        // TODO: Search for a pretty loading spinner animation
        setLoading(false)
      })
  }

  useEffect(() => {
    updateCompanies()
  }, [])

  const handleShowTypeChange = (showType) => {
    // dispatch() is a function of the Redux store. You call store.dispatch to dispatch an action.
    // The object passed to the dispatch() function is called action.
    dispatch({ type: COMPANIES_LIST_SHOW_TYPE, payload: showType })
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-gradient-to-l px-4 py-1 rounded-lg"
            onClick={() => handleShowTypeChange('card')}
            data-test-id="show-card-button"
          >
            Card
          </button>
          <button
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:bg-purple-700 hover:bg-gradient-to-l px-4 py-1 rounded-lg"
            onClick={() => handleShowTypeChange('table')}
            data-test-id="show-table-button"
          >
            Table
          </button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Companies</h1>
          <Link to="/companies/register">
            <MdOutlineAddBox className="text-green-300 hover:text-purple-500 text-4xl" />
          </Link>
        </div>
        {loading
          ? (
          <Spinner />
            )
          : showType === 'table'
            ? (
          <CompaniesTable
            companies={companies}
            updateCompanies={updateCompanies}
          />
              )
            : (
          <CompaniesCard
            companies={companies}
            updateCompanies={updateCompanies}
          />
              )}
      </div>
    </Layout>
  )
}

export default CompaniesList
