# MERN_STACK_PROJ. :rocket:

- [MERN_STACK_PROJ. :rocket:](#mern_stack_proj-rocket)
- [Getting Started](#getting-started)
- [Application Description](#application-description)
- [Versions:](#versions)
  - [v0.0.2:](#v002)
    - [Backend server CDN for static files](#backend-server-cdn-for-static-files)
    - [File upload](#file-upload)
  - [v0.0.1:](#v001)
    - [Registering an Account](#registering-an-account)
    - [Logging In](#logging-in)
  - [Company Registration and Ownership](#company-registration-and-ownership)
    - [How to Register a Company:](#how-to-register-a-company)
    - [How to add a co-owner to a company:](#how-to-add-a-co-owner-to-a-company)
- [TODO and DONE:](#todo-and-done)
- [Technologies:](#technologies)
  - [Frontend](#frontend)
    - [React](#react)
    - [Redux](#redux)
    - [Vite.js:](#vitejs)
  - [Backend](#backend)
    - [Express.js](#expressjs)
      - [Efficient Routing](#efficient-routing)
      - [Middleware Support](#middleware-support)
      - [Streamlined Database Interactions](#streamlined-database-interactions)
      - [Asynchronous Request Handling](#asynchronous-request-handling)
      - [Cross-Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)
    - [MongoDB and Mongoose](#mongodb-and-mongoose)
      - [Many-to-Many Relationships](#many-to-many-relationships)
    - [Secure User Authentication with JWT](#secure-user-authentication-with-jwt)
      - [Stateless Nature](#stateless-nature)
      - [Data Integrity and Confidentiality](#data-integrity-and-confidentiality)
      - [Cross-Origin Resource Sharing (CORS) Support](#cross-origin-resource-sharing-cors-support)
      - [Granular Permissions](#granular-permissions)
      - [Easy Integration with Frontend Frameworks](#easy-integration-with-frontend-frameworks)
      - [Expiration and Refresh Tokens](#expiration-and-refresh-tokens)
      - [Conclusion](#conclusion)
- [Models:](#models)
  - [Company](#company)
    - [Fields:](#fields)
- [Routes:](#routes)
- [Testing:](#testing)
  - [Mocha and Chai](#mocha-and-chai)
  - [Postman](#postman)
- [Unfinished features (for future versions):](#unfinished-features-for-future-versions)
  - [User Privilege Management and Admin Authorization](#user-privilege-management-and-admin-authorization)

# Getting Started

To run this application locally, follow these steps:

0. **Create a free MongoDB database to connect with and obtain a MongoDB authentication URL.**

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:ThomPoppins/MERN_STACK_PROJ..git MERN_STACK_PROJ && cd MERN_STACK_PROJ
   ```

2. **Set Up Backend Configuration**:

   - Navigate to the `/backend` folder in your file explorer.
   - Create a `config.js` file.
   - Add the following constants and update them to your personal values:

     ```javascript
     // backend/config.js
     // port for the server to listen on
     export const PORT = 5555;

     // YOUR MongoDB database connection URL (if you want to test this application without creating your own database, contact me at thompoppins@gmail.com, I'll provide you with a database URL)
     export const mongoDBURL =
       "mongodb+srv://exampleuser:examplepasswork@example-mern-stack-project.xhvmidl.mongodb.net/?retryWrites=true&w=majority";

     // Secret key for JWT signing and encryption (just generate a random string or keep it like it is for testing purposes)
     export const JWT_SECRET = "yoursecretkey";

     // TEST API key for KVK API (also required)
     export const KVK_TEST_API_KEY = "l7xx1f2691f2520d487b902f4e0b57a0b197";

     // PROD API key for KVK API (also required)
     export const KVK_PROD_API_KEY = "";
     ```

3. **Set Up Frontend Configuration**:

   - Navigate to the `/frontend` folder.
   - Create a `config.js` file if it doesn't exist.
   - Add the following constant and export it:
     ```javascript
     // frontend/config.js
     export const BACKEND_URL = "http://localhost:5555";
     // Disable company validation by KVK API (If you want to test the KVK company validation, mail me at thompoppins@gmail.com for instructions how to set this up.)
     export const TEST_KVK_API = false;
     ```

4. **Install Dependencies**:

   - Inside the `/backend` folder, run:
     ```bash
     npm install
     ```
   - Inside the `/frontend` folder, run:
     ```bash
     npm install
     ```

5. **Start the Servers**:

   - Inside the `/backend` folder, run:
     ```bash
     npm run dev
     ```
   - In a separate terminal, inside the `/frontend` folder, run:
     ```bash
     npm run dev
     ```

6. **Access the Application**:
   - Visit the web application in your browser using the link printed by the Vite.js server after starting the frontend server.

Now you have the application up and running locally!

# Application Description

Welcome to my FullStack JavaScript application built with Express.js on the backend and React with Redux on the frontend. The final business model for this project remains a secret for now, but you can check out the features below to get an idea of what this application is all about.

# Versions:

## v0.0.2:

### Backend server CDN for static files

The backend server is now a CDN for static files like images. This means that the backend server will serve the static files from the `/backend/public` folder. This way, the frontend application can access the images from the backend server without having to store the images in the frontend application. This also makes it possible to use the backend server as a CDN for other applications that need to access the images.

### File upload

Users can now upload a profile picture. The profile picture will be saved in the `/backend/public/uploads/images` folder and the path to the image will be saved in the database. The backend server will serve the image from the `/backend/public` folder. This way, the frontend application can access the image from the backend server and the image path is stored in the database.

## v0.0.1:

### Registering an Account

Users can easily create an account by visiting the homepage of my application. The registration process is straightforward and requires users to provide basic information such as their email address, a secure password, and any additional required details. Once registered, users gain access to the full suite of functionalities offered by the application.

### Logging In

Registered users can log in to their accounts using their previously provided credentials. This allows them to access and utilize all features and services provided by the application. The login process is secure and ensures that only authorized users can access their accounts.

When you log in a JWT token is generated and stored in the browser's local storage. This token is used to authenticate the user and to make sure that the user is authorized to access the application. The token is also used to make sure that the user is authorized to access certain resources in the application. For example, the user can only access his own company resources and not the company resources of other users.

## Company Registration and Ownership

Upon logging in to their account, users have the capability to register a company that they own. This action automatically designates the user as the owner of the registered company, granting them administrative privileges within the application.

- **Ownership Privileges:** The user, upon registering a company, assumes the role of owner with full administrative control over the company's operations.

### How to Register a Company:

1. Log in to your account.
2. Navigate to Companies
3. Click the plus icon to add a new company.
4. Fill in company details with KVK-number and submit the registration form.

Upon successful registration and validation from the KVK API, the user will be recognized as the owner of the company and will have access to all administrative functionalities associated with it.

### How to add a co-owner to a company:

1. Log in to your account.
2. Navigate to Companies
3. Click the pencil icon to edit a company.
4. Search for a user by name, username or email.
5. Click the add button to add the user as a owner to the company.

# TODO and DONE:

> **NOTE:** This is a list of all the tasks that I am working on right now and also which I've completed so far. I've created Jira issues for them all and the corresponding Jira issue number is between [].

- [x] [MERNSTACK-103] Start using testing frameworks Mocha and Chai to write automated tests for the endpoints and ensure that the code is working correctly.
- [x] [MERNSTACK-74] Set up `Company` model.
- [x] [MERNSTACK-65] Create a route to save a new Company document in the database.
- [x] [MERNSTACK-95] Test companyRouter POST route `/` for saving a new company with Postman.
- [x] [MERNSTACK-66] Create a route to get all Company documents from the database.
- [x] [MERNSTACK-96] Test companyRouter GET route `/` for getting all companies with Postman.
- [x] [MERNSTACK-67] Create a route to get a single Company document from the database.
- [x] [MERNSTACK-97] Test companyRouter GET route `/:id` for getting a single company with Postman.
- [x] [MERNSTACK-68] Create a route to update a single Company document in the database.
- [x] [MERNSTACK-98] Test companyRouter PUT route `/:id` for updating a single company with Postman.
- [x] [MERNSTACK-69] Create a route to delete a single Company document from the database.
- [x] [MERNSTACK-99] Test companyRouter DELETE route `/:id` for deleting a single company with Postman.
- [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
- [x] [MERNSTACK-51] Create Jira tickets for all TODOs.
- [x] [MERNSTACK-53] Create GET, POST, PUT and DELETE Company server routes.
- [x] [MERNSTACK-55] Create User model.
- [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
- [x] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents. UPDATE: This is not needed because the Company schema will have an `owners` field that will be an array of owner objects with `userId` field.
- [x] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
- [x] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
- [x] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
- [x] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder) CANCELLED: For now it is easier to just add an `owner` field to the `Company` schema and model. This will allow to associate each Company document with company owners. No need for a `junction` table that will make it more complex without any use for it.
- [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
- [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers) CONSIDER: Saving users as customers to `company` model instead of creating a `junction` table. This will allow to associate each Company document with multiple User documents. No need for a `junction` table that will make it more complex without any use for it.
- [x] [MERNSTACK-144] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
- [x] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed. UPDATE: Route will be /companies for now.
- [x] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
- [ ] [MERNSTACK-145] Break down all ideas in the `Features:` section below into smaller tasks and create Jira tickets for them.
- [x] [MERNSTACK-102] Check for the word `property` when it should be `field` in the documentation of schemas and models. Check for the word `field` when it should be `property` in the documentation when talking about database `document`'s
- [x] [MERNSTACK-114] Use time-travel debugging with Redux DevTools.
- [x] [MERNSTACK-115] Decide the default destination after clicking the BackButton, something like the previous page or the home page.
- [x] [MERNSTACK-116] Create table on the frontend to display all companies.
- [x] [MERNSTACK-117] Create ShowCompany component to display a single company's details
- [x] [MERNSTACK-118] Create EditCompany component to edit a single company's details.
- [x] [MERNSTACK-119] Create DeleteCompany component to delete a single company.
- [x] [MERNSTACK-120] Create CreateCompany component to create a new company.
- [x] [MERNSTACK-121] Implement a button on the ShowCompany component that allows the user to navigate to the corresponding EditCompany page.
- [x] [MERNSTACK-123] Create a CompanyModal component that will show up on the CompaniesList page when the user clicks on the `eye` icon.
- [x] [MERNSTACK-122] Create CompaniesList page (where all companies for a user will be shown in `table` or `card` view.) and safe this `table`/`card` setting to Redux store state so user will return to listing page with preferred setting.
- [x] [MERNSTACK-124] Use useSnackbar() for displaying error or success messages to the user in the Company components.
- [x] [MERNSTACK-125] Inform myself better about using useEffect() to prevent infinite loop situations when my application get more complex. [Speech about using useEffect effectively](https://www.youtube.com/watch?v=eFGeStq8dZo&list=PLokIxGKSireSB4Gx6r7xWlFs9Q9PueDED&ab_channel=ReactConferencesbyGitNation)
- [x] [MERNSTACK-126] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (see frontend devdocs folder)
- [x] [MERNSTACK-138] Create user register page and functionality, save with bcrypt hashed password in database.
- [x] [MERNSTACK-139] Create a user login page and functionality, validate user password has with bcrypt and compare hashed password on login.
- [x] [MERNSTACK-140] Make it possible for a user to register a company and automatically become first company owner.
- [x] [MERNSTACK-141] Find fitting icons for company `name` `phone number` and `email` for the ListCompanies `card` view and CompaniesModal component. Find them in the react-icons library. DO THIS BEFORE CREATING ANY OTHER LIST COMPONENTS!
- [ ] [MERNSTACK-142] Update README.md with explanation about the validators I created in the frontend application. Explain the regex of every validator used to validate and the test method that returns true or false.
- [x] [MERNSTACK-143] Add explanation about the main advantages of using MongoDB and Mongoose in the README.md file in the Backend section.
- [x] [MERNSTACK-14] Create a new schema and model for user.
- [x] [MERNSTACK-162] Save userId as state in Redux store after verification of JWT token, make only /, /login and /register routes accessible for users that are not logged in.
- [x] [MERNSTACK-161] Fix CORS policy error when registering user
- [x] [MERNSTACK-155] Populate the user document with the properties from the request body if they exist when registering account.
- [x] [MERNSTACK-169] On all forms, validate user input when losing focus and display error message if input is not valid and the right format and color the input field border red.
- [x] [MERNSTACK-173] Finish EditCompany component, integrated with search functionality so users can be found by name, username or email and added to company as owner.
- [x] [MERNSTACK-175] Solve the problem of the owner being undefined
- [x] [MERNSTACK-181] Add remove button to remove owner from company in EditCompany component.
- [x] [MERNSTACK-176] Display owners first name and last name on `<ShowCompany />` `<CompanySingleCard />` and `<CompanyModal />`.
- [x] [MERNSTACK-177] Only find owners that are not already owners of the company in the EditCompany and UserSearch component.
- [x] [MERNSTACK-178] Send invitation to user to become owner of company.
- [x] [MERNSTACK-179] Display a "Invitation pending" or "Invited" message in de EditCompany page when user hasn't accepted the invitation to become owner of the company yet.
- [x] [MERNSTACK-180] Move save new company owner functionality to acceptBecomeCompanyOwnerInvitation() function in some new component.
- [x] [MERNSTACK-182] Save new owners of company after pressing save button in EditCompany component. CANCELLED: Now the owner can add owners in a different `form` in the EditCompany component without a save button so it is clear that a owner has been added without submitting the form.
- [x] [MERNSTACK-183] Remove "Remove" button from EditCompany component of the current logged in user.
- [x] [MERNSTACK-174] When the user selects a user to add as an owner to the company, update the owners state variable in the `<EditCompany />` component to include the selected user. You can use the setOwners() function to update the owners state variable.
- [x] [MERNSTACK-171] Display results in a list displaying the username, name and email
- [x] [MERNSTACK-170] Make API call to backend to find users by query on username, name or email, use useEffect to call this function when query changes
- [x] [MERNSTACK-168] Make possible for user (owner) to add other owners to the company by finding other users and adding them to the company
- [x] [MERNSTACK-17] "owners" array should contain owner objects with an userId.
- [x] [MERNSTACK-16] Owners will be linked to a company, based on an ownerId in the owner model. CANCELLED: Now the owner will be linked to a company, based on an userId corresponding to the user `_id` in the user model.
- [x] [MERNSTACK-184] Remove item from search results when added
- [x] [MERNSTACK-160] Display error message under the input field if the input is invalid explaining the right format on all forms
- [x] [MERNSTACK-159] Give input field of the form a red border if the input is invalid on all forms
- [x] [MERNSTACK-153] Check if the user already exists in the database in usersRoute.jsx when registering a new user. Hint: Use the findOne method and consider using `unique: true` in the user schema.
- [x] [MERNSTACK-154] If the user already exists, send status 409 response and a (error) message to inform the client.
- [x] [MERNSTACK-186] Check MongoDB discord server and Twitter for the BUG that users aren't filtered using the $nin operator
- [x] [MERNSTACK-188] Remove `No` field and add KVK number field in CompaniesTable component
- [x] [MERNSTACK-167] Add KVK number to the form in RegisterCompany and EditCompany components.
- [x] [MERNSTACK-191] Export working getKvkData function returning the KVK data in kvkController.js
- [x] [MERNSTACK-190] Make call to backend API to validate kvk number in kvkNumberValidator
- [x] [MERNSTACK-189] Add real kvk number validation with API call in kvkNumberValidator
- [x] [MERNSTACK-193] Fix BUG that you can save a company without kvk number validation in RegisterCompany.jsx and EditCompany.jsx SOLUTION: Throw an error in the kvkNumberValidator if the kvk number is not valid. Catch the error in the RegisterCompany and EditCompany components and display an error message to the user. If the KVK number is not valid, return from handleEditCompany() and handleSaveCompany() functions and don't save the company.
- [x] [MERNSTACK-110] Check if the company already exists in the database based on kvkNumber in companiesRoute.jsx. Hint: Use the findOne method and consider using `unique: true` in the company schema.
- [x] [MERNSTACK-111] If the company already exists, send status 409 response and a (error) message to inform the client in companiesRoute.jsx.
- [x] [MERNSTACK-146] Decide if the default values should be set in the model or in the route. Hint: Consider using the `default` property in the company schema. CONCLUSION: Set default values in the model.
- [x] [MERNSTACK-109] Populate the company document with the properties from the request body if they exist in companiesRoute.js.
- [x] [MERNSTACK-203] Make file upload possible as user profile image
- [ ] [MERNSTACK-] Make file upload possible as company logo
- [x] [MERNSTACK-206] Set up a profile picture upload for the user
- [x] [MERNSTACK-195] Define the invite model
- [x] [MERNSTACK-207] Save the profile picture Base64 string to the database
- [x] [MERNSTACK-208] Create default page layout that all pages will become children of
- [x] [MERNSTACK-210] Change text color to white when background image is set
- [x] [MERNSTACK-211] Add background color with opacity to all places where text is displayed on top of the background image.
- [ ] [MERNSTACK-212] Create account edit page for account settings/configurations.
- [x] [MERNSTACK-213] Complete styling on RegisterCompany page.
- [x] [MERNSTACK-166] Validate validity and uniqueness of company KVK number
- [x] [MERNSTACK-214] Style all form input fields
- [x] [MERNSTACK-216] Use Multer for large image file upload.
- [x] [MERNSTACK-217] Create a new routes file for file uploads. When the profile picture is uploaded, save the link/URL with the filepath in the database. ALSO return the path/fileId of the image as response to the client, so when the user registers the correct fileId/filepath will be saved to the new/edited user/company.
- [x] [MERNSTACK-218] Make /backend server a CDN for static files like images.
- [x] [MERNSTACK-202] FIX backend error: "PayloadTooLargeError: request entity too large" wanneer de afbeeldingdata te groot is voor ExpressJS (https://www.webslesson.info/2022/05/upload-file-in-node-js-express-using-multer.html) SOLVED using Multer for large image file uploads.
- [x] [MERNSTACK-165] Create a schema and model for images.
- [x] [MERNSTACK-219] Make first name and last name required on user registration. In the model, route, validator and frontend page form.
- [ ] [MERNSTACK-220] After registration, log user in automatically and redirect to /account/onboarding page.
- [x] [MERNSTACK-158] Display error message under the input field if the input is invalid explaining the right format in LoginUser, RegisterUser, RegisterCompany and EditCompany components.
- [x] [MERNSTACK-157] Give input field of the form a red border if the input is invalid in LoginUser, RegisterUser, RegisterCompany and EditCompany components.
- [x] [MERNSTACK-221] Log in when user has filled in his/her password and pressed enter.
- [x] [MERNSTACK-222] Use a placeholder image for the profile picture, specifically a man for male users and a woman for female users.
- [x] [MERNSTACK-223] Spin animation on Find button on homepage when the button is clicked.
- [x] [MERNSTACK-224] Update "Invite" status when user Accepts or Declines a Invite.
- [x] [MERNSTACK-225] If there is 1 or more pending invites, notify the user in the Navbar by making the "Invites" item bounce and give it a bright background color.
- [ ] [MERNSTACK-228] The "Find" on the homepage has to transition between color using "color transitions" from TailwindCSS.
- [x] [MERNSTACK-227] Dropdown menu items have to become clickable over the full width of the menu instead only the text and icon
- [ ] [MERNSTACK-229] Replace enqueueSnackbar() with toast() from react-toastify for better user experience.
- [ ] [MERNSTACK-230] README.md: Finish tutorial about asynchronious JavaScript: https://www.youtube.com/watch?v=ZYb_ZU8LNxs&ab_channel=freeCodeCamp.org
- [x] [MERNSTACK-131] Set state for all companies fields that can be edited in EditCompany.jsx and RegisterCompany.jsx

# Technologies:

## Frontend

On the frontend, I've chosen React for building user interfaces and Redux for state management. For those less familiar with these technologies, here's why implementing Redux in React is a game-changer:

### React

React is a popular JavaScript library for building user interfaces. It provides a declarative syntax for defining UI components, and uses a virtual DOM to efficiently update the UI in response to changes in state. Some of the main advantages of React include:

- **Declarative syntax:** React provides a simple and intuitive syntax for defining UI components, making it easy to reason about the structure and behavior of your application.

- **Efficient updates:** React uses a virtual DOM to efficiently update the UI in response to changes in state, minimizing the number of DOM manipulations required.

- **Component reusability:** React components are modular and reusable, making it easy to build complex UIs from simple building blocks.

- **Large ecosystem:** React has a large and active ecosystem of libraries and tools, making it easy to find solutions to common problems and integrate with other technologies.

### Redux

Redux is a state management library that is often used in conjunction with React. It provides a centralized store for managing application state, and uses a unidirectional data flow to ensure that state changes are predictable and easy to reason about. Some of the main advantages of using Redux with React include:

- **Centralized state management:** Redux provides a centralized store for managing application state, making it easy to manage and reason about complex state interactions.

- **Predictable state changes:** Redux uses a unidirectional data flow to ensure that state changes are predictable and easy to reason about, making it easier to debug and maintain your application.

- **Time-travel debugging:** Redux provides a powerful debugging tool called "time-travel debugging", which allows you to step through state changes and see how your application state evolves over time.

- **Ecosystem integration:** React and Redux have large and active ecosystems of libraries and tools, making it easy to integrate with other technologies and solve common problems.

### Vite.js:

The React frontend application was installed using Vite.js, a modern build tool that provides fast development server and efficient build process.

- **Faster development:** Vite.js provides a fast development server that supports near-instantaneous hot module replacement (HMR) for React components. This means that changes to your code are reflected in the browser almost immediately, without requiring a full page reload. This can speed up the development process and make it easier to iterate on code.

- **Efficient builds:** Vite.js uses a highly optimized build process that leverages the native ES modules support in modern browsers. This can result in faster build times and smaller bundle sizes compared to other build tools.

- **Modern web technologies:** Vite.js supports modern web technologies out of the box, including ES modules, TypeScript, and CSS modules. This makes it easy to build modern, high-performance web applications.

- **Plugin ecosystem:** Vite.js has a growing ecosystem of plugins that can be used to extend its functionality. This includes plugins for things like CSS preprocessing, image optimization, and more.

## Backend

In the backend, I've set up RESTful API endpoints to create, read, update, and delete documents from collections. These collections are defined and configured in the `/backend/models` folder, ensuring a structured and organized approach to data management.

### Express.js

#### Efficient Routing

Express.js provides a robust routing system, making it seamless to define endpoints for handling various HTTP methods like GET, POST, PUT, and DELETE. This helps in organizing the backend logic effectively, ensuring clean and maintainable code.

#### Middleware Support

Express.js offers a wide range of middleware options that can be easily integrated into the application's request-response cycle. This enables functionalities like request parsing, authentication, logging, and error handling, enhancing the security and performance of the backend.

#### Streamlined Database Interactions

When combined with database libraries like Mongoose (for MongoDB), Express.js simplifies the process of interacting with the database. This allows for smooth retrieval, creation, updating, and deletion of data, which is essential for building a robust API.

#### Asynchronous Request Handling

Express.js supports asynchronous programming paradigms, allowing for non-blocking I/O operations. This is crucial for handling multiple concurrent requests efficiently, ensuring optimal performance even under heavy loads.

#### Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) is a critical security feature that safeguards my application from unwanted sources attempting to access your resources. Express.js provides built-in support for CORS, making it easy to configure and enforce CORS policies. This helps in preventing malicious attacks like cross-site scripting (XSS) and cross-site request forgery (CSRF). It also helps in preventing unauthorized access to sensitive data.

Overall, Express.js provides a robust and secure foundation for building RESTful APIs.

### MongoDB and Mongoose

**MongoDB** is a popular NoSQL database that provides a flexible and scalable solution for storing and retrieving data. It uses a document-based data model, which means that data is stored in JSON-like documents instead of tables and rows. This makes it easy to store and retrieve complex data structures, and allows for more flexible data modeling compared to traditional relational databases.

**Mongoose** is a popular Node.js library that provides a convenient and flexible way to interact with MongoDB. It provides a schema-based approach to defining and creating models, which makes it easier to validate and enforce data consistency. It also provides a wide range of data types and validators, making it easy to ensure that my data is stored correctly and consistently.

**Mongoose** also provides a built-in query builder that allows you to construct complex queries using a fluent API. This makes it easy to build queries that are easy to read and understand, and can be easily modified and reused.

**Mongoose** also provides a middleware system that allows you to add custom behavior to your models. This includes things like pre- and post-save hooks, virtual properties, and more. This makes it easy to add custom behavior to your models without having to modify the underlying schema.

Overall, **Mongoose** provides a convenient and flexible way to interact with **MongoDB**, and it is widely used in the Node.js community for this purpose.

#### Many-to-Many Relationships

One interesting aspect of this project is handling many-to-many relationships between companies and projects. In real-world scenarios, companies often take part in multiple projects, and a single project can involve multiple companies. To achieve this, I'll be using a `junction` collection in MongoDB.

The main advantage of using a `junction` collection is that it simplifies the management of these relationships. For instance, consider a scenario where Company A and Company B collaborate on Project X. Instead of duplicating data or creating complex nested structures, the `junction` collection allows us to create a clear and efficient link between Company A, Company B, and Project X. This makes it easy to track participation and configure revenue sharing settings dynamically when all parties agree.

### Secure User Authentication with JWT

In this repository, I implement secure user authentication using JSON Web Tokens (JWT). This approach offers several advantages over traditional session-based authentication methods. Below are key reasons why JWT-based authentication is a safe and effective choice:

#### Stateless Nature

JWTs are stateless, meaning they do not require server-side storage of session data. This eliminates the need for server-side sessions or database queries to validate user authenticity. Instead, the server can validate the token by checking its signature and expiration date, resulting in improved scalability and reduced server load.

#### Data Integrity and Confidentiality

JWTs are digitally signed using a secret key known only to the server. This signature ensures that the token's content has not been tampered with during transmission. Additionally, sensitive information can be encrypted within the token, providing an extra layer of security.

#### Cross-Origin Resource Sharing (CORS) Support

JWTs can be easily integrated with Cross-Origin Resource Sharing (CORS) policies. This allows for secure communication between the client and server even when they reside on different domains, without compromising security.

#### Granular Permissions

JWTs can include custom claims, allowing for fine-grained control over user permissions. This means you can specify which resources or actions a user is allowed to access, providing a robust authorization mechanism.

#### Easy Integration with Frontend Frameworks

JWTs can be conveniently stored on the client side, typically in browser cookies or local storage. This facilitates seamless integration with frontend frameworks and libraries (like React), enabling a smooth user experience.

#### Expiration and Refresh Tokens

JWTs can be configured with expiration times, reducing the window of opportunity for potential attackers. Additionally, you can implement refresh tokens to obtain new JWTs without requiring users to re-enter their credentials.

#### Conclusion

By implementing user authentication with JWTs, this repository ensures a robust and secure authentication mechanism. The stateless nature, data integrity, and ease of integration make JWTs an excellent choice for validating user authenticity. With careful implementation and adherence to best practices, this approach provides a reliable foundation for secure user authentication in my application.

# Models:

Mongoose schema and model provide a convenient and flexible way to define and create models in MongoDB. This makes it easy to validate and enforce data consistency.

It also provides a wide range of data types and validators, making it easy to ensure that my data is stored correctly and consistently.

### Company

The `Company` model represents a business entity in the application.

#### Fields:

- **name** (String)

  - Description: The name of the company.
  - Required: Yes

- **email** (String)

  - Description: The email address for correspondence directed to the company.
  - Required: No

- **phone** (String)

  - Description: The phone number of the company.
  - Required: No

- **slogan** (String)

  - Description: The slogan or motto of the company.
  - Required: No

- **description** (String)

  - Description: A short description of the company.
  - Required: No

- **address** (Object)

  - Description: The registered address of the company.
  - Fields:
    - street (String)
    - number (String)
    - postalCode (String)
    - city (String)
    - country (String)
  - Required: No

- **billingAddress** (Object)

  - Description: The address to send invoices to.
  - Fields:
    - street (String)
    - number (String)
    - postalCode (String)
    - city (String)
    - country (String)
  - Required: No

- **addressFormat** (Object)

  - Description: Format for the address in the correct way for the country and regional address format.
  - Fields:
    - country (String)
    - region (String)
  - Required: No

- **country** (String)

  - Description: Country of the company billing address.
  - Required: No

- **region** (String)

  - Description: Region of the company billing address.
  - Required: No

- **owners** (Array)

  - Description: Array of owner objects with userId.
  - Required: No

- **companyAdmins** (Array)

  - Description: Array of admin objects with adminUserId and role.
  - Required: No

- **locations** (Array)

  - Description: Array of address objects with addressId compatible with configured addressFormat for country and region.
  - Required: No

- **departments** (Array)

  - Description: Array of department objects with departmentId.
  - Required: No

- **businessConfig** (Object)

  - Description: Configurable settings that company owners and admins can change.
  - Required: No

- **paymentDetails** (Object)

  - Description: Payment details for specific country or region.
  - Required: No

- **startYear** (Number)

  - Description: The year the company was started.
  - Required: No

- **active** (Boolean)

  - Description: Indicates if the company is currently active.
  - Required: No

- **industry** (String)

  - Description: The industry or sector in which the company operates.
  - Required: No

- **public** (Boolean)

  - Description: Indicates if the company is public or private.
  - Required: No

- **reviews** (Array)

  - Description: Array of review objects with reviewId, text, rating, reviewer, timestamp, etc.
  - Required: No

- **rating** (Number)

  - Description: The overall rating of the company.
  - Required: No

- **customers** (Array)

  - Description: Array of customer objects with customerId.
  - Required: No

- **premium** (String)

  - Description: The type of premium membership ("none", "bronze", "silver", "gold", "platinum").
  - Required: No

- **vendor** (Object)

  - Description: Information about whether the company is a vendor.
  - Fields:
    - vendorId (String)
  - Required: No

- **employees** (Array)

  - Description: Array of employee objects with employeeId.
  - Required: No

- **stories** (Array)

  - Description: Array of story objects.
  - Required: No

- **products** (Array)

  - Description: Array of product objects with productId.
  - Required: No

- **services** (Array)

  - Description: Array of service objects with serviceId.
  - Required: No

- **appointments** (Array)

  - Description: Array of appointment objects.
  - Required: No

- **messages** (Array)

  - Description: Array of message objects with messageId, corresponding userId, timestamp, etc.
  - Required: No

- **notifications** (Array)

  - Description: Array of notification objects.
  - Required: No

- **events** (Array)

  - Description: Array of event objects with eventId.
  - Required: No

- **agenda** (Array)

  - Description: Array of agenda objects with agendaId.
  - Required: No

- **tasks** (Array)

  - Description: Array of task objects with taskId.
  - Required: No

- **invoices** (Array)

  - Description: Array of invoice objects with invoiceId.
  - Required: No

- **orders** (Array)

  - Description: Array of order objects with orderId.
  - Required: No

- **payments** (Array)
  - Description: Array of payment objects with paymentId.
  - Required: No

# Routes:

# Testing:

## Mocha and Chai

Mocha and Chai are popular testing frameworks for Node.js applications, and they provide several advantages for testing Express.js API endpoints:

- **Easy to use**: Mocha and Chai are easy to set up and use, and they provide a simple and intuitive syntax for writing tests.

- **Flexible**: Mocha and Chai are highly flexible and can be used to test a wide range of scenarios, from simple unit tests to complex integration tests.

- **Modular**: Mocha and Chai are modular and can be easily extended with plugins and custom assertions, making it easy to add new functionality to your tests.

- **Readable**: Mocha and Chai provide a readable and expressive syntax for writing tests, which makes it easy to understand what each test is doing and why.

- **Integration with Express.js**: Mocha and Chai integrate seamlessly with Express.js, making it easy to test my API endpoints and ensure that they are working correctly.

- **Asynchronous support**: Mocha and Chai provide built-in support for testing asynchronous code, which is essential for testing Express.js API endpoints that rely on callbacks or promises.

- **Assertions**: Chai provides a wide range of built-in assertions and supports custom assertions, which makes it easy to write tests that check for specific conditions and behaviors. (Assertions are statements that check whether a certain condition is true or false. In the context of testing with Mocha and Chai, assertions are used to verify that the code being tested is behaving as expected.)

Overall, Mocha and Chai provide a powerful and flexible testing framework for testing Express.js API endpoints, and they are widely used in the Node.js community for this purpose.

## Postman

Postman is a popular tool for testing and debugging APIs, and it provides several advantages for developers:

**Easy to use**: Postman is easy to set up and use, and it provides a simple and intuitive interface for sending requests and viewing responses.

**Flexible**: Postman is highly flexible and can be used to test a wide range of scenarios, from simple GET requests to complex workflows involving multiple requests and responses.

**Collaboration**: Postman provides collaboration features that make it easy to share collections of requests and responses with other developers, making it easier to work together on API development.

**Automation**: Postman provides automation features that allow developers to create and run tests automatically, making it easier to catch bugs and ensure that the API is working correctly.

**Environment variables**: Postman allows developers to define environment variables that can be used to store and reuse values across requests, making it easier to manage complex workflows and avoid repetition.

**Documentation**: Postman provides tools for generating documentation for APIs, making it easier to share information about the API with other developers and stakeholders.

Overall, Postman provides a powerful and flexible toolset for testing and debugging APIs, and it is widely used in the development community for this purpose.

# Unfinished features (for future versions):

## User Privilege Management and Admin Authorization

My application offers robust user privilege management with a seamless admin authorization process to enhance security and control within your company. Here's a detailed breakdown of this functionality:

1. **User Registration and Company Ownership:**

   - Upon registration, users can become owners of their respective companies, granting them enhanced control over their account settings.

2. **Admin Rights Management:**

   - Within their account settings, owners will find an "Admin Rights" setting that is initially disabled by default. This setting allows them to perform actions that require admin authorization.

3. **Enabling Admin Rights:**

   - When the owner wishes to execute actions that require admin privileges, they can easily enable the "Admin Rights" setting.

4. **Automatic Disabling:**

   - To maintain security and compliance, if the owner does not execute admin actions for a certain period, the system will automatically disable admin rights. Users will receive a notification when this happens.

5. **Warning and Confirmation:**

   - When the owner attempts an action with significant administrative impact, the frontend will proactively warn them about the potential consequences. This includes prompting for confirmation before proceeding.

6. **Streamlined Admin Deactivation:**

   - After successfully executing an admin-authorized action, the system will provide an immediate option to disable admin rights with a simple switch-off button directly in the prompt. This user-centric approach ensures a hassle-free and secure experience.

7. **Continue Button:**
   - For added convenience, users can also choose to close the prompt by clicking the "Continue" button. This button will be color-coded, red when admin rights are enabled and green when disabled, making it easy for users to discern their current status at a glance.

My application prioritizes both security and user-friendliness, empowering company owners to efficiently manage their admin privileges while maintaining a high level of control and awareness.

**_Feel free to clone this repository to see these concepts in action and dive into [my code](https://github.com/ThomPoppins/MERN_STACK_PROJ.)!_**
