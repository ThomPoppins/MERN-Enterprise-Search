import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import mongoose from 'mongoose'
import InviteOperations from './InviteOperations'
import configureStore from 'redux-mock-store'

jest.mock('axios')

const mockStore = configureStore([thunk])

describe('InviteOperations component', () => {
  let store
  let updateInviteStatus
  let invite
  let userId

  beforeEach(() => {
    store = mockStore({
      user: {
        _id: new mongoose.Types.ObjectId('j3b4kthwj5r2k5b3k'),
        username: 'test user username',
        email: 'test user email',
        firstName: 'test user first name',
        lastName: 'test user last name',
        gender: 'Man',
        profilePicture: new mongoose.Schema.Types.ObjectId('kh32g45vkhj2g'),
      },
      userId: 'test user id',
    })

    updateInviteStatus = jest.fn()

    invite = {
      _id: new mongoose.Schema.Types.ObjectId('kh32g45vkhj2g'),
      companyId: new mongoose.Schema.Types.ObjectId('kh32g45vkhj2g'),
      receiverId: new mongoose.Schema.Types.ObjectId('kh32g45vkhj2g'),
      kind: 'accepted',
      companyId: 'test company id',
      companyName: 'test company name',
      status: 'test status',
    }
    userId = 'test user id'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders accept and decline buttons', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InviteOperations
          invite={invite}
          updateInviteStatus={updateInviteStatus}
        />
      </Provider>,
    )

    expect(getByTestId('accept-button')).toBeInTheDocument()
    expect(getByTestId('decline-button')).toBeInTheDocument()
  })

  it('calls updateInviteStatus with "accepted" when accept button is clicked', async () => {
    axios.put.mockResolvedValueOnce({ data: 'test response' })

    const { getByTestId } = render(
      <Provider store={store}>
        <InviteOperations
          invite={invite}
          updateInviteStatus={updateInviteStatus}
        />
      </Provider>,
    )

    fireEvent.click(getByTestId('accept-button'))

    // Timeout for stopping the animation after 2 seconds
    expect(setTimeout).toHaveBeenCalledTimes(1)
    // Timeout for stopping the animation after 2 seconds
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)

    await waitFor(() => {
      expect(updateInviteStatus).toHaveBeenCalledTimes(1)
      expect(updateInviteStatus).toHaveBeenCalledWith(
        'test invite id',
        'accepted',
      )
    })
  })

  it('calls updateInviteStatus with "declined" when decline button is clicked', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InviteOperations
          invite={invite}
          updateInviteStatus={updateInviteStatus}
        />
      </Provider>,
    )

    fireEvent.click(getByTestId('decline-button'))

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

    await waitFor(() => {
      expect(updateInviteStatus).toHaveBeenCalledTimes(1)
      expect(updateInviteStatus).toHaveBeenCalledWith(
        'test invite id',
        'declined',
      )
    })
  })
})
