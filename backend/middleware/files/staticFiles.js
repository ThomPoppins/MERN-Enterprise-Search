const { BACKEND_URL } = process.env

export const getStaticFileURLFromPath = (filePath) => {
  // Remove the first part of the path, which is "public".
  // eslint-disable-next-line prefer-destructuring
  const path = filePath.split('public')[1],
    // Replace "\" with "/".
    pathWithForwardSlashes = path.replace(/\\/gu, '/')

  // Return the full URL to the static file.
  return `${BACKEND_URL}${pathWithForwardSlashes}`
}

export const getURLSuffixFromPath = (filePath) => {
  // Remove the first part of the path, which is "public".
  // eslint-disable-next-line prefer-destructuring
  const path = filePath.split('public')[1],
    // Replace "\" with "/".
    pathWithForwardSlashes = path.replace(/\\/gu, '/')

  // Return the full URL to the static file.
  return `${pathWithForwardSlashes}`
}
