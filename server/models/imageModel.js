import mongoose from 'mongoose'

/*
 * Image schema.
 * The path property is the path to the image file.
 * The timestamps property will automatically record the date and time when the document was created and updated.
 */
const imageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      default: '',
    },
    url: {
      type: String,
      required: true,
      default: '',
    },
  },
  { timestamps: true },
)

export const Image = mongoose.model('Image', imageSchema)
