import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { useNavigate } from 'react-router-dom'
import InvitesList from './InvitesList'
import mongoose from 'mongoose'
import { TextEncoder } from 'util'

// Mock Axios
jest.mock('axios')
// Mock useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))
jest.mock('util', () => ({
  TextEncoder: jest.fn(() => 'mocked-text-encoder'),
}))

// Mock Mongoose and ObjectId
jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose')
  return {
    ...mongoose,
    Types: {
      ...mongoose.Types,
      ObjectId: jest.fn(() => 'mocked-object-id'),
    },
  }
})

// Mock Redux store without thunk because it is not needed for this component
const mockStore = configureStore()

// Mock store dispatch and getState
describe('InvitesList component', () => {
  let store
  let navigate

  // Mock Redux store before each test
  beforeEach(() => {
    // mockStore is used because thunk is not needed for this component.
    // The store is mocked with the user and userId states. Also the pendingRecievedInvites state is mocked with one invite.
    // Also mocks the dispatch and getState functions. The dispatch function
    // is mocked to return the pendingRecievedInvites state. The getState function is mocked to return the user and userId states.
    // That dispatch returns the pendingRecievedInvites state is configured in the InvitesList component. The getState function is
    // used in the InvitesList component to get the user and userId states. The user and userId states are used to get the pendingRecievedInvites
    // state from the database. The pendingRecievedInvites state is used to render the invites table.
    // The pendingRecievedInvites state is mocked with one invite. The invite is used to render the invites table.
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

    // Mock useNavigate
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
    }))

    // Clear mocks after each test
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('renders the table with invites', () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <InvitesList />
        </Provider>,
      )

      expect(getByTestId('invites-table')).toBeInTheDocument()
      expect(getByTestId('invite-row-test invite id')).toBeInTheDocument()
    })

    it('calls updateInviteStatus with "accepted" when accept button is clicked', async () => {
      axios.put.mockResolvedValueOnce({ data: 'test response' })

      const { getByTestId } = render(
        <Provider store={store}>
          <InvitesList />
        </Provider>,
      )

      fireEvent.click(getByTestId('accept-button'))

      await waitFor(() => {
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith(
          'http://localhost:5000/api/invites/status/test invite id',
          {
            status: 'accepted',
          },
        )
        expect(navigate).toHaveBeenCalledTimes(1)
        expect(navigate).toHaveBeenCalledWith('/companies')
      })
    })

    it('calls updateInviteStatus with "declined" when decline button is clicked', async () => {
      axios.put.mockResolvedValueOnce({ data: 'test response' })

      const { getByTestId } = render(
        <Provider store={store}>
          <InvitesList />
        </Provider>,
      )

      fireEvent.click(getByTestId('decline-button'))

      await waitFor(() => {
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith(
          'http://localhost:5000/api/invites/status/test invite id',
          {
            status: 'declined',
          },
        )
        expect(navigate).toHaveBeenCalledTimes(0)
      })
    })
  })
})
