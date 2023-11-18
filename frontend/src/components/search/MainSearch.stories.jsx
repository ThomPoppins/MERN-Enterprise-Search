import PropTypes from 'prop-types'
import React from 'react'

// Import the component
import MainSearch from './MainSearch'

// This default export determines where your story goes in the
// story list depending on the component name.
export default {
  title: 'components/search/MainSearch',
  component: MainSearch,
  argTypes: {
    findButtonPing: { control: 'boolean' },
    handleFind: { action: 'clicked' },
    handleSearchQueryChange: { action: 'changed' },
    searchQuery: { control: 'text' },
  },
}

// Export default story
export const Default = ({
  findButtonPing,
  handleFind,
  handleSearchQueryChange,
  searchQuery,
}) => (
  <MainSearch
    findButtonPing={findButtonPing}
    handleFind={handleFind}
    handleSearchQueryChange={handleSearchQueryChange}
    searchQuery={searchQuery}
  />
)

// Define prop types
Default.propTypes = {
  // Define the propTypes for your component here.
  // For example, if MainSearch takes a `placeholder` prop, you might add:
  // placeholder: PropTypes.string,
  findButtonPing: PropTypes.bool.isRequired,
  handleFind: PropTypes.func.isRequired,
  handleSearchQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

// Set default story prop values
Default.args = {
  // Define the props that get passed to your component here.
  // For example, if MainSearch takes a `placeholder` prop, you might add:
  // placeholder: 'For example: plumber, electrician, gardener, developer, something else...',
  findButtonPing: false,
  handleSearchQueryChange: (event) => {
    event.preventDefault()
    console.log(
      'handleSearchQueryChange is called and searchQuery + urlParams are set in the Home component.',
    )
  },
  // Find results based by on the query
  handleFind: (event) => {
    event.preventDefault()

    console.log('findButtonPing became true')

    // Mock search query
    const searchQuery = 'e-commerce company'
    // Mock url params
    const urlParams = searchQuery.replace(/ /gu, '+')

    // // format string to URL params
    console.log(
      `setUrlParams(searchQuery.replace(/ /gu, '+') has been called to url: "${urlParams}"S`,
    )

    // Navigated to results page
    console.log(
      `navigate(/find?query=${urlParams}) has been called to url: "/find?query=${urlParams}", this component will be unmounted.`,
    )
  },
}

// Export story for when the find button has been clicked, this is just
// a fraction of time before getting redirected to the results page
export const FindButtonClicked = (findButtonPing) => (
  <MainSearch findButtonPing={findButtonPing} />
)
FindButtonClicked.args = {
  findButtonPing: true,
}
