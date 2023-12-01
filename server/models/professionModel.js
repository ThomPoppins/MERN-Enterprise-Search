import mongoose from 'mongoose'

const professionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
  },
  { timestamps: true },
)

// Instantiate `User` model
export const Profession = mongoose.model('Profession', professionSchema)
