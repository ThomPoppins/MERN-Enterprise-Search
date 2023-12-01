/* eslint-disable react/no-multi-comp */
import React from 'react'
import Navbar from './Navbar'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import {
  userReducer,
  userIdReducer,
  pendingRecievedInvitesReducer,
} from '../../store/reducers'

const mockStore = configureStore({
  preloadedState: {
    userId: 'dkfjhk3h4ukh5k',
    user: {
      _id: '1',
      firstName: 'Thom',
      profilePictureURL:
        'http://localhost:5555/uploads/images/profile-picture-1700804688407.png',
    },
  },
  reducer: {
    userId: userIdReducer,
    user: userReducer,
  },
})

export default {
  title: 'components/layout/Navbar',
  component: Navbar,
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
}

export const Default = () => (
  <Provider store={mockStore}>
    <Navbar />
  </Provider>
)

const invitedMockStore = configureStore({
  preloadedState: {
    userId: 'dkfjhk3h4ukh5k',
    user: {
      _id: '1',
      firstName: 'Thom',
      profilePictureURL:
        'http://localhost:5555/uploads/images/profile-picture-1700804688407.png',
    },
    pendingRecievedInvites: [
      {
        _id: '1',
        fromUser: {
          _id: '2',
          firstName: 'John',
          profilePictureURL:
            'http://localhost:5555/uploads/images/profile-picture-1700804688407.png',
        },
      },
      {
        _id: '2',
        fromUser: {
          _id: '3',
          firstName: 'Jane',
          profilePictureURL:
            'http://localhost:5555/uploads/images/profile-picture-1700804688407.png',
        },
      },
    ],
  },
  reducer: {
    userId: userIdReducer,
    user: userReducer,
    pendingRecievedInvites: pendingRecievedInvitesReducer,
  },
})

export const Invited = () => (
  <Provider store={invitedMockStore}>
    <Navbar />
  </Provider>
)
