// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object
// eslint-disable-next-line func-style
export function base64StringToFile(base64String, filename) {
  // eslint-disable-next-line no-var
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    // eslint-disable-next-line id-length
    n = bstr.length,
    u8arr = new Uint8Array(n)
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// Download a Base64-encoded file

// eslint-disable-next-line func-style
export function downloadBase64File(base64Data, filename) {
  // eslint-disable-next-line no-var
  var element = document.createElement('a')
  element.setAttribute('href', base64Data)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// Extract an Base64 Image's File Extension
// eslint-disable-next-line func-style
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64'),
  )
}

// Base64 Image to Canvas with a Crop
// eslint-disable-next-line func-style
export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  // eslint-disable-next-line line-comment-position, no-inline-comments
  const canvas = canvasRef // document.createElement('canvas');
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = image64
  // eslint-disable-next-line func-names
  image.onload = function () {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )
  }
}
