---
'starter-vite-react': patch
---

# Version v0.0.3 Release Notes

## New Features

### Basic Search Functionality
- Users can now search for companies by name.

![Search Field](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/dev/screenshots/lifeguard001-search-for-lifeguard.png?raw=true)

- Search results are listed in a grid with company images.

![Search Results Grid](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/dev/screenshots/lifeguard002-search-results.png?raw=true)

- Clicking on a company navigates the user to the company details page (Company Profile).
- If the current logged in user is a member (owner, employee, admin etc.) of the company, private details will be shown on the company profile page.

**Private details hidden, user not member of this company:**
![Company Private Details Hidden](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/dev/screenshots/lifeguard003-company-profile-details-with-private-details-hidden-for-general-user-who-is-not-member-of-company.png?raw=true)

**Current user is member (owner) of this company, private details revealed:**
![Company Private Details Revealed](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/dev/screenshots/lifeguard004-private-details-show-because-logged-in-user-is-member.png?raw=true)




### Image Cropping
- Users can upload an image and crop it via drag-n-drop or file selection.
- Preview canvas shows the user how the crop will be in a round circled shape.
- The cropped image is displayed as the default profile picture.
- After cropping, users can download the cropped file.
- Cropped base64 binary images are converted into BLOB and uploaded to the Express.js server as a png file.
- Images are served as static files by the /backend Express.js server, acting as an images/files CDN for the frontend application.

### Company Logo Cropping
- Implemented image crop functionality for company logos in the register and edit company pages.
- Company logos are displayed in a circle-shaped frame throughout the application.
- When cropping the logo image, companies can see how the logo will look within the circle-shaped border.

### Professions in Company Profile
- Added a new field to the company model for professions.
- Companies can add professions to their profiles during registration.

### Storybook Integration
- Installed Storybook for component development.
- Added a few initial components to Storybook.

### Testing
- Jest and React-Testing-Library installed and functional.
- Ongoing work on writing tests for almost every component.

### Animations
- Added subtle animations for a more interactive user experience.
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
