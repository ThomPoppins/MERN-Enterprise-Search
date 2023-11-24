import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/animated/Loader'
import Layout from '../../components/layout/Layout'
import { FcBriefcase } from 'react-icons/fc'
import { BACKEND_URL } from '../../../config'
import BackButton from '../../components/BackButton'

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
        <BackButton destination={'/'} />
        <h1 className='my-4 mb-6 flex justify-center text-3xl'>Experts:</h1>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {results.map((result) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className='m-4 mx-auto flex h-auto w-[600px] max-w-full flex-col rounded-lg border-2 border-purple-900 bg-violet-950/40 px-4 py-2'
                data-testid='search-result'
                key={result._id}
                onClick={(event) => navigateToCompanyDetails(event, result._id)}
                role='button'
                tabIndex={0}
              >
                <h2 className='w-fit rounded-lg bg-purple-500 px-4 py-1'>
                  {result.startYear}
                </h2>
                <h4 className='my-2 text-gray-500'>KVK: {result.kvkNumber}</h4>
                <div className='mb-4 flex items-center justify-center gap-x-2'>
                  <img
                    alt={result.name}
                    className='h-[250px] w-[250px] rounded-full'
                    src={
                      result.logoUrl ? `${BACKEND_URL}${result.logoUrl}` : ''
                    }
                  />
                </div>
                <div className='flex items-center justify-start gap-x-2'>
                  <FcBriefcase className='text-2xl text-red-300' />
                  <h2 className='my-1'>{result.name}</h2>
                </div>
                <p className='mt-4'>
                  <strong>{result.slogan}</strong>
                </p>
                <p className='my-2'>{result.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Results
