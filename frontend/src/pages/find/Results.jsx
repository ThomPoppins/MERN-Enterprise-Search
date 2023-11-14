import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../../components/animated/Loader'
import Layout from '../../components/layout/Layout'
import { BACKEND_URL } from '../../../config'

const Results = () => {
  const [results, setResults] = useState([]),
    [loading, setLoading] = useState(true),
    // Get query from URL
    query = new URLSearchParams(window.location.search).get('query')
  // Display loading animation while fetching data

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

  useEffect(() => {
    getResultsFromQuery()
  }, [])

  return (
    <Layout>
      <h1>Found experts:</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {results.map((result) => (
            <div key={result.id}>
              <h2>{result.name}</h2>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Results
