import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import EditProfilePictureModal from './EditProfilePictureModal'

export default {
  component: EditProfilePictureModal,
  title: 'components/users/EditProfilePictureModal',
  tags: ['autodocs'],
}

// export const Default = {
//   args: {},
// }

const mockStore = configureStore({
  reducer: {
    user: {
      id: '1',
      email: 'test@gmail.com',
    },
  },
})

export const Default = () => (
  <Provider store={mockStore}>
    <EditProfilePictureModal />
  </Provider>
)
