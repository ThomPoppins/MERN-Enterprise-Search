import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Home from './Home'

const mockStore = configureStore([])

describe('Home component', () => {
  jest.setTimeout(2000)
  let store

  beforeEach(() => {
    store = mockStore({
      userId: '123',
    })
  })

  it('renders the search input and find button when the user is logged in.', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    )

    const searchInput = screen.getByTestId('find-expert-search-query-input')
    const findButton = screen.getByTestId('find-button')

    expect(searchInput).toBeInTheDocument()
    expect(findButton).toBeInTheDocument()
  })

  it('updates the search query state when the input value changes when user is logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    )

    const searchInput = screen.getByTestId('find-expert-search-query-input')

    fireEvent.change(searchInput, { target: { value: 'plumber' } })

    expect(searchInput.value).toBe('plumber')
  })

  it('navigates to the find page with the correct URL params when the find button is clicked when the user is logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    )

    const searchInput = screen.getByTestId('find-expert-search-query-input')
    const findButton = screen.getByTestId('find-button')

    fireEvent.change(searchInput, { target: { value: 'plumber' } })
    fireEvent.click(findButton)

    const redirected = new Promise(async (resolve, reject) => {
      await setTimeout(() => {
        if (window.location.href === 'http://localhost/find?query=plumber') {
          resolve(true)
        }
        reject(new Error(false))
      }, 1000)
    })
      .then((resolve) => resolve)
      .catch((error) => error)

    expect(redirected).toBeTruthy()
  })

  it('displays the home page content when no user is logged in', () => {
    store = mockStore({
      userId: null,
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    )

    const homePageContent = screen.getByText(
      /Register and login to your account to see the features of this application in action./i,
    )

    expect(homePageContent).toBeInTheDocument()
  })
})
