import { BACKEND_URL } from '../../config.js'

export const getStaticFileURLFromPath = (filePath) => {
  // Remove the first part of the path, which is "public".
  const path = filePath.split('public')[1],
    // Replace "\" with "/".
    pathWithForwardSlashes = path.replace(/\\/g, '/')

  // Return the full URL to the static file.
  return `${BACKEND_URL}${pathWithForwardSlashes}`
}
