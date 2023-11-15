import React, { useState, useCallback, useRef, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const generateDownload = (canvas, crop) => {
  if (!crop || !canvas) {
    return
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}

const setCanvasImage = (image, canvas, crop) => {
  if (!crop || !canvas || !image) {
    return
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const ctx = canvas.getContext('2d')
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio

  canvas.width = crop.width * pixelRatio * scaleX
  canvas.height = crop.height * pixelRatio * scaleY

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY,
  )
}

const ImageCrop = () => {
  const [upImg, setUpImg] = useState()

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const [crop, setCrop] = useState({ unit: 'px', width: 30, aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  console.log(crop)

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop)
  }, [completedCrop])

  return (
    <div className='App'>
      <div>
        <input accept='image/*' onChange={onSelectFile} type='file' />
      </div>

      <div className='flex justify-center'>
        <div>
          <ReactCrop
            className='h-[500px] w-[500px]'
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            onImageLoaded={onLoad}
            src={upImg}
          />
        </div>
        <div>
          <canvas
            className='rounded-full'
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: '300px',
              height: '300px',
            }}
          />
        </div>
        {/* Canvas to display cropped image */}
      </div>
      <p>
        Note that the download below won't work in this sandbox due to the
        iframe missing 'allow-downloads'. It's just for your reference.
      </p>
      <button
        className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
        type='button'
      >
        Download cropped image
      </button>
    </div>
  )
}

export default ImageCrop
