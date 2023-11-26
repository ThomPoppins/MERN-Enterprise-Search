---
'starter-vite-react': patch
---

- [Version v0.0.3 Release Notes](#version-v003-release-notes)
  - [Funtional Demo:](#funtional-demo)
  - [New Features](#new-features)
    - [Basic Search Functionality](#basic-search-functionality)
    - [Image Cropping](#image-cropping)
    - [Company Logo Cropping](#company-logo-cropping)
    - [Professions in Company Schema](#professions-in-company-schema)
    - [Storybook Integration](#storybook-integration)
    - [Testing](#testing)
    - [Animations](#animations)
    - [Co-Ownership Invites](#co-ownership-invites)
  - [Pending Tasks](#pending-tasks)
- [Version v0.0.2 Release Notes](#version-v002-release-notes)
  - [Backend server CDN for static files](#backend-server-cdn-for-static-files)
  - [File Upload](#file-upload)
  - [Version v0.0.1 Release Notes](#version-v001-release-notes)
    - [Registering an Account](#registering-an-account)
    - [Logging In](#logging-in)
    - [Company Registration and Ownership](#company-registration-and-ownership)
      - [How to Register a Company](#how-to-register-a-company)
      - [How to Add a Co-owner to a Company](#how-to-add-a-co-owner-to-a-company)


# Version v0.0.3 Release Notes

## Funtional Demo:

![Demo](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/GIF/2023-11-26-Demo-Login-Searh-Invite.gif?raw=true)

## New Features

### Basic Search Functionality
- Users can now search for companies by name.
- Search results are listed in a grid with company images.
- Clicking on a company navigates the user to the company details page (Company Profile).
- If the current logged in user is a member (owner, employee, admin etc.) of the company, private details will be shown on the company profile page.


> Find button is disabled if no search input value is given:
![Search Field](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/search-001-empty-input.png?raw=true)

> **Search is ready to find pro's!**

![Search Query Ready To Find](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/search-002-search-machine-ready.png?raw=true)


> **CSS Grid used for structuring the Result components (the clickable company specific rectangle that redirects to their profile/details page)**

![Search Results Grid](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/search-003-results.png?raw=true)

![Click Company Result](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/search-004-click-result.png?raw=true)

> **Current user is member (owner) of this company, private details revealed:**

![Company Profile/Details Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/search-005-company-profile.png?raw=true)


> **Private details hidden, user not member of this company:**

![Company Private Details Hidden](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/lifeguard003-company-profile-details-with-private-details-hidden-for-general-user-who-is-not-member-of-company.png?raw=true)

### Image Cropping
- Users can upload an image and crop it via drag-n-drop or file selection.
- Preview canvas shows the user how the crop will be in a round circled shape.
- The cropped image is displayed as the default profile picture.
- After cropping, users can download the cropped file.
- Cropped base64 binary images are converted into BLOB and uploaded to the Express.js server as a png file.
- Images are served as static files by the /backend Express.js server, acting as an images/files CDN for the frontend application.

> /profile Profile page from a new user that has not uploaded a profile image yet.

![New User Profile Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-001-new-user.png?raw=true)

> Clicking the 'Upload' button on the placeholder

![Click Upload Button](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-002-edit-button.png?raw=true)

> Drop an image file on the square

![Drop Image File In Dropzone](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-003-drag-n-drop-image-file-.png?raw=true)

> **frontend\src\components\users\EditProfilePictureModal.jsx: Implementing image file-drop zone with react-dropzone.**

```javascript
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const EditProfilePictureModal = ({ onClose }) => {
...etc.
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const dataURL = reader.result
        console.log(dataURL)

        setUpImg(dataURL)
      }
      reader.readAsDataURL(file)
    })
  }, [])

...etc.
const { getRootProps, getInputProps } = useDropzone({ onDrop })
...
return (
...etc.
          <div
            {...getRootProps({
              className:
                'dropzone mx-auto w-[300px] h-[300px] mt-16 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center',
            })}
          >
            <input
              {...getInputProps({
                accept: 'image/*',
                onChange: onSelectFile,
              })}
            />
            <p>Drag &apos;n&apos; drop image here, or click to select image</p>
          </div>
...etc.
)
```

> **After dropping the image in the dropzone a ReactCrop component is rendered and a preview canvas:**

![Crop Profile Picture](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-005-Custom-cropping-and-preview-.png?raw=true)

> Setting the crop I wish to download a PNG file of.

![Set Crop To Download](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-006-Generate-Downloadable-File-From-Blob.png?raw=true)

> **After clicking the 'Download Cropped Image' button, a blob file is created from the canvas preview using the canvas API that converts a base64 binary string into a raw Blob data file.**
>
> **frontend\src\components\users\EditProfilePictureModal.jsx:**

```javascript
/*
 * Function to create a blob from canvas (the crop preview) and download it as png file.
 */
function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return
  }

  // toBlob() is not supported by IE11.
  // toBlob() is a method from the canvas API that converts the canvas image to a blob.
  // A blob is a file-like object of immutable, raw data.
  canvas.toBlob(
    (blob) => {
      // The blob is then converted to a URL using URL.createObjectURL().
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      // The URL is then used to create a link element with the download attribute.
      anchor.href = URL.createObjectURL(blob)
      // The link element is then clicked to download the file.
      anchor.click()

      // The URL is then revoked to free up memory.
      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}
```

> **I zoomed in too much on purpose so it's very clear the cropped image base64 image preview converted into a Blob raw data object, then that raw data saved to file with PNG format.**

![Download PNG Cropped Image Result](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-007-result-downloaded-cropped-image-png.png?raw=true)

> **When you have selected the crop you wish, the user can click the 'Upload' button:**

![Upload Cropped Image Button Click](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-008-upload-cropped-profile-image.png?raw=true)

> **When the user clicks Upload after cropping, Blob binary (raw data) object is generated and written to a image file with PNG extension. Then the File is uploaded to the /backend Express.js server that will serve the static image file.

```jsx
  const saveProfileImage = (canvas, completedCrop) => {
    if (!completedCrop || !canvas) {
      console.log(completedCrop)
      return
    }

    canvas.toBlob(
      (blob) => {
        // Create a new FormData object
        const formData = new FormData()

        // Make the blob into a file
        const file = new File([blob], 'profile-picture.png')

        // Add the image data to the FormData object
        formData.append('image', file)

        // Send the image to the server with FormData header set so the image can be send
        axios
          .post(`${BACKEND_URL}/upload/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.imageId) {
              // Save the image id of the profile picture to the user's document in the database
              axios
                .put(`${BACKEND_URL}/users/profile-picture`, {
                  imageId: response.data.imageId,
                  userId,
                })
                .then(() => {
                  // Get the user's updated document from the database and update the user state
                  axios
                    .get(`${BACKEND_URL}/users/user/${userId}`)
                    .then((response) => {
                      const userData = response.data

                      console.log('user DATA', userData)

                      // Update the user state
                      store.dispatch({ type: 'USER', payload: userData })
                      onClose()
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      'image/png',
      1,
    )
  }
```

> **/backend/routes/uploadRoute.js: Here the file will get received by the POST /upload/image end-point, using Multer for handling the File, naming it and giving it a destination, the /backend/public/uploads/images folder. (The /public folder is the served static files directory of Express.js by calling `app.use(Express.static('public'))` in /backend/index.js)**

```jsx
import { Image } from '../models/imageModel.js'
import { getURLSuffixFromPath } from '../middleware/files/staticFiles.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import apiLimiter from '../middleware/rate-limiter/apiLimiter.js'

const router = express.Router(),
  // Multer disk storage configuration.
  storage = multer.diskStorage({
    // `destination` is the folder where the uploaded file will be stored.
    destination(request, file, callback) {
      callback(null, './public/uploads/images')
    },
    fileFilter(request, file, callback) {
      // eslint-disable-next-line
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        // Send status 400 response if the file is not an image and a (error) message to inform the client.
        return callback(new Error('Only images allowed!'))
      }

      // Image file is accepted. Pass `true` to the callback.
      return callback(null, true)
    },
    // Filename is the name of the uploaded file.
    filename(request, file, callback) {
      // Split the file name and extension.
      const [fileName, fileExtension] = file.originalname.split('.'),
        timestamp = Date.now()
      // e file name to multer.
      callback(null, `${fileName}-${timestamp}.${fileExtension}`)
    },
  }),
  // Create multer instance with the storage configuration.
  upload = multer({ storage })

// POST image upload route, will be in the uploadRoute.js file if it works.
router.post(
  '/image',
  apiLimiter,
  upload.single('image'),
  async (request, response) => {
    // If the file upload was successful, the file will be stored in the "uploads/images" folder.
    console.log('REQUEST FILE: ', request.file)

    if (!request.file) {
      console.log('No image file. `request`: ', request)

      return response.status(400).send({
        message: 'No image uploaded.',
      })
    }

    // Prepare response object to send to client with image path and database Image._id.
    const responseObj = {
        message: 'Image uploaded successfully!',
        imagePath: request.file.path,
        url: getURLSuffixFromPath(request.file.path),
        imageId: new mongoose.Types.ObjectId(),
      },
      // Create Instance of Image model with the image path to safe as docyment in the MongoDB Image collection
      image = new Image({
        path: request.file.path,
        url: getURLSuffixFromPath(request.file.path),
      })

    // Save new Image document to database
    await image
      .save()
      .then((result) => {
        console.log('Image saved to database!')

        console.log('Result saving image call: ', result)

        responseObj.imageId = result._id
        responseObj.imageUrl = result.url
      })
      .catch((error) => {
        console.log('Error saving image to database: ', error)

        // TOGOLIVE: [MERNSTACK-260] Remove error message to the frontend before going into production
        return response.status(500).send({
          message: `Error saving image to database! ${error.message}`,
        })
      })

    console.log('Response object: ', responseObj)

    return response.status(200).send(responseObj)
  },
)

export default router
```

> **As you can see is the profile picture now updated and used:**

![Upload Cropped Image Button Click](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-009-profile-image-set.png?raw=true)

### Company Logo Cropping
- Implemented image crop functionality for company logos in the register and edit company pages.
- Company logos are displayed in a circle-shaped frame throughout the application.
- When cropping the logo image, companies can see how the logo will look within the circle-shaped border.

> **Company "logo's" can get cropped the same way as profile pictures with 1 / 1 aspect ratio:**

![Upload Company Logo Button](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-010-company-logo-upload.png?raw=true)

> **Select crop:**

![Crop Logo Modal](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-011-company-logo-upload.png?raw=true)

> **Upload image:**

![Crop Logo Modal](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-011-company-logo-upload.png?raw=true)

> After saving the edited or registered company, the cropped image served by Express.js is used everywhere where the main company logo should be displayed.

![Company Modal](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/image-crop-012-company-details-modal.png?raw=true)


### Professions in Company Schema
- Added a new field to the company model for professions.
- Companies can add professions to their profiles during registration.
- Registereing companies professions will help the search result to become more relevant and dynamic.

### Storybook Integration
- Installed Storybook for component development.
- Added a few initial components to Storybook.



### Testing
- Jest and React-Testing-Library installed and functional.
- Ongoing work on writing tests for almost every component.

### Animations
- Added subtle animations for a more interactive user experience.

> /frontend/tailwind.config.js
```javascript file=/frontend/tailwind.config.js
// Subtle edit of Tailwind preinstalled animations making it a lot more joyful and grabs the user attention better:
export default {
  content: [
    './src/components/**/*.jsx',
    './src/pages/**/*.jsx',
    './src/**/*.jsx',
    './src/index.html',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(28.0deg)' },
          '20%': { transform: 'rotate(-16.0deg)' },
          '30%': { transform: 'rotate(28.0deg)' },
          '40%': { transform: 'rotate(-8.0deg)' },
          '50%': { transform: 'rotate(20.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        bounce: {
          '0%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },

          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
      animation: {
        'waving-button': 'wave 1s linear infinite',
        'bounce-fast': 'bounce 0.4s infinite',
        'bounce-slow': 'bounce 4s infinite',
        'bounce-reverse': 'bounce-reverse 4s reverse',
        'spin-fast': 'spin 0.4s linear infinite',
        'ping-once': 'ping 1s linear',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

- Notification animations: when a user has a pending 'Invite,' the icon in the navigation bar right to their name turns yellow and starts wiggling, asking the user for attention.
- Dropdown has an "Invites" menu item on top with jumping letters to get the user's attention to the Invites page after clicking "Invites" in the dropdown menu.

### Co-Ownership Invites
- Notification icon wiggles when a user is invited for co-ownership of a company.
- "Invites" menu item is dynamically added to the dropdown menu.
- The menu item jumps to draw attention to pending co-ownership invites.
- Users can accept or decline co-ownership invites.
- After accepting or declining all pending invites (so no pending invites are left), the user gets redirected to the /companies page where all companies are listed that the user now (co-)owns.
- Safety measures implemented to prevent users from being invited twice, ensuring a unique co-owner status and no duplicate ownership registrations.

## Pending Tasks
- Edit company professions feature is still pending.
- More components need to be added to Storybook.
- Ongoing work on writing tests for components.
- Editing company professions is still pending.
- After implementing professions in the Edit company page, the main search functionality will use professions as the second value to match on.

# Version v0.0.2 Release Notes

## Backend server CDN for static files
- The backend server now acts as a CDN for static files like images.
- The backend server serves static files from the /backend/public folder.
- This enables the frontend application to access images from the backend server without storing them in the frontend application.
- It also allows using the backend server as a CDN for other applications needing to access the images.

## File Upload
- Users can upload a profile picture.
- The profile picture is saved in the /backend/public/uploads/images folder.
- The image path is saved in the database.
- The backend server serves the image from the /backend/public folder.
- This enables the frontend application to access the image from the backend server, with the image path stored in the database.

## Version v0.0.1 Release Notes

### Registering an Account
- Users can easily create an account by visiting the homepage of the application.
- The registration process requires basic information such as email address, a secure password, and additional required details.
- Once registered, users gain access to the full suite of functionalities.

### Logging In
- Registered users can log in using their provided credentials.
- The login process is secure, ensuring only authorized users access their accounts.
- Upon login, a JWT token is generated and stored in the browser's local storage for authentication.

### Company Registration and Ownership
- Users can register a company upon logging in, automatically designating them as the owner.
- Ownership privileges grant full administrative control over the company's operations.
- Co-ownership functionality allows users to add co-owners to a company.

#### How to Register a Company
1. Log in to your account.
2. Navigate to Companies.
3. Click the plus icon to add a new company.
4. Fill in company details with the KVK-number and submit the registration form.
5. Upon successful registration and KVK API validation, the user becomes the owner with access to all administrative functionalities.

#### How to Add a Co-owner to a Company
1. Log in to your account.
2. Navigate to Companies.
3. Click the pencil icon to edit a company.
4. Search for a user by name, username, or email.
5. Click the add button to add the user as an owner to the company.
