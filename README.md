# MERN_STACK_PROJ. :rocket:

- [MERN\_STACK\_PROJ. :rocket:](#mern_stack_proj-rocket)
- [Getting Started](#getting-started)
- [Application Description](#application-description)
  - [Frontend](#frontend)
    - [React](#react)
    - [Redux](#redux)
    - [react-redux](#react-redux)
    - [Vite.js:](#vitejs)
  - [Backend](#backend)
    - [Express.js (using CORS)](#expressjs-using-cors)
      - [Efficient Routing](#efficient-routing)
      - [Middleware Support](#middleware-support)
      - [Streamlined Database Interactions](#streamlined-database-interactions)
      - [Asynchronous Request Handling](#asynchronous-request-handling)
      - [Benefits of Using CORS](#benefits-of-using-cors)
      - [Controlled Resource Access](#controlled-resource-access)
      - [Protection Against Cross-Site Request Forgery (CSRF)](#protection-against-cross-site-request-forgery-csrf)
      - [Enhanced Security Compliance](#enhanced-security-compliance)
      - [Seamless Integration with Frontend Applications](#seamless-integration-with-frontend-applications)
    - [MongoDB and Mongoose](#mongodb-and-mongoose)
      - [Many-to-Many Relationships](#many-to-many-relationships)
- [Features:](#features)
  - [User Account Management](#user-account-management)
    - [Registering an Account](#registering-an-account)
    - [Logging In](#logging-in)
  - [Company Registration and Ownership](#company-registration-and-ownership)
    - [Key Features:](#key-features)
    - [How to Register a Company:](#how-to-register-a-company)
  - [User Privilege Management and Admin Authorization](#user-privilege-management-and-admin-authorization)
- [Models:](#models)
    - [Company](#company)
      - [Fields:](#fields)
- [Routes:](#routes)
- [Testing:](#testing)
  - [Mocha and Chai](#mocha-and-chai)
  - [Postman](#postman)
- [TODO:](#todo)
- [Everything else:](#everything-else)


# Getting Started

To run this application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:ThomPoppins/MERN_STACK_PROJ..git
   ```

2. **Set Up Backend Configuration**:
   - Navigate to the `/backend` folder.
   - Create a `config.js` file if it doesn't exist.
   - Add the following constants and export them:
     ```javascript
     // backend/config.js
     // port for the server to listen on
     export const PORT = 5555;
     // MongoDB database connection URL
     export const mongoDBURL = 'YourMongoDBDatabaseConnectionURLWithUsernamePasswordAuthenticationHere';
     // Secret key for JWT signing and encryption
     export const JWT_SECRET = "yoursecretkey";
     ```

3. **Set Up Frontend Configuration**:
   - Navigate to the `/frontend` folder.
   - Create a `config.js` file if it doesn't exist.
   - Add the following constant and export it:
     ```javascript
     // frontend/config.js
     export const BACKEND_URL = 'http://localhost:5555';
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

Welcome to my FullStack JavaScript application built with Express.js on the backend and React with Redux on the frontend. This application leverages the power of Axios for seamless communication between the two layers. MongoDB serves as the database, and Mongoose is our trusted tool for connecting and interacting with it.

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

### react-redux

The `react-redux` library is a popular library that makes it easy to implement Redux in a JavaScript React application. It provides a set of bindings between React and Redux, allowing you to easily connect your React components to the Redux store and dispatch actions.

**Combining state management by React and Redux:** When using both useState() and Redux together, I can use useState() to manage local component state and Redux to manage global application state. This allows me to keep my state management organized and scalable, while still providing a simple and lightweight way to manage local state within individual components.

For example, I use useState() to manage the state of a form within a component, while using Redux to manage the state of the user's authentication status across the entire application. By combining useState() and Redux, I can create a flexible and scalable state management system that meets the needs of my application.

### Vite.js:

The React frontend application was installed using Vite.js, a modern build tool that provides fast development server and efficient build process.

- **Faster development:** Vite.js provides a fast development server that supports near-instantaneous hot module replacement (HMR) for React components. This means that changes to your code are reflected in the browser almost immediately, without requiring a full page reload. This can speed up the development process and make it easier to iterate on code.

- **Efficient builds:** Vite.js uses a highly optimized build process that leverages the native ES modules support in modern browsers. This can result in faster build times and smaller bundle sizes compared to other build tools.

- **Modern web technologies:** Vite.js supports modern web technologies out of the box, including ES modules, TypeScript, and CSS modules. This makes it easy to build modern, high-performance web applications.

- **Plugin ecosystem:** Vite.js has a growing ecosystem of plugins that can be used to extend its functionality. This includes plugins for things like CSS preprocessing, image optimization, and more.

Overall, using Vite.js to install a React project can help you build faster, more efficient, and more modern web applications.

## Backend

In the backend, I've set up RESTful API endpoints to create, read, update, and delete documents from collections. These collections are defined and configured in the `/backend/models` folder, ensuring a structured and organized approach to data management.

### Express.js (using CORS)

#### Efficient Routing

Express.js provides a robust routing system, making it seamless to define endpoints for handling various HTTP methods like GET, POST, PUT, and DELETE. This helps in organizing the backend logic effectively, ensuring clean and maintainable code.

#### Middleware Support

Express.js offers a wide range of middleware options that can be easily integrated into the application's request-response cycle. This enables functionalities like request parsing, authentication, logging, and error handling, enhancing the security and performance of the backend.

#### Streamlined Database Interactions

When combined with database libraries like Mongoose (for MongoDB), Express.js simplifies the process of interacting with the database. This allows for smooth retrieval, creation, updating, and deletion of data, which is essential for building a robust API.

#### Asynchronous Request Handling

Express.js supports asynchronous programming paradigms, allowing for non-blocking I/O operations. This is crucial for handling multiple concurrent requests efficiently, ensuring optimal performance even under heavy loads.

#### Benefits of Using CORS

Cross-Origin Resource Sharing (CORS) is a critical security feature that safeguards my application from unwanted sources attempting to access your resources. Here's how CORS protection enhances your application:

#### Controlled Resource Access

CORS enables me to define a whitelist of allowed domains that can access your API. This ensures that only trusted sources can make requests to your backend, mitigating potential security risks.

#### Protection Against Cross-Site Request Forgery (CSRF)

By restricting requests to specific origins, CORS helps prevent CSRF attacks, where malicious websites attempt to make unauthorized requests on behalf of authenticated users.

#### Enhanced Security Compliance

Many modern browsers enforce CORS policies, making it a standard security measure. Implementing CORS in your backend application ensures compliance with web security best practices.

#### Seamless Integration with Frontend Applications

CORS headers can be configured to allow requests from specific domains, making it easy to integrate your backend with various frontend frameworks or applications hosted on different domains.


### MongoDB and Mongoose

**MongoDB** is a popular NoSQL database that provides a flexible and scalable solution for storing and retrieving data. It uses a document-based data model, which means that data is stored in JSON-like documents instead of tables and rows. This makes it easy to store and retrieve complex data structures, and allows for more flexible data modeling compared to traditional relational databases.

**Mongoose** is a popular Node.js library that provides a convenient and flexible way to interact with MongoDB. It provides a schema-based approach to defining and creating models, which makes it easier to validate and enforce data consistency. It also provides a wide range of data types and validators, making it easy to ensure that my data is stored correctly and consistently.

**Mongoose** also provides a built-in query builder that allows you to construct complex queries using a fluent API. This makes it easy to build queries that are easy to read and understand, and can be easily modified and reused.

**Mongoose** also provides a middleware system that allows you to add custom behavior to your models. This includes things like pre- and post-save hooks, virtual properties, and more. This makes it easy to add custom behavior to your models without having to modify the underlying schema.

Overall, **Mongoose** provides a convenient and flexible way to interact with **MongoDB**, and it is widely used in the Node.js community for this purpose.


#### Many-to-Many Relationships

One interesting aspect of this project is handling many-to-many relationships between companies and projects. In real-world scenarios, companies often take part in multiple projects, and a single project can involve multiple companies. To achieve this, I'll be using a `junction` collection in MongoDB.

The main advantage of using a `junction` collection is that it simplifies the management of these relationships. For instance, consider a scenario where Company A and Company B collaborate on Project X. Instead of duplicating data or creating complex nested structures, the `junction` collection allows us to create a clear and efficient link between Company A, Company B, and Project X. This makes it easy to track participation and configure revenue sharing settings dynamically when all parties agree.


# Features:

## User Account Management

### Registering an Account

Users can easily create an account by visiting the homepage of our application. The registration process is straightforward and requires users to provide basic information such as their email address, a secure password, and any additional required details. Once registered, users gain access to the full suite of functionalities offered by the application.

### Logging In

Registered users can log in to their accounts using their previously provided credentials. This allows them to access and utilize all features and services provided by the application. The login process is secure and ensures that only authorized users can access their accounts.

## Company Registration and Ownership

Upon logging in to their account, users have the capability to register a company that they own. This action automatically designates the user as the owner of the registered company, granting them administrative privileges within the application.

### Key Features:

- **Ownership Privileges:** The user, upon registering a company, assumes the role of owner with full administrative control over the company's operations.

### How to Register a Company:

1. Log in to your account.
2. Navigate to the company registration section within the application.
3. Provide the necessary details for company registration, including but not limited to company name, industry, and relevant contact information.
4. Submit the registration form.

Upon successful registration, the user will be recognized as the owner of the company and will have access to all administrative functionalities associated with it.


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



***Feel free to clone this repository to see these concepts in action and dive into [my code](https://github.com/ThomPoppins/MERN_STACK_PROJ.)!***

# Models:

Mongoose schema and model provide a convenient and flexible way to define and create models in MongoDB. By using Mongoose, developers can:

- Define the structure of their data using a schema, which makes it easier to validate and enforce data consistency.
- Use a wide range of data types and validators to ensure that their data is stored correctly and consistently.
- Create reusable models that can be used across multiple parts of their application, reducing code duplication and improving maintainability.
- Use Mongoose's built-in methods to interact with the database, making it easier to perform common operations like creating, reading, updating, and deleting documents.
- Take advantage of Mongoose's middleware system to add custom behavior to their models, such as pre- and post-save hooks, virtual properties, and more.
- Use Mongoose's query builder to construct complex queries that can be easily modified and reused.
- Benefit from Mongoose's integration with other Node.js libraries and frameworks, such as Express, which makes it easier to build scalable and maintainable applications.

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

**Express.js** is a popular Node.js framework that provides a simple and flexible way to create REST API endpoints. By using Express.js, I can:

- Easily create HTTP endpoints for handling GET, POST, PUT, and DELETE requests.
- Use middleware to add custom behavior to my endpoints, such as authentication, logging, and error handling.
- Take advantage of Express.js's routing system to organize my endpoints into logical groups and make my code more modular and maintainable.
- Use a wide range of third-party middleware and plugins to add additional functionality to my endpoints, such as compression, caching, and rate limiting.
- Use Express.js's built-in support for JSON and URL-encoded data to easily handle incoming request data and send responses in the desired format.
- Use Express.js's support for templating engines to generate dynamic HTML pages and other types of content.
- Benefit from Express.js's integration with other Node.js libraries, such as Mongoose, which makes it easier to build scalable and maintainable applications.
- Take advantage of Express.js's support for testing frameworks like Mocha and Chai to write automated tests for their endpoints and ensure that my code is working correctly.

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

# TODO:

> **Note**: All TODO's are linked to Jira tickets, so that I can keep track of everything I have to do.

- [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
- [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
- [x] Finish basic Book schema and model. For faster functional development and testing purposes.
- [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
- [x] [MERNSTACK-103] Start using testing frameworks Mocha and Chai to write automated tests for the endpoints and ensure that the code is working correctly.
- [x] [MERNSTACK-74] Set up `Company` model.
- [x] [MERNSTACK-65] Create a route to save a new Company document in the database.
- [x] [MERNSTACK-95] Test companyRouter POST route `/` for saving a new company with Postman.
- [ ] [MERNSTACK-103] Test companyRouter POST route `/` for saving a new company with Chai and Mocha.
- [x] [MERNSTACK-66] Create a route to get all Company documents from the database.
- [x] [MERNSTACK-96] Test companyRouter GET route `/` for getting all companies with Postman.
- [ ] [MERNSTACK-104] Test companyRouter GET route `/` for getting all companies with Chai and Mocha.
- [x] [MERNSTACK-67] Create a route to get a single Company document from the database.
- [x] [MERNSTACK-97] Test companyRouter GET route `/:id` for getting a single company with Postman.
- [ ] [MERNSTACK-105] Test companyRouter GET route `/:id` for getting a single company with Chai and Mocha.
- [x] [MERNSTACK-68] Create a route to update a single Company document in the database.
- [x] [MERNSTACK-98] Test companyRouter PUT route `/:id` for updating a single company with Postman.
- [ ] [MERNSTACK-106] Test companyRouter PUT route `/:id` for updating a single company with Chai and Mocha.
- [x] [MERNSTACK-69] Create a route to delete a single Company document from the database.
- [ ] [MERNSTACK-99] Test companyRouter DELETE route `/:id` for deleting a single company with Postman.
- [ ] [MERNSTACK-107] Test companyRouter DELETE route `/:id` for deleting a single company with Chai and Mocha.
- [x] Actualize, complete and correct Company scheme documentation.
- [x] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
- [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
- [x] [MERNSTACK-51] Create Jira tickets for all TODOs.
- [x] [MERNSTACK-53] Create GET, POST, PUT and DELETE Company server routes.
- [ ] [MERNSTACK-55] Create User model.
- [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
- [ ] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents.
- [x] Create React app using Vite.js.
- [x] Move Vite.js documentation from backend devdocs folder to frontend devdocs folder
- [ ] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
- [ ] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
- [ ] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
- [ ] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder)
- [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
- [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers)
- [ ] [MERNSTACK-144] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
- [ ] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed.
- [x] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
- [ ] [MERNSTACK-145] Break down all ideas in the `Features:` section below into smaller tasks and create Jira tickets for them.
- [ ] [MERNSTACK-102] Check for the word `property` when it should be `field` in the documentation of schemas and models. Check for the word `field` when it should be `property` in the documentation when talking about database `document`'s
- [ ] [MERNSTACK-114] Implement time-travel debugging with Redux DevTools.
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
- [ ] [MERNSTACK-125] Inform myself better about using useEffect() to prevent infinite loop situations when my application get more complex. [Speech about using useEffect effectively](https://www.youtube.com/watch?v=eFGeStq8dZo&list=PLokIxGKSireSB4Gx6r7xWlFs9Q9PueDED&ab_channel=ReactConferencesbyGitNation )
- [x] [MERNSTACK-126] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (see frontend devdocs folder)
- [ ] [MERNSTACK-138] Create user register page and functionality, save with bcrypt hashed password in database.
- [ ] [MERNSTACK-139] Create a user login page and functionality, validate user password has with bcrypt and compare hashed password on login.
- [ ] [MERNSTACK-140] Make it possible for a user to register a company and automatically become first company owner.
- [x] [MERNSTACK-141]  Find fitting icons for company `name` `phone number` and `email` for the ListCompanies `card` view and CompaniesModal component. Find them in the react-icons library. DO THIS BEFORE CREATING ANY OTHER LIST COMPONENTS!
- [ ] [MERNSTACK-142] Update README.md with explanation about the validators I created in the frontend application. Explain the regex used to validate and the test method that returns true or false.
- [ ] [MERNSTACK-143] Add explanation about the main advantages of using MongoDB and Mongoose in the README.md file in the Backend section.
- [x] [MERNSTACK-14] Create a new schema and model for user.



# Everything else:


```s
└─ MERN-stack-project
   ├─ backend
   │  ├─ models
   │  │  ├─ junction
   │  │  │  ├─ companyProjectModel.js
   │  │  │  │  └─ line 3: TODO : [MERNSTACK-101] Fix this schema and reconsider the fields
   │  │  │  └─ companyVendorJunctionModel.js
   │  │  │     └─ line 1: TODO : [MERNSTACK-80] Create `junction` collection between companies and vendors. (many-to-many relationship)
   │  │  ├─ agendaModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-62] GOOD IDEA: Maybe it is possible to save the agenda data in a separate agenda model and schema, and link the agenda to the company, project or user. (one-to-one relationship) And think about how to link the agenda  to `company`, `project`` and even `user` schemes and models.
   │  │  ├─ appointmentModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-84] Create a new schema and model for `appointment`. An appointment will be linked to a company or project, based on an appointmentId in the appointment model. Employees, users, vendors, products, a service and more can be linked to an appointment.
   │  │  ├─ bookModel.js
   │  │  │  ├─ line 18: TODO : [MERNSTACK-10] Solve Codacy issue that ticket number is not used.
   │  │  │  └─ line 20: TODO : [MERNSTACK-11] Delete this schema once it is no longer needed.
   │  │  ├─ companyModel.js
   │  │  │  ├─ line 8: TODO : [MERNSTACK-4] Investigate the usefulness of generating an id myself.
   │  │  │  ├─ line 14: TODO : [MERNSTACK-134] Send confirmation e-mail to this address to verify the company email address.
   │  │  │  ├─ line 46: TODO : [MERNSTACK-13] Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
   │  │  │  ├─ line 62: TODO : [MERNSTACK-15] Save the name , email, phone, and role related to the company as fields in a new user model. (to be created)
   │  │  │  ├─ line 63: TODO : [MERNSTACK-16] Owners  will be linked to a company, based on an ownerId in the owner model.
   │  │  │  ├─ line 64: TODO : [MERNSTACK-17] "owners" array should contain owner objects with an userId.
   │  │  │  ├─ line 69: TODO : [MERNSTACK-18] Create a new schema and model for companyAdmin users.
   │  │  │  ├─ line 70: TODO : [MERNSTACK-19] Admin users will be linked to a company, based on an adminUserId in the adminUser model.
   │  │  │  ├─ line 71: TODO : [MERNSTACK-20] `admins` array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
   │  │  │  ├─ line 76: TODO : [MERNSTACK-21] Create a new schema and model for Role with an roleId and role. For example: { roleId: { type: Number, required: true }, role: { type: String, required: true } } (roleId = 1, role = "owner") (roleId = 2, role = "admin") (roleId = 3, role = "employee") (roleId = 4, role = "vendor") (roleId = 5, role = "customer") (roleId = 6, role = "guest")
   │  │  │  ├─ line 77: TODO : [MERNSTACK-22] Roles will be linked to company associated users like employees, vendors, customers, and more, based on an roleId in the role model.
   │  │  │  ├─ line 78: TODO : [MERNSTACK-71] companyModel.js: Create `junction` table between companies and the role users have in this many-to-many relationship with the companies. Users can get assigned more than 1 role per company.
   │  │  │  ├─ line 79: TODO : [MERNSTACK-72] Reconsider `employees` field if the role `junction` table is not the right place to store the `employee` data.
   │  │  │  ├─ line 84: TODO : [MERNSTACK-23] Create a new schema and model for address.
   │  │  │  ├─ line 85: TODO : [MERNSTACK-24] Locations will be linked to a company, based on an addressId in the address model.
   │  │  │  ├─ line 86: TODO : [MERNSTACK-25] "locations" array should contain address objects with all address field fields and addressId compatible with the configured addressFormat for the country and region.
   │  │  │  ├─ line 95: TODO : [MERNSTACK-26] Find out how to validate correct business and payment details.
   │  │  │  ├─ line 96: TODO : [MERNSTACK-27] Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
   │  │  │  ├─ line 135: TODO : [MERNSTACK-28] Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
   │  │  │  ├─ line 141: TODO :[MERNSTACK-75] Create paymentMethod schema and model.
   │  │  │  ├─ line 158: TODO : [MERNSTACK-29] Create a new schema and model for Industry. Industry will be linked to a company, based on an industryId in the industry model.
   │  │  │  ├─ line 159: TODO : [MERNSTACK-76] RECONSIDER: Maybe a `junction` table between companies and the industries they are in is the right place to store necessary data for the specific companyIndustry relationships This extra data might be data like metadata that can be used to improve the result listing order of companies when searched by user in frontend.
   │  │  │  ├─ line 165: TODO : [MERNSTACK-33] Make it possible to change this value in the user/owner settings.
   │  │  │  ├─ line 170: TODO : [MERNSTACK-35] Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
   │  │  │  ├─ line 171: TODO : [MERNSTACK-36] "reviews" array should contain review objects with an reviewId.
   │  │  │  └─ line 295: TODO : [MERNSTACK-70] Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities.
   │  │  ├─ customerModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-94] Create customer model and schema and link it to the company model and schema.
   │  │  ├─ departmentModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-100] Create department schema and model. Company associated users (with roles) can be linked to a department, based on a userId OR maybe with an employeeId.
   │  │  ├─ employeeModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-40] Create a new schema and model `Employee`
   │  │  │  └─ line 2: TODO : [MERNSTACK-41] Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
   │  │  ├─ eventModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-86] Create a new schema and model for events. Events will be linked to a company, based on an eventId in the event model.
   │  │  │  └─ line 2: TODO : [MERNSTACK-87] GOOD IDEA: Maybe it is possible to save the event data in a separate event model and schema, and link the event to the company, project or user. (one-to-one relationship) And think about how to link the event to `company`, `project`` and even `user` schemes and models.
   │  │  ├─ invoiceModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-89] Create a new schema and model for invoice. Invoices will be linked to a company, based on an invoiceId in the invoice model.
   │  │  ├─ messageModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-57] Create message schema and model. Messages will be linked to a company, based on an messageId in the message model. This model should contain the message text, timestamp, and more. Messages will be linked to a company, based on an messageId in the message model. This is a one-to-many relationship, between company and messages OR project and messages. It should not be hard to switch between the `company messenger inbox` and the `project messenger inbox`.
   │  │  │  ├─ line 2: TODO : [MERNSTACK-58] Create messenger functionality and use encryption for the privacy and security of the messages. Never store the encryption key in the database, only encrypt and decrypt the messages in the frontend. (Use a library for this)
   │  │  │  ├─ line 5: TODO : [MERNSTACK-59] Make it possible for normal users to send messages to a company, project or employee. Make it possible for employees to respond to messages from users.
   │  │  │  ├─ line 6: TODO : [MERNSTACK-60] Make it possible for vendors to send messages to a company, project or employee. (Employees have to be authorized by the company (main) owner to connect with vendors). Make it possible for (authorized) employees, owners and companies to respond to messages from vendors.
   │  │  │  └─ line 7: TODO : [MERNSTACK-61] Build a sharable functionality (a link to each functionality, agreement, project, product, revenue agreement, appointment or whatever) in all features where it is possible to communicate about between 2 related users. Make it possible to share a link from one to another if both users (companies, owners, (authorized) employees, project associates or whichever other user that is associated to each other in that specific "thing" they use, share (or possibly CAN share), or whatever way they (can) relate to each other for EVERY possible functionality and feature I can think of to be USEFUL and NOT too distracting from ANY more important things (functionalities or features).
   │  │  ├─ notificationModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-85] Create a new schema and model for notifications. Notifications will be linked to a company, based on an notificationId in the notification model.
   │  │  ├─ orderModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-91] Create a new schema and model for orders. Orders will be linked to a company, based on an orderId in the order model.
   │  │  ├─ paymentMethodModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-83] Create Payment Method Model
   │  │  ├─ premiumTypeModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-37] Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
   │  │  │  └─ line 2: TODO : [MERNSTACK-93] Decide on the premium names, which features they have, and how much they cost, what you get for every premium kind and how to pay/bill them.
   │  │  ├─ productModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-45] Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
   │  │  │  ├─ line 2: TODO : [MERNSTACK-46] A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
   │  │  │  ├─ line 3: TODO : [MERNSTACK-47] It should be possible to search for products without having to visit a company profile. (search bar on the home page)
   │  │  │  ├─ line 4: TODO : [MERNSTACK-48] Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
   │  │  │  ├─ line 5: TODO : [MERNSTACK-49] A product page should also have reviews from customers. (maybe also from employees and vendors?)
   │  │  │  └─ line 6: TODO : [MERNSTACK-50] IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
   │  │  ├─ projectModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-43] Create a new schema and model for projects.
   │  │  │  ├─ line 2: TODO : [MERNSTACK-63] Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
   │  │  │  ├─ line 3: TODO : [MERNSTACK-64] Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │  │  ├─ line 4: TODO : [MERNSTACK-65] Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
   │  │  │  ├─ line 5: TODO : [MERNSTACK-66] Make functionalities so companies can share the revenue of a projects products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
   │  │  │  ├─ line 6: TODO : [MERNSTACK-67] Make it possible for companies associated to projects to share revenue per service or product.
   │  │  │  ├─ line 7: TODO : [MERNSTACK-68] Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
   │  │  │  └─ line 8: TODO : [MERNSTACK-69] Make it possible to share revenue based on which company performs the service.
   │  │  ├─ ratingModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-73] Create a new schema and model for `rating`. Ratings will be linked to a company, based on an ratingId in the rating model. This model should contain the rating number, reviewer, timestamp and maybe more.
   │  │  │  └─ line 2: TODO : [MERNSTACK-78] Think about ways to reward users that leave honest ratings. Think about ways to punish those who only leave trolling ratings and reviews with the intention to give one or more businesses a bad name or harass companies.)
   │  │  ├─ reviewModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-34] Create review schema and model.
   │  │  │  └─ line 2: TODO : [MERNSTACK-77] Set some kind of `target` properties to link the review to the company, project, product, service, employee, vendor etc. And set some kind of `source` properties to link the review to the user, customer, employee, vendor etc. (many-to-many relationship), the `type` of review could be `product` or `service` linked to `product` `id` and `service` `id`.
   │  │  ├─ serviceModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-52] Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
   │  │  │  ├─ line 2: TODO : [MERNSTACK-53] Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
   │  │  │  ├─ line 3: TODO : [MERNSTACK-54] A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
   │  │  │  ├─ line 4: TODO : [MERNSTACK-55] Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
   │  │  │  └─ line 5: TODO : [MERNSTACK-56] Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │  ├─ storyModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-42] Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.
   │  │  ├─ taskModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-88] Create a new schema and model for tasks. Tasks will be linked to a company, based on an taskId in the task model.
   │  │  ├─ userModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-14] Create a new schema and model for User.
   │  │  └─ vendorModel.js
   │  │     ├─ line 1: TODO : [MERNSTACK-38] Create a new schema and model for vendors. Decide what kind of vendors there are, and what properties they need. Vendors are the business to business users and can possibly be linked to a company, based on an vendorId in the vendor model.
   │  │     └─ line 2: TODO : [MERNSTACK-39] Decide what kind of functionalities and authorizations vendors have.
   │  ├─ routes
   │  │  ├─ booksRoute.js
   │  │  │  ├─ line 21: TODO : Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
   │  │  │  └─ line 22: TODO : If the book already exists, send status 409 response and a (error) message to inform the client.
   │  │  └─ companiesRoute.js
   │  │     ├─ line 18: TODO : [MERNSTACK-110] Check if the company already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the company schema.
   │  │     ├─ line 19: TODO : [MERNSTACK-111] If the company already exists, send status 409 response and a (error) message to inform the client.
   │  │     ├─ line 21: TODO : [MERNSTACK-112] Remove this function once the payment model has been fully implemented.
   │  │     ├─ line 29: TODO : [MERNSTACK-109] Populate the company document with the properties from the request body if they exist.
   │  │     └─ line 50: TODO : `id` corresponding to the `paymentMethod` model document `id`
   │  └─ index.js
   │     └─ line 13: TODO : [MERNSTACK-113] Configure CORS properly before deployment.
   ├─ frontend
   │  ├─ components
   │  │  └─ CompaniesSingleCard.jsx
   │  │     ├─ line 28: TODO : [MERNSTACK-136] Find fitting email icon from react-icons and replace the following icon with it */}
   │  │     └─ line 33: TODO : [MERNSTACK-137] Find fitting phone icon from react-icons and replace the following icon with it */}
   │  └─ pages
   │     ├─ EditCompany.jsx
   │     │  ├─ line 12: TODO : [MERNSTACK-129] Add state for all companies fields that can be edited
   │     │  ├─ line 37: TODO : [MERNSTACK-131] Set state for all companies fields that can be edited
   │     │  └─ line 93: TODO : [MERNSTACK-130] Add input fields for all editable company details. To achieve this, copy the outer div with class ".my-4". */}
   │     ├─ RegisterCompany.jsx
   │     │  ├─ line 12: TODO : [MERNSTACK-127] Add state for all companies fields that can be registered
   │     │  ├─ line 45: TODO : [MERNSTACK-132] Add all companies fields that can be registered
   │     │  └─ line 73: TODO : [MERNSTACK-128] RegisterCompany.jsx: Add form inputs of all fields that the owner should fill in to register a company. Copy paste the following outer div with .my-4 class to achieve this*/}
   │     └─ ShowCompany.jsx
   │        └─ line 35: TODO : [MERNSTACK-133] Add all fields of the company model here. Copy paste outer div with ".my-4" class below to achieve this. */}
   └─ README.md
      ├─ line 513: TODO :
      ├─ line 517: [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
      ├─ line 518: [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
      ├─ line 519: [x] Finish basic Book schema and model. For faster functional development and testing purposes.
      ├─ line 520: [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
      ├─ line 521: [x] [MERNSTACK-103] Start using testing frameworks Mocha and Chai to write automated tests for the endpoints and ensure that the code is working correctly.
      ├─ line 522: [x] [MERNSTACK-74] Set up `Company` model.
      ├─ line 523: [x] [MERNSTACK-65] Create a route to save a new Company document in the database.
      ├─ line 524: [x] [MERNSTACK-95] Test companyRouter POST route `/` for saving a new company with Postman.
      ├─ line 525: [ ] [MERNSTACK-103] Test companyRouter POST route `/` for saving a new company with Chai and Mocha.
      ├─ line 526: [x] [MERNSTACK-66] Create a route to get all Company documents from the database.
      ├─ line 527: [x] [MERNSTACK-96] Test companyRouter GET route `/` for getting all companies with Postman.
      ├─ line 528: [ ] [MERNSTACK-104] Test companyRouter GET route `/` for getting all companies with Chai and Mocha.
      ├─ line 529: [x] [MERNSTACK-67] Create a route to get a single Company document from the database.
      ├─ line 530: [x] [MERNSTACK-97] Test companyRouter GET route `/:id` for getting a single company with Postman.
      ├─ line 531: [ ] [MERNSTACK-105] Test companyRouter GET route `/:id` for getting a single company with Chai and Mocha.
      ├─ line 532: [x] [MERNSTACK-68] Create a route to update a single Company document in the database.
      ├─ line 533: [x] [MERNSTACK-98] Test companyRouter PUT route `/:id` for updating a single company with Postman.
      ├─ line 534: [ ] [MERNSTACK-106] Test companyRouter PUT route `/:id` for updating a single company with Chai and Mocha.
      ├─ line 535: [x] [MERNSTACK-69] Create a route to delete a single Company document from the database.
      ├─ line 536: [ ] [MERNSTACK-99] Test companyRouter DELETE route `/:id` for deleting a single company with Postman.
      ├─ line 537: [ ] [MERNSTACK-107] Test companyRouter DELETE route `/:id` for deleting a single company with Chai and Mocha.
      ├─ line 538: [x] Actualize, complete and correct Company scheme documentation.
      ├─ line 539: [x] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
      ├─ line 540: [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
      ├─ line 541: [x] [MERNSTACK-51] Create Jira tickets for all TODOs.
      ├─ line 542: [x] [MERNSTACK-53] Create GET, POST, PUT and DELETE Company server routes.
      ├─ line 543: [ ] [MERNSTACK-55] Create User model.
      ├─ line 544: [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
      ├─ line 545: [ ] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents.
      ├─ line 546: [x] Create React app using Vite.js.
      ├─ line 547: [x] Move Vite.js documentation from backend devdocs folder to frontend devdocs folder
      ├─ line 548: [ ] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
      ├─ line 549: [ ] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
      ├─ line 550: [ ] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
      ├─ line 551: [ ] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder)
      ├─ line 552: [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
      ├─ line 553: [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers)
      ├─ line 554: [ ] [MERNSTACK-144] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
      ├─ line 555: [ ] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed.
      ├─ line 556: [x] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
      ├─ line 557: [ ] [MERNSTACK-145] Break down all ideas in the `Features:` section below into smaller tasks and create Jira tickets for them.
      ├─ line 558: [ ] [MERNSTACK-102] Check for the word `property` when it should be `field` in the documentation of schemas and models. Check for the word `field` when it should be `property` in the documentation when talking about database `document`s
      ├─ line 559: [ ] [MERNSTACK-114] Implement time-travel debugging with Redux DevTools.
      ├─ line 560: [x] [MERNSTACK-115] Decide the default destination after clicking the BackButton, something like the previous page or the home page.
      ├─ line 561: [x] [MERNSTACK-116] Create table on the frontend to display all companies.
      ├─ line 562: [x] [MERNSTACK-117] Create ShowCompany component to display a single companies details
      ├─ line 563: [x] [MERNSTACK-118] Create EditCompany component to edit a single company details.
      ├─ line 564: [x] [MERNSTACK-119] Create DeleteCompany component to delete a single company.
      ├─ line 565: [x] [MERNSTACK-120] Create CreateCompany component to create a new company.
      ├─ line 566: [x] [MERNSTACK-121] Implement a button on the ShowCompany component that allows the user to navigate to the corresponding EditCompany page.
      ├─ line 567: [x] [MERNSTACK-123] Create a CompanyModal component that will show up on the CompaniesList page when the user clicks on the `eye` icon.
      ├─ line 568: [x] [MERNSTACK-122] Create CompaniesList page (where all companies for a user will be shown in `table` or `card` view.) and safe this `table`/`card` setting to Redux store state so user will return to listing page with preferred setting.
      ├─ line 569: [x] [MERNSTACK-124] Use useSnackbar() for displaying error or success messages to the user in the Company components.
      ├─ line 570: [ ] [MERNSTACK-125] Inform myself better about using useEffect() to prevent infinite loop situations when my application get more complex. [Speech about using useEffect effectively](https://www.youtube.com/watch?v=eFGeStq8dZo&list=PLokIxGKSireSB4Gx6r7xWlFs9Q9PueDED&ab_channel=ReactConferencesbyGitNation )
      ├─ line 571: [x] [MERNSTACK-126] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (see frontend devdocs folder)
      ├─ line 572: [ ] [MERNSTACK-138] Create user register page and functionality, save with bcrypt hashed password in database.
      ├─ line 573: [ ] [MERNSTACK-139] Create a user login page and functionality, validate user password has with bcrypt and compare hashed password on login.
      ├─ line 574: [ ] [MERNSTACK-140] Make it possible for a user to register a company and automatically become first company owner.
      ├─ line 575: [ ] [MERNSTACK-141]  Find fitting icons for company `name` `phone number` and `email` for the ListCompanies `card` view and CompaniesModal component. Find them in the react-icons library. DO THIS BEFORE CREATING ANY OTHER LIST COMPONENTS!
      ├─ line 576: [ ] [MERNSTACK-142] Update README.md with explanation about the validators I created in the frontend application. Explain the regex used to validate and the test method that returns true or false.
      └─ line 577: [ ] [MERNSTACK-143] Add explanation about the main advantages of using MongoDB and Mongoose in the README.md file in the Backend section.

```
