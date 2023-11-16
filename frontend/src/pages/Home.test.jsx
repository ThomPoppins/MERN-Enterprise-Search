import React from 'react'
import axios from 'axios'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Home from './Home'
import mongoose from 'mongoose'
import { TextEncoder } from 'util'

const mockStore = configureStore([])

describe('Home component', () => {
  jest.setTimeout(2000)
  let store

  beforeEach(() => {
    store = mockStore({
      user: {
        _id: 'test user id',
        username: 'test user username',
        email: 'test user email',
        firstName: 'test user first name',
        lastName: 'test user last name',
        gender: 'Man',
        profilePicture: 'test profile picture',
      },
      userId: 'test user id',
      pendingRecievedInvites: [
        {
          _id: new mongoose.Types.ObjectId('l32h5gj435vl5gb32lj5g2lj'),
          status: 'pending',
          senderId: new mongoose.Types.ObjectId('25b4332kjh3k5643k'),
          sender: {
            _id: new mongoose.Types.ObjectId('lqn45vhljw5vgljgq43lqj54g'),
            firstName: 'test sender first name',
            lastName: 'test sender last name',
            username: 'test sender username',
            email: 'test sender email',
            gender: 'Man',
            profilePicture: 'test sender profile image ID',
            profilePictureURL: 'test sender profile picture URL',
          },
          receiverId: new mongoose.Types.ObjectId('l32h5gj435vl5gb32lj5g2lj'),
          receiver: {
            _id: new mongoose.Types.ObjectId('lqn45vhljw5vgljgq43lqj54g'),
            firstName: 'test receiver first name',
            lastName: 'test receiver last name',
            username: 'test receiver username',
            email: 'test receiver email',
            gender: 'Man',
            profilePicture: 'test receiver profile image ID',
            profilePictureURL: 'test receiver profile picture URL',
            kind: 'company_ownership',
            companyId: new mongoose.Types.ObjectId('l32h5gj435vl5gb32lj5g2lj'),
            company: {
              name: 'test company name',
              logo: 'test company logo',
              email: 'test@company.com',
              phone: '1234567890',
              kvkNumber: '12345678',
              slogan: 'test company slogan',
              description: 'test company description',
              address: {},
              billingAddress: {},
              addressFormat: new mongoose.Types.ObjectId(
                'l32h5gj435vl5gb32lj5g2lj',
              ),
              country: 'NL',
              region: '',
              owners: [
                {
                  userId: 'w98rykwjhr3kwrqkjb',
                },
                {
                  userId: 'l32h5gj435vl5gb32lj5g2lj',
                },
                {
                  userId: 'l32h5g3hg4keb5g2lj',
                },
                {
                  userId: 'l32emn435bhwj5g2lj',
                },
              ],
              companyAdmins: [],
              locations: [],
              departments: [],
              businessConfig: {},
              paymentDetails: {},
              startYear: 2021,
              active: true,
              industries: [],
              public: true,
              reviews: [],
              rating: 5,
              customerts: [],
              premium: 'platinum',
              vendor: new mongoose.Types.ObjectId('l32h5gj435vl5gb32lj5g2lj'),
              employees: [],
              stories: [],
              products: [],
              services: [],
              agenda: {},
              appointments: [],
              messages: [],
              notificationz: {},
              events: [],
              tasks: [],
              invoices: [],
              orders: [],
              payments: [],
              mainImageId: new mongoose.Types.ObjectId(
                'l32h5gj435vl5gb32lj5g2lj',
              ),
              images: [],
              createdAt: '2021-05-01T12:00:00.000Z',
              updatedAt: '2021-05-01T12:00:00.000Z',
            },
          },
        },
      ],
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
