# MERN_STACK_PROJ :rocket:

## Application Description

Welcome to my FullStack JavaScript application built with Express.js on the backend and React with Redux on the frontend. This application leverages the power of Axios for seamless communication between the two layers. MongoDB serves as the database, and Mongoose is our trusted tool for connecting and interacting with it.

### Backend

In the backend, I've set up RESTful API endpoints to create, read, update, and delete documents from collections. These collections are defined and configured in the `/backend/models` folder, ensuring a structured and organized approach to data management.

### Frontend

On the frontend, I've chosen React for building user interfaces and Redux for state management. For those less familiar with these technologies, here's why Redux is a game-changer:

**Redux simplifies state management:** In plain English, Redux provides a centralized place to manage the data that your application uses. This means that every component can easily access and modify the same data, making it more predictable and easier to work with.

**Combining reducers for global state:** I'll be combining reducers in Redux to create a single store. This store will be available across all components, ensuring that data is consistent and can be accessed anywhere within the app. Imagine it as a shared brain for your application.

**Dispatch actions from anywhere:** Redux allows us to dispatch actions from anywhere within our application. This means that you can trigger changes to the data store from any component, making it incredibly flexible and responsive to user interactions.

## Many-to-Many Relationships

One interesting aspect of this project is handling many-to-many relationships between companies and projects. In real-world scenarios, companies often take part in multiple projects, and a single project can involve multiple companies. To achieve this, I'll be using a `junction` collection in MongoDB.

The main advantage of using a `junction` collection is that it simplifies the management of these relationships. For instance, consider a scenario where Company A and Company B collaborate on Project X. Instead of duplicating data or creating complex nested structures, the `junction` collection allows us to create a clear and efficient link between Company A, Company B, and Project X. This makes it easy to track participation and configure revenue sharing settings dynamically when all parties agree.

Feel free to explore this repository to see these concepts in action and dive into the code. Happy coding!

## TODO:

- [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
- [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
- [x] Finish basic Book schema and model. For faster functional development and testing purposes.
- [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
- [ ] [MERNSTACK-74] Set up `Company` model.
- [ ] [MERNSTACK-65] Create a route to save a new Company document in the database.
- [ ] [MERNSTACK-66] Create a route to get all Company documents from the database.
- [ ] [MERNSTACK-67] Create a route to get a single Company document from the database.
- [ ] [MERNSTACK-68] Create a route to update a single Company document in the database.
- [ ] [MERNSTACK-69] Create a route to delete a single Company document from the database.
- [ ] Actualize, complete and correct Company scheme documentation.
- [ ] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
- [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
- [ ] [MERNSTACK-51] Create Jira tickets for all TODO's.
- [ ] [MERNSTACK-53] Set up GET, POST, PUT and DELETE Company server routes.
- [ ] [MERNSTACK-55] Create User model.
- [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
- [ ] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents.
- [ ] Create React app using Vite.js.
- [ ] Move Vite.js documentation from backend devdocs folder to frontend devdocs folder
- [ ] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
- [ ] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
- [ ] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
- [ ]
- [ ] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder)
- [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
- [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers)
- [ ] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
- [ ] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed.
- [ ] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (Just to show that I know how to use Redux in React.) (see backend devdocs folder)
- [ ] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
- [ ] Break down all ideas in the `Future functionalities:` section below into smaller tasks and create Jira tickets for them.

### Future functionalities:

**BREAK DOWN:** After user becomes `owner` by registering `company`, in his account settings there will be a setting saying `use admin rights` or something like that will be disabled by default. When the `owner` wants to do something what should be done with admin authorization, he can enable this setting first and then do whatever he needs to do. If `owner` has not executes `admin` actions for a while, remember to disable admin rights and after that remember him/her daily. Important admin configurations that possibly can have big impact, the frontend should always WARN the `admin` user, prompt to confirm the action. After executing the admin authorized action, prompt to disable admin rights directly with a switch off button in the prompt, so `admin` user does not have to go back to the settings to disable which feel user friendly and secure. Of course `admin` user can also close prompt by clicking on a `Continue` button that will be red if `admin rights` is enabled and green if disabled.

## Everything else I know I need to do:

> **Note**: All TODO's are linked to Jira tickets, so that I can keep track of everything I have to do.

```javascript
└─ MERN-stack-project
   ├─ backend
   │  ├─ models
   │  │  ├─ bookModel.js
   │  │  │  ├─ line 18: TODO : [MERNSTACK-10] Solve Codacy issue that ticketnumber is not used.
   │  │  │  └─ line 20: TODO : [MERNSTACK-11] Delete this schema once it is no longer needed.
   │  │  └─ companyModel.js
   │  │     ├─ line 3: TODO : [MERNSTACK-51] Finish putting all TODO's into Jira tickets.
   │  │     ├─ line 30: TODO : [MERNSTACK-4] Investigate the usefulness of generating an id myself.
   │  │     ├─ line 61: TODO : [MERNSTACK-13] Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
   │  │     ├─ line 80: TODO : [MERNSTACK-14] Create a new schema and model for user and one for owner.
   │  │     ├─ line 81: TODO : [MERNSTACK-15] Save the name , email, phone, and role related to the company as properties in a new user model. (to be created)
   │  │     ├─ line 82: TODO : [MERNSTACK-16] Owners  will be linked to a company, based on an ownerId in the owner model.
   │  │     ├─ line 83: TODO : [MERNSTACK-17] "owners" array should contain owner objects with an userId.
   │  │     ├─ line 88: TODO : [MERNSTACK-18] Create a new schema and model for admin users.
   │  │     ├─ line 89: TODO : [MERNSTACK-19] Admin users will be linked to a company, based on an adminUserId in the adminUser model.
   │  │     ├─ line 90: TODO : [MERNSTACK-20] `admins` array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
   │  │     ├─ line 95: TODO : [MERNSTACK-21] Create a new schema and model for roles.
   │  │     ├─ line 96: TODO : [MERNSTACK-22] Roles will be linked to a company (or project), based on an roleId in the role model.
   │  │     ├─ line 102: TODO : [MERNSTACK-23] Create a new schema and model for address.
   │  │     ├─ line 103: TODO : [MERNSTACK-24] Locations will be linked to a company, based on an addressId in the address model.
   │  │     ├─ line 104: TODO : [MERNSTACK-25] "locations" array should contain address objects with all address fields an addressId.
   │  │     ├─ line 114: TODO : [MERNSTACK-26] Find out how to validate correct business and payment details.
   │  │     ├─ line 115: TODO : [MERNSTACK-27] Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
   │  │     ├─ line 149: TODO : [MERNSTACK-28] Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
   │  │     ├─ line 171: TODO : [MERNSTACK-29] Create a new schema and model for company types. Company types will be linked to a company, based on an companyTypeId in the companyType model.
   │  │     ├─ line 178: TODO : [MERNSTACK-30] Create a new schema and model for type of industries, so that the user can select from a list of industries, or add a new one.
   │  │     ├─ line 179: TODO : [MERNSTACK-31] Industries will be linked to a company, based on an industryId in the industry model.
   │  │     ├─ line 180: TODO : [MERNSTACK-32] Create collection of industries, and link the companies in a companies[] property, which should contain company id's of the companies.
   │  │     ├─ line 187: TODO : [MERNSTACK-33] Make it possible to change this value in the user/owner settings.
   │  │     ├─ line 192: TODO : [MERNSTACK-34] Create review schema and model.
   │  │     ├─ line 193: TODO : [MERNSTACK-35] Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
   │  │     ├─ line 194: TODO : [MERNSTACK-36] "reviews" array should contain review objects with an reviewId.
   │  │     ├─ line 215: TODO : [MERNSTACK-37] Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
   │  │     ├─ line 221: TODO : [MERNSTACK-38] Create a new schema and model for vendors. Decide what kind of vendors there are, and what properties they need. Vendors are the business to business users and can possibly be linked to a company, based on an vendorId in the vendor model.
   │  │     ├─ line 222: TODO : [MERNSTACK-39] Decide what kind of functionalities and authorizations vendors have.
   │  │     ├─ line 233: TODO : [MERNSTACK-40] Create a new schema and model for employees.
   │  │     ├─ line 235: TODO : [MERNSTACK-41] Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
   │  │     ├─ line 241: TODO : [MERNSTACK-42] Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.
   │  │     ├─ line 247: TODO : [MERNSTACK-43] Create a new schema and model for projects.
   │  │     ├─ line 248: TODO : [MERNSTACK-44] IMPORTANT! Find out how to use a "junction table" to link companies to projects. (many-to-many relationship)
   │  │     ├─ line 254: TODO : [MERNSTACK-45] Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
   │  │     ├─ line 255: TODO : [MERNSTACK-46] A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
   │  │     ├─ line 256: TODO : [MERNSTACK-47] It should be possible to search for products without having to visit a company profile. (search bar on the home page)
   │  │     ├─ line 257: TODO : [MERNSTACK-48] Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
   │  │     ├─ line 258: TODO : [MERNSTACK-49] A product page should also have reviews from customers. (maybe also from employees and vendors?)
   │  │     ├─ line 259: TODO : [MERNSTACK-50] IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
   │  │     ├─ line 265: TODO : Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
   │  │     ├─ line 266: TODO : Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
   │  │     ├─ line 267: TODO : A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
   │  │     ├─ line 268: TODO : Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
   │  │     ├─ line 269: TODO : IMPORTANT! Find out how to use a "junction table" to link companies and projects to services. (many-to-many relationship)
   │  │     ├─ line 275: TODO : Create a new schema and model for `appointment`. An appointment will be linked to a company or project, based on an appointmentId in the appointment model. Employees, users, vendors, products, a service and more can be linked to an appointment.
   │  │     ├─ line 280: TODO : Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │     ├─ line 281: TODO : Create message schema and model. Messages will be linked to a company, based on an messageId in the message model. This model should contain the message text, timestamp, and more. Messages will be linked to a company, based on an messageId in the message model. This is a one-to-many relationship, between company and messages OR project and messages. It should not be hard to switch between the `company messenger inbox` and the `project messenger inbox`.
   │  │     ├─ line 282: TODO : Create messenger functionality and use encryption for the privacy and security of the messages. Never store the encryption key in the database, only encrypt and decrypt the messages in the frontend. (Use a library for this)
   │  │     ├─ line 285: TODO : Make it possible for normal users to send messages to a company, project or employee. Make it possible for employees to respond to messages from users.
   │  │     ├─ line 286: TODO : Make it possible for vendors to send messages to a company, project or employee. (Employees have to be authorized by the company (main) owner to connect with vendors). Make it possible for (authorized) employees, owners and companies to respond to messages from vendors.
   │  │     ├─ line 287: TODO : Build a sharable functionality (a link to each functionality, agreement, project, product, revenue agreement, appointment or whatever) in all features where it is possible to communicate about between 2 related users. Make it possible to share a link from one to another if both users (companies, owners, (authorized) employees, project associates or whichever other user that is associated to each other in that specific "thing" they use, share (or possibly CAN share), or whatever way they (can) relate to each other for EVERY possible functionality and feature I can think of to be USEFUL and NOT too distracting from ANY more important things (functionalities or features).
   │  │     ├─ line 293: TODO : GOOD IDEA: Maybe it is possible to save the agenda data in a separate agenda model and schema, and link the agenda to the company, project or user. (one-to-one relationship) And think about how to link the agenda  to company`, `project`` and even `user` schemes and models.
   │  │     ├─ line 299: TODO : Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
   │  │     ├─ line 300: TODO : Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │     ├─ line 301: TODO : Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
   │  │     ├─ line 302: TODO : Make functionalities so companies can share the revenue of a projects products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
   │  │     ├─ line 303: TODO : Make it possible for companies associated to projects to share revenue per service or product.
   │  │     ├─ line 304: TODO : Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
   │  │     ├─ line 305: TODO : Make it possible to share revenue based on which company performs the service.
   │  │     └─ line 322: TODO : Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities.
   │  └─ routes
   │     ├─ booksRoute.js
   │     │  ├─ line 21: TODO : Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
   │     │  └─ line 22: TODO : If the book already exists, send status 409 response and a (error) message to inform the client.
   │     └─ companiesRoute.js
   │        ├─ line 1: TODO : Create a route to save a new Company document in the database.
   │        ├─ line 2: TODO : Create a route to get all Company documents from the database.
   │        ├─ line 3: TODO : Create a route to get a single Company document from the database.
   │        ├─ line 4: TODO : Create a route to update a single Company document in the database.
   │        └─ line 5: TODO : Create a route to delete a single Company document from the database.
   └─ README.md
      ├─ line 9: [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
      ├─ line 10: [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
      ├─ line 11: [x] Finish basic Book schema and model. For faster functional development and testing purposes.
      ├─ line 12: [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
      ├─ line 13: [x] Set up company scheme.
      ├─ line 14: [x] Set up company model.
      ├─ line 15: [ ] Actualize, complete and correct Company scheme documentation.
      ├─ line 16: [ ] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
      ├─ line 17: [ ] Set up GET, POST, PUT and DELETE Book server routes.
      ├─ line 18: [ ] Link Backend To
      ├─ line 19: [ ] Make planning and prioritize things TODO first.
      ├─ line 20: [ ] Finish company `required:` values to correct Boolean value.
      └─ line 21: [ ] Set up GET, POST, PUT and DELETE Company server routes.

```

## Express.js Backend:
