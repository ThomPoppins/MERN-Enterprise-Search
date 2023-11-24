import EditProfilePictureModal from './EditProfilePictureModal'
import mongoose from 'mongoose'

export default {
  component: EditProfilePictureModal,
  title: 'EditProfilePictureModal',
  tags: ['autodocs'],
}

export const Default = {
  args: {
    userId: '6551077ff4baf9965edd4e5a',
    onClose: () => console.log('onClose'),
  },
}
