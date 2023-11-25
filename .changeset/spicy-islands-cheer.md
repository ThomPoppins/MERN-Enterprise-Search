---
'MERN-STACK-PROJ.': patch
---

# Version v0.0.3 Release Notes

## New Features

### Basic Search Functionality

- Users can now search for companies by name.
- Search results are listed in a grid with company images.
- Clicking on a company navigates the user to the company details page (Company Profile).

### Image Cropping

- Users can upload an image and crop it via drag-n-drop or file selection.
- Preview canvas shows the user how the crop will be in a round circled shape.
- The cropped image is displayed as the default profile picture.
- After cropping, users can download the cropped file.
- Cropped base64 binary images are converted into BLOB and uploaded to the Express.js server as `png` file.
- Images are served as static files by /backend Express.js server and it acts as a images/files CDN for the frontend application.

### Company Logo Cropping

- Implemented image crop functionality for company logos in the register and edit company pages.
- Company logos are displayed in a circle-shaped <img/> frame throughout the application, when cropping the logo image, companies can see how the logo will look within the circle shaped border.

### Professions in Company Profile

- Added a new field to the company model for professions.
- Companies can add professions to their profiles during registration.

### Storybook Integration

- Installed Storybook for component development.
- Added a few initial components to Storybook.

### Testing

- Jest and React-Testing-Library installed and functional.

### Animations

- Added subtle animations for a more interactive user experience. Notification animations, when user has a pending 'Invite' the icon in the navigation bar right to their name turns yellow and starts wiggeling, asking the user for attention. Dropdown has a `Invites` menu item on top with jumping letters to get the user attention to the `Invites` page after clicking `Invites` in the dropdown menu.

### Co-Ownership Invites

- Notification icon wiggles when a user is invited for co-ownership of a company.
- "Invites" menu item is dynamically added to the dropdown menu.
- The menu item jumps to draw attention to pending co-ownership invites.
- Users can accept or decline co-ownership invites.
- After accepting or declining all pending invites (so no pending invites are left), user gets redirected to /companies page where all companies are listed that the user now (co-)owns.
- Safety measures implemented that prevents users from being invited twice, ensuring a unique co-owner status and no duplicate ownership registrations.

### ES Lint and Prettier configuration

- Configured ES Lint and Prettier now optimal for my wished code style wise.

## Pending Tasks

- Edit company professions feature is still pending.
- More components need to be added to Storybook.
- Ongoing work on writing tests for components.
- Work in progress on writing tests with Jest and react-test-library
- Editing company professions is still pending.
- After implementing professions in Edit company page, main search functionality will use professions as second value to match on.

### Version v0.0.2 Release Notes

### Backend server CDN for static files

The backend server is now a CDN for static files like images. This means that the backend server will serve the static files from the `/backend/public` folder. This way, the frontend application can access the images from the backend server without having to store the images in the frontend application. This also makes it possible to use the backend server as a CDN for other applications that need to access the images.

### File upload

Users can now upload a profile picture. The profile picture will be saved in the `/backend/public/uploads/images` folder and the path to the image will be saved in the database. The backend server will serve the image from the `/backend/public` folder. This way, the frontend application can access the image from the backend server and the image path is stored in the database.

![Upload Profile Picture Modal Image Unselected](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/003.png?raw=true)

![Upload Profile Picture Modal Image Selected](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/004.png?raw=true)

![Profile Picture Uploaded](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/005.png?raw=true)

### Version v0.0.1 Release Notes

### Registering an Account

Users can easily create an account by visiting the homepage of my application. The registration process is straightforward and requires users to provide basic information such as their email address, a secure password, and any additional required details. Once registered, users gain access to the full suite of functionalities offered by the application.

### Logging In

Registered users can log in to their accounts using their previously provided credentials. This allows them to access and utilize all features and services provided by the application. The login process is secure and ensures that only authorized users can access their accounts.

When you log in a JWT token is generated and stored in the browser's local storage. This token is used to authenticate the user and to make sure that the user is authorized to access the application. The token is also used to make sure that the user is authorized to access certain resources in the application. For example, the user can only access his own company resources and not the company resources of other users.

## Company Registration and Ownership

Upon logging in to their account, users have the capability to register a company that they own. This action automatically designates the user as the owner of the registered company, granting them administrative privileges within the application.

- **Ownership Privileges:** The user, upon registering a company, assumes the role of owner with full administrative control over the company's operations.

### How to Register a Company

1. Log in to your account.
2. Navigate to Companies
3. Click the plus icon to add a new company.
4. Fill in company details with KVK-number and submit the registration form.

Upon successful registration and validation from the KVK API, the user will be recognized as the owner of the company and will have access to all administrative functionalities associated with it.

### How to add a co-owner to a company

1. Log in to your account.
2. Navigate to Companies
3. Click the pencil icon to edit a company.
4. Search for a user by name, username or email.
5. Click the add button to add the user as a owner to the company.
