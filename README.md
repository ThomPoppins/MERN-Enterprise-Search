# MERN_STACK_PROJ. :rocket:

- [MERN\_STACK\_PROJ. :rocket:](#mern_stack_proj-rocket)
  - [Application Description](#application-description)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Many-to-Many Relationships](#many-to-many-relationships)
- [Future functionalities:](#future-functionalities)
  - [User Privilege Management and Admin Authorization](#user-privilege-management-and-admin-authorization)
- [Models:](#models)
    - [Company](#company)
      - [Fields:](#fields)
- [Routes:](#routes)
- [TODO:](#todo)
- [Everything else:](#everything-else)

Each section title is linked to the corresponding part of the document for easy navigation.

## Application Description

Welcome to my FullStack JavaScript application built with Express.js on the backend and React with Redux on the frontend. This application leverages the power of Axios for seamless communication between the two layers. MongoDB serves as the database, and Mongoose is our trusted tool for connecting and interacting with it.

### Frontend

On the frontend, I've chosen React for building user interfaces and Redux for state management. For those less familiar with these technologies, here's why Redux is a game-changer:

**Redux simplifies state management:** In plain English, Redux provides a centralized place to manage the data that your application uses. This means that every component can easily access and modify the same data, making it more predictable and easier to work with.

**Combining reducers for global state:** I'll be combining reducers in Redux to create a single store. This store will be available across all components, ensuring that data is consistent and can be accessed anywhere within the app. Imagine it as a shared brain for your application.

**Dispatch actions from anywhere:** Redux allows us to dispatch actions from anywhere within our application. This means that you can trigger changes to the data store from any component, making it incredibly flexible and responsive to user interactions.

### Backend

In the backend, I've set up RESTful API endpoints to create, read, update, and delete documents from collections. These collections are defined and configured in the `/backend/models` folder, ensuring a structured and organized approach to data management.

### Many-to-Many Relationships

One interesting aspect of this project is handling many-to-many relationships between companies and projects. In real-world scenarios, companies often take part in multiple projects, and a single project can involve multiple companies. To achieve this, I'll be using a `junction` collection in MongoDB.

The main advantage of using a `junction` collection is that it simplifies the management of these relationships. For instance, consider a scenario where Company A and Company B collaborate on Project X. Instead of duplicating data or creating complex nested structures, the `junction` collection allows us to create a clear and efficient link between Company A, Company B, and Project X. This makes it easy to track participation and configure revenue sharing settings dynamically when all parties agree.

# Future functionalities:

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

***Feel free to explore this repository to see these concepts in action and dive into [my code](https://github.com/ThomPoppins/MERN_STACK_PROJ.)***

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

GitHub Copilot: Express.js is a popular Node.js framework that provides a simple and flexible way to create REST API endpoints. By using Express.js, I can:

- Easily create HTTP endpoints for handling GET, POST, PUT, and DELETE requests.
- Use middleware to add custom behavior to my endpoints, such as authentication, logging, and error handling.
- Take advantage of Express.js's routing system to organize my endpoints into logical groups and make my code more modular and maintainable.
- Use a wide range of third-party middleware and plugins to add additional functionality to my endpoints, such as compression, caching, and rate limiting.
- Use Express.js's built-in support for JSON and URL-encoded data to easily handle incoming request data and send responses in the desired format.
- Use Express.js's support for templating engines to generate dynamic HTML pages and other types of content.
- Benefit from Express.js's integration with other Node.js libraries, such as Mongoose, which makes it easier to build scalable and maintainable applications.
- Take advantage of Express.js's support for testing frameworks like Mocha and Chai to write automated tests for their endpoints and ensure that my code is working correctly.


# TODO:

- [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
- [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
- [x] Finish basic Book schema and model. For faster functional development and testing purposes.
- [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
- [ ] [MERNSTACK-Start using testing frameworks Mocha and Chai to write automated tests for the endpoints and ensure that the code is working correctly.
- [x] [MERNSTACK-74] Set up `Company` model.
- [x] [MERNSTACK-65] Create a route to save a new Company document in the database.
- [ ] [MERNSTACK-95] Test companyRouter POST route `/` for saving a new company with Postman.
- [x] [MERNSTACK-66] Create a route to get all Company documents from the database.
- [ ] [MERNSTACK-96] Test companyRouter GET route `/` for getting all companies with Postman.
- [x] [MERNSTACK-67] Create a route to get a single Company document from the database.
- [ ] [MERNSTACK-97] Test companyRouter GET route `/:id` for getting a single company with Postman.
- [x] [MERNSTACK-68] Create a route to update a single Company document in the database.
- [ ] [MERNSTACK-98] Test companyRouter PUT route `/:id` for updating a single company with Postman.
- [x] [MERNSTACK-69] Create a route to delete a single Company document from the database.
- [ ] [MERNSTACK-99] Test companyRouter DELETE route `/:id` for deleting a single company with Postman.
- [ ] Actualize, complete and correct Company scheme documentation.
- [ ] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
- [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
- [x] [MERNSTACK-51] Create Jira tickets for all TODO's.
- [x] [MERNSTACK-53] Create GET, POST, PUT and DELETE Company server routes.
- [ ] [MERNSTACK-55] Create User model.
- [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
- [ ] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents.
- [ ] Create React app using Vite.js.
- [ ] Move Vite.js documentation from backend devdocs folder to frontend devdocs folder
- [ ] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
- [ ] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
- [ ] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
- [ ] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder)
- [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
- [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers)
- [ ] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
- [ ] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed.
- [ ] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (Just to show that I know how to use Redux in React.) (see backend devdocs folder)
- [ ] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
- [ ] Break down all ideas in the `Future functionalities:` section below into smaller tasks and create Jira tickets for them.
- [ ] [MERNSTACK-102] Check for the word `property` when it should be `field` in the documentation of schemas and models. Check for the word `field` when it should be `property` in the documentation when talking about database `document`'s

# Everything else:

> **Note**: All TODO's are linked to Jira tickets, so that I can keep track of everything I have to do.

```javascript
└─ MERN-stack-project
   ├─ backend
   │  ├─ models
   │  │  ├─ bookModel.js
   │  │  │  ├─ line 18: TODO : [MERNSTACK-10] Solve Codacy issue that ticketnumber is not used.
   │  │  │  └─ line 20: TODO : [MERNSTACK-11] Delete this schema once it is no longer needed.
   │  │  ├─ companyModel.js
   │  │  │  ├─ line 3: TODO : [MERNSTACK-51] Finish putting all TODOs into Jira tickets.
   │  │  │  ├─ line 30: TODO : [MERNSTACK-4] Investigate the usefulness of generating an id myself.
   │  │  │  ├─ line 67: TODO : [MERNSTACK-13] Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
   │  │  │  ├─ line 83: TODO : [MERNSTACK-15] Save the name , email, phone, and role related to the company as properties in a new user model. (to be created)
   │  │  │  ├─ line 84: TODO : [MERNSTACK-16] Owners  will be linked to a company, based on an ownerId in the owner model.
   │  │  │  ├─ line 85: TODO : [MERNSTACK-17] "owners" array should contain owner objects with an userId.
   │  │  │  ├─ line 90: TODO : [MERNSTACK-18] Create a new schema and model for companyAdmin users.
   │  │  │  ├─ line 91: TODO : [MERNSTACK-19] Admin users will be linked to a company, based on an adminUserId in the adminUser model.
   │  │  │  ├─ line 92: TODO : [MERNSTACK-20] `admins` array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
   │  │  │  ├─ line 97: TODO : [MERNSTACK-21] Create a new schema and model for Role with an roleId and role. For example: { roleId: { type: Number, required: true }, role: { type: String, required: true } } (roleId = 1, role = "owner") (roleId = 2, role = "admin") (roleId = 3, role = "employee") (roleId = 4, role = "vendor") (roleId = 5, role = "customer") (roleId = 6, role = "guest")
   │  │  │  ├─ line 98: TODO : [MERNSTACK-22] Roles will be linked to company associated users like employees, vendors, customers, and more, based on an roleId in the role model.
   │  │  │  ├─ line 99: TODO : [MERNSTACK-71] companyModel.js: Create `junction` table between companies and the role users have in this many-to-many relationship with the companies. Users can get assigned more than 1 role per company.
   │  │  │  ├─ line 100: TODO : [MERNSTACK-72] Reconsider `employees` field if the role `junction` table is not the right place to store the `employee` data.
   │  │  │  ├─ line 105: TODO : [MERNSTACK-23] Create a new schema and model for address.
   │  │  │  ├─ line 106: TODO : [MERNSTACK-24] Locations will be linked to a company, based on an addressId in the address model.
   │  │  │  ├─ line 107: TODO : [MERNSTACK-25] "locations" array should contain address objects with all address field properties and addressId compatible with the configured addressFormat for the country and region.
   │  │  │  ├─ line 116: TODO : [MERNSTACK-26] Find out how to validate correct business and payment details.
   │  │  │  ├─ line 117: TODO : [MERNSTACK-27] Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
   │  │  │  ├─ line 156: TODO : [MERNSTACK-28] Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
   │  │  │  ├─ line 162: TODO :[MERNSTACK-75] Create paymentMethod schema and model.
   │  │  │  ├─ line 179: TODO : [MERNSTACK-29] Create a new schema and model for Industry. Industry will be linked to a company, based on an industryId in the industry model.
   │  │  │  ├─ line 180: TODO : [MERNSTACK-76] RECONSIDER: Maybe a `junction` table between companies and the industries they are in is the right place to store necessary data for the specific companyIndustry relationships This extra data might be data like metadata that can be used to improve the result listing order of companies when searched by user in frontend.
   │  │  │  ├─ line 186: TODO : [MERNSTACK-33] Make it possible to change this value in the user/owner settings.
   │  │  │  ├─ line 191: TODO : [MERNSTACK-35] Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
   │  │  │  ├─ line 192: TODO : [MERNSTACK-36] "reviews" array should contain review objects with an reviewId.
   │  │  │  ├─ line 219: TODO : [MERNSTACK-80] Create `junction` table between companies and vendors. (many-to-many relationship)
   │  │  │  ├─ line 229: TODO : [MERNSTACK-42] Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.
   │  │  │  ├─ line 234: TODO : [MERNSTACK-43] Create a new schema and model for projects.
   │  │  │  ├─ line 240: TODO : [MERNSTACK-45] Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
   │  │  │  ├─ line 241: TODO : [MERNSTACK-46] A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
   │  │  │  ├─ line 242: TODO : [MERNSTACK-47] It should be possible to search for products without having to visit a company profile. (search bar on the home page)
   │  │  │  ├─ line 243: TODO : [MERNSTACK-48] Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
   │  │  │  ├─ line 244: TODO : [MERNSTACK-49] A product page should also have reviews from customers. (maybe also from employees and vendors?)
   │  │  │  ├─ line 245: TODO : [MERNSTACK-50] IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
   │  │  │  ├─ line 251: TODO : [MERNSTACK-52] Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
   │  │  │  ├─ line 252: TODO : [MERNSTACK-53] Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
   │  │  │  ├─ line 253: TODO : [MERNSTACK-54] A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
   │  │  │  ├─ line 254: TODO : [MERNSTACK-55] Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
   │  │  │  ├─ line 260: TODO : Create a new schema and model for `appointment`. An appointment will be linked to a company or project, based on an appointmentId in the appointment model. Employees, users, vendors, products, a service and more can be linked to an appointment.
   │  │  │  ├─ line 265: TODO : [MERNSTACK-56] Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │  │  ├─ line 266: TODO : [MERNSTACK-57] Create message schema and model. Messages will be linked to a company, based on an messageId in the message model. This model should contain the message text, timestamp, and more. Messages will be linked to a company, based on an messageId in the message model. This is a one-to-many relationship, between company and messages OR project and messages. It should not be hard to switch between the `company messenger inbox` and the `project messenger inbox`.
   │  │  │  ├─ line 267: TODO : [MERNSTACK-58] Create messenger functionality and use encryption for the privacy and security of the messages. Never store the encryption key in the database, only encrypt and decrypt the messages in the frontend. (Use a library for this)
   │  │  │  ├─ line 270: TODO : [MERNSTACK-59] Make it possible for normal users to send messages to a company, project or employee. Make it possible for employees to respond to messages from users.
   │  │  │  ├─ line 271: TODO : [MERNSTACK-60] Make it possible for vendors to send messages to a company, project or employee. (Employees have to be authorized by the company (main) owner to connect with vendors). Make it possible for (authorized) employees, owners and companies to respond to messages from vendors.
   │  │  │  ├─ line 272: TODO : [MERNSTACK-61] Build a sharable functionality (a link to each functionality, agreement, project, product, revenue agreement, appointment or whatever) in all features where it is possible to communicate about between 2 related users. Make it possible to share a link from one to another if both users (companies, owners, (authorized) employees, project associates or whichever other user that is associated to each other in that specific "thing" they use, share (or possibly CAN share), or whatever way they (can) relate to each other for EVERY possible functionality and feature I can think of to be USEFUL and NOT too distracting from ANY more important things (functionalities or features).
   │  │  │  ├─ line 278: TODO : [MERNSTACK-62] GOOD IDEA: Maybe it is possible to save the agenda data in a separate agenda model and schema, and link the agenda to the company, project or user. (one-to-one relationship) And think about how to link the agenda  to company`, `project`` and even `user` schemes and models.
   │  │  │  ├─ line 283: TODO : [MERNSTACK-63] Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
   │  │  │  ├─ line 284: TODO : [MERNSTACK-64] Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │  │  ├─ line 285: TODO : [MERNSTACK-65] Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
   │  │  │  ├─ line 286: TODO : [MERNSTACK-66] Make functionalities so companies can share the revenue of a projects products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
   │  │  │  ├─ line 287: TODO : [MERNSTACK-67] Make it possible for companies associated to projects to share revenue per service or product.
   │  │  │  ├─ line 288: TODO : [MERNSTACK-68] Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
   │  │  │  ├─ line 289: TODO : [MERNSTACK-69] Make it possible to share revenue based on which company performs the service.
   │  │  │  └─ line 305: TODO : [MERNSTACK-70] Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities.
   │  │  ├─ departmentModel.js
   │  │  │  └─ line 1: TODO : Create department schema and model. Company associated users (with roles) can be linked to a department, based on a userId OR maybe with an employeeId.
   │  │  ├─ employeeModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-40] Create a new schema and model `Employee`
   │  │  │  └─ line 2: TODO : [MERNSTACK-41] Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
   │  │  ├─ premiumTypeModel.js
   │  │  │  └─ line 1: TODO : [MERNSTACK-37] Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
   │  │  ├─ ratingModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-73] Create a new schema and model for `rating`. Ratings will be linked to a company, based on an ratingId in the rating model. This model should contain the rating number, reviewer, timestamp and maybe more.
   │  │  │  └─ line 2: TODO : [MERNSTACK-78] Think about ways to reward users that leave honest ratings. Think about ways to punish those who only leave trolling ratings and reviews with the intention to give one or more businesses a bad name or harass companies.)
   │  │  ├─ reviewModel.js
   │  │  │  ├─ line 1: TODO : [MERNSTACK-34] Create review schema and model.
   │  │  │  └─ line 2: TODO : [MERNSTACK-77] Set some kind of `target` properties to link the review to the company, project, product, service, employee, vendor etc. And set some kind of `source` properties to link the review to the user, customer, employee, vendor etc. (many-to-many relationship), the `type` of review could be `product` or `service` linked to `product` `id` and `service` `id`.
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
   │  │     ├─ line 17: TODO : Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
   │  │     ├─ line 18: TODO : If the book already exists, send status 409 response and a (error) message to inform the client.
   │  │     ├─ line 21: TODO : Add all properties assigned in the schema and request body, check their value to be true
   │  │     └─ line 42: TODO : `id` corresponding to the `paymentMethod` model document `id`
   │  └─ config.js
   │     └─ line 3: TODO : if something is not working right, add books-collection to the end of the URL:
   └─ README.md
      ├─ line 29: TODO :
      ├─ line 31: [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
      ├─ line 32: [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
      ├─ line 33: [x] Finish basic Book schema and model. For faster functional development and testing purposes.
      ├─ line 34: [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
      ├─ line 35: [ ] [MERNSTACK-74] Set up `Company` model.
      ├─ line 36: [ ] [MERNSTACK-65] Create a route to save a new Company document in the database.
      ├─ line 37: [ ] [MERNSTACK-66] Create a route to get all Company documents from the database.
      ├─ line 38: [ ] [MERNSTACK-67] Create a route to get a single Company document from the database.
      ├─ line 39: [ ] [MERNSTACK-68] Create a route to update a single Company document in the database.
      ├─ line 40: [ ] [MERNSTACK-69] Create a route to delete a single Company document from the database.
      ├─ line 41: [ ] Actualize, complete and correct Company scheme documentation.
      ├─ line 42: [ ] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
      ├─ line 43: [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
      ├─ line 44: [ ] [MERNSTACK-51] Create Jira tickets for all TODO's.
      ├─ line 45: [ ] [MERNSTACK-53] Set up GET, POST, PUT and DELETE Company server routes.
      ├─ line 46: [ ] [MERNSTACK-55] Create User model.
      ├─ line 47: [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
      ├─ line 48: [ ] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents.
      ├─ line 49: [ ] Create React app using Vite.js.
      ├─ line 50: [ ] Move Vite.js documentation from backend devdocs folder to frontend devdocs folder
      ├─ line 51: [ ] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
      ├─ line 52: [ ] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
      ├─ line 53: [ ] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
      ├─ line 54: [ ]
      ├─ line 55: [ ] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder)
      ├─ line 56: [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
      ├─ line 57: [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers)
      ├─ line 58: [ ] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
      ├─ line 59: [ ] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed.
      ├─ line 60: [ ] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (Just to show that I know how to use Redux in React.) (see backend devdocs folder)
      ├─ line 61: [ ] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
      └─ line 62: [ ] Break down all ideas in the `Future functionalities:` section below into smaller tasks and create Jira tickets for them.

```
