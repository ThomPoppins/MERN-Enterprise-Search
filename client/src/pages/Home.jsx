import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import MainSearch from '../components/search/MainSearch'

const Home = () => {
  // The user ID from Redux state is the active user.
  const userId = useSelector((state) => state.userId)

  // Ping animation when the find button is clicked
  const [findButtonPing, setFindButtonPing] = useState(false)

  // Search query state
  const [searchQuery, setSearchQuery] = useState('')

  // URL params will be set when the user clicks the find button and calls the handleFind function
  const [urlParams, setUrlParams] = useState('')

  // React router navigate hook
  const navigate = useNavigate()

  // Find experts query handler
  const handleFind = (event) => {
    event.preventDefault()

    setFindButtonPing(true)

    // format string to URL params
    setUrlParams(searchQuery.replace(/ /gu, '+'))

    navigate(`/find?query=${urlParams}`)
  }

  // Search query input change handler
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
    setUrlParams(event.target.value.replace(/ /gu, '+'))
  }

  useEffect(() => {
    const inputFind = new URLSearchParams(window.location.search).get(
      'inputFind',
    )

    if (inputFind) {
      setSearchQuery(inputFind.replace(/\+/gu, ' '))
    }
  }, [])

  useEffect(() => {
    // When urlParams is set in handleFindExperts (asynchronous because it is a state being set),
    // then navigate to /find?query=${urlParams}
  }, [urlParams])

  // If user is logged in
  if (userId) {
    return (
      <Layout>
        <div className='mx-auto mt-32'>
          <MainSearch
            findButtonPing={findButtonPing}
            handleFind={handleFind}
            handleSearchQueryChange={handleSearchQueryChange}
            isDisabled={false}
            searchQuery={searchQuery}
          />
        </div>
      </Layout>
    )
  }

  // If no user is logged in
  return (
    <Layout>
      <div className='mx-auto mt-32'>
        <MainSearch
          findButtonPing={findButtonPing}
          handleFind={handleFind}
          handleSearchQueryChange={handleSearchQueryChange}
          isDisabled
          searchQuery={searchQuery}
        />
      </div>
    </Layout>
  )
}

export default Home
