import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../../components/animated/Loader'
import Layout from '../../components/layout/Layout'

const Results = () => {
  // const [companies, setCompanies] = useState([])

  // Get query from URL
  const query = new URLSearchParams(window.location.search).get('query'),
    // Display loading animation while fetching data
    [loading, setLoading] = useState(true)

  const getResultsFromQuery = async () => {
    try {
      // Fetch companies from backend
      // const response = await fetch(`${BACKEND_URL}/companies`)
      // const data = await response.json()
      // setCompanies(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <h1>Results</h1>
      {loading ? <Loader /> : <div>Query: {query}</div>}
    </Layout>
  )
}

export default Results
