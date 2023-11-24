import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/animated/Loader'
import Layout from '../../components/layout/Layout'
import { BACKEND_URL } from '../../../config'
import BackButton from '../../components/BackButton'
import SearchResult from '../../components/search/SearchResult'

const Results = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  // Get query from URL
  const query = new URLSearchParams(window.location.search).get('query')
  // Display loading animation while fetching data

  const navigate = useNavigate()

  const getResultsFromQuery = async () => {
    try {
      console.log('query: ', query)
      await axios
        .get(`${BACKEND_URL}/find/experts/${query}`)
        .then((response) => {
          console.log('response.data.results: ', response.data.results)
          setResults(response.data.results)
          setLoading(false)
        })
      // Fetch companies from backend
      // const response = await fetch(`${BACKEND_URL}/companies`)
      // const data = await response.json()
      // setCompanies(data)
      // setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToCompanyDetails = (event, id) => {
    event.preventDefault()
    navigate(`/companies/details/${id}?referrer=${query.replace(/ /u, '+')}`)
  }

  useEffect(() => {
    getResultsFromQuery()
  }, [])

  return (
    <Layout>
      <div className='p-5'>
        <BackButton destination={`/?inputFind=${query.replace(/ /u, '+')}`} />
        <h1 className='my-4 mb-6 flex justify-center text-3xl'>
          <strong>Best</strong> &nbsp; <strong>Pro&apos;s</strong>: &nbsp;{' '}
          {query}
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
            }}
          >
            {results.map((result) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <SearchResult
                key={result._id}
                navigateToCompanyDetails={navigateToCompanyDetails}
                result={result}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Results
