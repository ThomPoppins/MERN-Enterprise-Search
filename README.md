# MERN Stack Project

## Express.js Backend:

### Company Schema:

The schema contains a **lot** of TODO's, because I'm still figuring out how to structure the database and this shows my thought process about my ideas and how I want to implement them. I hope you find this interesting and if you have any suggestions, or want to help me realize this huge project I'm planning to develop, please contact me at **thompoppins@gmail.com**.\

- [x] Install nodemon, Express.js and Mongoose and connect Mongoose to the MongoDB database.
- [x] Express.js server listens to PORT 5555 after successful connection to MongoDB database.
- [x] Finish basic Book schema and model. For faster functional development and testing purposes.
- [x] Set up TODO list while completing the company schema and model to get a good view of the requirements of all Company linked business logic.
- [x] Set up company scheme.
- [x] Set up company model.
- [ ] Actualize, complete and correct Company scheme documentation.
- [ ] Avoid working with the complex Company scheme in early stage of development. Work with Book scheme instead until later when ready.
- [ ] Set up GET, POST, PUT and DELETE Book server routes.
- [ ] Link Backend To
- [ ] Make planning and prioritize things TODO first.
- [ ] Finish company `required:` values to correct Boolean value.
- [ ] Set up GET, POST, PUT and DELETE Company server routes.

```javascript
└─ MERN-stack-project
   ├─ backend
   │  ├─ models
   │  │  ├─ bookModel.js
   │  │  │  └─ line 17: TODO : Delete this schema once it is no longer needed.
   │  │  └─ companyModel.js
   │  │     ├─ line 28: TODO : Investigate the usefulness of generating an id myself.
   │  │     ├─ line 59: TODO : Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
   │  │     ├─ line 78: TODO : Create a new schema and model for user and one for owner.
   │  │     ├─ line 79: TODO : Save the name , email, phone, and role properties in a new user model. (to be created)
   │  │     ├─ line 80: TODO : Owners  will be linked to a company, based on an ownerId in the owner model.
   │  │     ├─ line 81: TODO : "owners" array should contain owner objects with an userId.
   │  │     ├─ line 86: TODO : Create a new schema and model for admin users.
   │  │     ├─ line 87: TODO : Admin users will be linked to a company, based on an adminUserId in the adminUser model.
   │  │     ├─ line 88: TODO : "admins" array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
   │  │     ├─ line 93: TODO : Create a new schema and model for roles.
   │  │     ├─ line 94: TODO : Roles will be linked to a company (or project), based on an roleId in the role model.
   │  │     ├─ line 100: TODO : Create a new schema and model for address.
   │  │     ├─ line 101: TODO : Locations will be linked to a company, based on an addressId in the address model.
   │  │     ├─ line 102: TODO : "locations" array should contain address objects with all address fields an addressId.
   │  │     ├─ line 112: TODO : Find out how to validate correct business and payment details.
   │  │     ├─ line 113: TODO : Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
   │  │     ├─ line 147: TODO : Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
   │  │     ├─ line 170: TODO : Create a new schema and model for type of industries, so that the user can select from a list of industries, or add a new one.
   │  │     ├─ line 171: TODO : Industries will be linked to a company, based on an industryId in the industry model.
   │  │     ├─ line 172: TODO : Create collection of industries, and link the companies in a companies[] property, which should contain company id's of the companies.
   │  │     ├─ line 179: TODO : Make it possible to change this value in the user/owner settings.
   │  │     ├─ line 184: TODO : Create review schema and model.
   │  │     ├─ line 185: TODO : Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
   │  │     ├─ line 186: TODO : "reviews" array should contain review objects with an reviewId.
   │  │     ├─ line 207: TODO : Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
   │  │     ├─ line 208: TODO :
   │  │     ├─ line 213: TODO : Create a new schema and model for vendors. Decide what kind of vendors there are, and what properties they need. Vendors are the business to business users and can possibly be linked to a company, based on an vendorId in the vendor model.
   │  │     ├─ line 214: TODO : Decide what kind of functionalities and authorizations vendors have.
   │  │     ├─ line 225: TODO : Create a new schema and model for employees. Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities. The key difference between owner and employee is the authorization to change company (profile and project association) settings.
   │  │     ├─ line 226: TODO : Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
   │  │     ├─ line 232: TODO : Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.
   │  │     ├─ line 238: TODO : Create a new schema and model for projects. It should be possible for different companies to be associated to a project. (many-to-many relationship) A project page should also have a storyline of stories linked to companies, employees, associated customers, reviews and more.
   │  │     ├─ line 239: TODO : IMPORTANT! Find out how to use a "junction table" to link companies to projects. (many-to-many relationship)
   │  │     ├─ line 245: TODO : Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
   │  │     ├─ line 246: TODO : A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
   │  │     ├─ line 247: TODO : It should be possible to search for products without having to visit a company profile. (search bar on the home page)
   │  │     ├─ line 248: TODO : Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
   │  │     ├─ line 249: TODO : A product page should also have reviews from customers. (maybe also from employees and vendors?)
   │  │     ├─ line 250: TODO : IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
   │  │     ├─ line 256: TODO : Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
   │  │     ├─ line 257: TODO : Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
   │  │     ├─ line 258: TODO : A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
   │  │     ├─ line 259: TODO : Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
   │  │     ├─ line 260: TODO : IMPORTANT! Find out how to use a "junction table" to link companies and projects to services. (many-to-many relationship)
   │  │     ├─ line 266: TODO : Create a new schema and model for `appointment`. An appointment will be linked to a company or project, based on an appointmentId in the appointment model. Employees, users, vendors, products, a service and more can be linked to an appointment.
   │  │     ├─ line 271: TODO : Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │     ├─ line 272: TODO : Create message schema and model. Messages will be linked to a company, based on an messageId in the message model. This model should contain the message text, timestamp, and more. Messages will be linked to a company, based on an messageId in the message model. This is a one-to-many relationship, between company and messages OR project and messages. It should not be hard to switch between the `company messenger inbox` and the `project messenger inbox`.
   │  │     ├─ line 273: TODO : Create messenger functionality and use encryption for the privacy and security of the messages. Never store the encryption key in the database, only encrypt and decrypt the messages in the frontend. (Use a library for this)
   │  │     ├─ line 276: TODO : Make it possible for normal users to send messages to a company, project or employee. Make it possible for employees to respond to messages from users.
   │  │     ├─ line 277: TODO : Make it possible for vendors to send messages to a company, project or employee. (Employees have to be authorized by the company (main) owner to connect with vendors). Make it possible for (authorized) employees, owners and companies to respond to messages from vendors.
   │  │     ├─ line 278: TODO : Build a sharable functionality (a link to each functionality, agreement, project, product, revenue agreement, appointment or whatever) in all features where it is possible to communicate about between 2 related users. Make it possible to share a link from one to another if both users (companies, owners, (authorized) employees, project associates or whichever other user that is associated to each other in that specific "thing" they use, share (or possibly CAN share), or whatever way they (can) relate to each other for EVERY possible functionality and feature I can think of to be USEFUL and NOT too distracting from ANY more important things (functionalities or features).
   │  │     ├─ line 284: TODO : GOOD IDEA: Maybe it is possible to save the agenda data in a separate agenda model and schema, and link the agenda to the company, project or user. (one-to-one relationship) And think about how to link the agenda  to `company`, `project`` and even `user` schemes and models.
   │  │     ├─ line 290: TODO : Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
   │  │     ├─ line 291: TODO : Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
   │  │     ├─ line 292: TODO : Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
   │  │     ├─ line 293: TODO : Make functionalities so companies can share the revenue of a project's products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
   │  │     ├─ line 294: TODO : Make it possible for companies associated to projects to share revenue per service or product.
   │  │     ├─ line 295: TODO : Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
   │  │     └─ line 296: TODO : Make it possible to share revenue based on which company performs the service.
   │  ├─ routes
   │  │  ├─ booksRoute.js
   │  │  │  ├─ line 21: TODO : Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
   │  │  │  └─ line 22: TODO : If the book already exists, send status 409 response and a (error) message to inform the client.
   │  │  └─ companiesRoute.js
   │  │     ├─ line 1: TODO : Create a route to save a new Company document in the database.
   │  │     ├─ line 2: TODO : Create a route to get all Company documents from the database.
   │  │     ├─ line 3: TODO : Create a route to get a single Company document from the database.
   │  │     ├─ line 4: TODO : Create a route to update a single Company document in the database.
   │  │     └─ line 5: TODO : Create a route to delete a single Company document from the database.
   │  └─ index.js
   │     ├─ line 16: TODO : Create a route to save a new Company document in the database.
   │     ├─ line 17: TODO : Create a route to get all Company documents from the database.
   │     ├─ line 18: TODO : Create a route to get a single Company document from the database.
   │     ├─ line 19: TODO : Create a route to update a single Company document in the database.
   │     ├─ line 20: TODO : Create a route to delete a single Company document from the database.
   │     ├─ line 37: TODO : Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
   │     └─ line 38: TODO : If the book already exists, send status 409 response and a (error) message to inform the client.
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
      ├─ line 21: [ ] Set up GET, POST, PUT and DELETE Company server routes.
      ├─ line 61: TODO : Investigate the usefulness of generating an id myself.
      ├─ line 72: TODO : Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
      ├─ line 91: TODO : Create a new schema and model for user and one for owner.
      ├─ line 92: TODO : Save the name , email, phone, and role properties in a new user model. (to be created)
      ├─ line 93: TODO : Owners  will be linked to a company, based on an ownerId in the owner model.
      ├─ line 94: TODO : "owners" array should contain owner objects with an userId.
      ├─ line 99: TODO : Create a new schema and model for admin users.
      ├─ line 100: TODO : Admin users will be linked to a company, based on an adminUserId in the adminUser model.
      ├─ line 101: TODO : "admins" array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
      ├─ line 106: TODO : Create a new schema and model for roles.
      ├─ line 107: TODO : Roles will be linked to a company (or project), based on an roleId in the role model.
      ├─ line 113: TODO : Create a new schema and model for address.
      ├─ line 114: TODO : Locations will be linked to a company, based on an addressId in the address model.
      ├─ line 115: TODO : "locations" array should contain address objects with all address fields an addressId.
      ├─ line 125: TODO : Find out how to validate correct business and payment details.
      ├─ line 126: TODO : Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
      ├─ line 160: TODO : Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
      ├─ line 192: TODO : Create a new schema and model for type of industries, so that the user can select from a list of industries, or add a new one.
      ├─ line 193: TODO : Industries will be linked to a company, based on an industryId in the industry model.
      ├─ line 194: TODO : Create collection of industries, and link the companies in a companies[] property, which should contain company id's of the companies.
      ├─ line 201: TODO : Make it possible to change this value in the user/owner settings.
      ├─ line 206: TODO : Create review schema and model.
      ├─ line 207: TODO : Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
      ├─ line 208: TODO : "reviews" array should contain review objects with an reviewId.
      ├─ line 229: TODO : Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
      ├─ line 230: TODO :
      ├─ line 235: TODO : Create a new schema and model for vendors. Decide what kind of vendors there are, and what properties they need. Vendors are the business to business users and can possibly be linked to a company, based on an vendorId in the vendor model.
      ├─ line 236: TODO : Decide what kind of functionalities and authorizations vendors have.
      ├─ line 247: TODO : Create a new schema and model for employees. Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities. The key difference between owner and employee is the authorization to change company (profile and project association) settings.
      ├─ line 248: TODO : Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
      ├─ line 254: TODO : Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.
      ├─ line 260: TODO : Create a new schema and model for projects. It should be possible for different companies to be associated to a project. (many-to-many relationship) A project page should also have a storyline of stories linked to companies, employees, associated customers, reviews and more.
      ├─ line 261: TODO : IMPORTANT! Find out how to use a "junction table" to link companies to projects. (many-to-many relationship)
      ├─ line 267: TODO : Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
      ├─ line 268: TODO : A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
      ├─ line 269: TODO : It should be possible to search for products without having to visit a company profile. (search bar on the home page)
      ├─ line 270: TODO : Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
      ├─ line 271: TODO : A product page should also have reviews from customers. (maybe also from employees and vendors?)
      ├─ line 272: TODO : IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
      ├─ line 278: TODO : Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
      ├─ line 279: TODO : Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
      ├─ line 280: TODO : A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
      ├─ line 281: TODO : Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
      ├─ line 282: TODO : IMPORTANT! Find out how to use a "junction table" to link companies and projects to services. (many-to-many relationship)
      ├─ line 288: TODO : Create a new schema and model for `appointment`. An appointment will be linked to a company or project, based on an appointmentId in the appointment model. Employees, users, vendors, products, a service and more can be linked to an appointment.
      ├─ line 293: TODO : Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
      ├─ line 294: TODO : Create message schema and model. Messages will be linked to a company, based on an messageId in the message model. This model should contain the message text, timestamp, and more. Messages will be linked to a company, based on an messageId in the message model. This is a one-to-many relationship, between company and messages OR project and messages. It should not be hard to switch between the `company messenger inbox` and the `project messenger inbox`.
      ├─ line 295: TODO : Create messenger functionality and use encryption for the privacy and security of the messages. Never store the encryption key in the database, only encrypt and decrypt the messages in the frontend. (Use a library for this)
      ├─ line 298: TODO : Make it possible for normal users to send messages to a company, project or employee. Make it possible for employees to respond to messages from users.
      ├─ line 299: TODO : Make it possible for vendors to send messages to a company, project or employee. (Employees have to be authorized by the company (main) owner to connect with vendors). Make it possible for (authorized) employees, owners and companies to respond to messages from vendors.
      ├─ line 300: TODO : Build a sharable functionality (a link to each functionality, agreement, project, product, revenue agreement, appointment or whatever) in all features where it is possible to communicate about between 2 related users. Make it possible to share a link from one to another if both users (companies, owners, (authorized) employees, project associates or whichever other user that is associated to each other in that specific "thing" they use, share (or possibly CAN share), or whatever way they (can) relate to each other for EVERY possible functionality and feature I can think of to be USEFUL and NOT too distracting from ANY more important things (functionalities or features).
      ├─ line 306: TODO : GOOD IDEA: Maybe it is possible to save the agenda data in a separate agenda model and schema, and link the agenda to the company, project or user. (one-to-one relationship) And think about how to link the agenda  to `company`, `project`` and even `user` schemes and models.
      ├─ line 312: TODO : Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
      ├─ line 313: TODO : Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
      ├─ line 314: TODO : Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
      ├─ line 315: TODO : Make functionalities so companies can share the revenue of a project's products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
      ├─ line 316: TODO : Make it possible for companies associated to projects to share revenue per service or product.
      ├─ line 317: TODO : Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
      └─ line 318: TODO : Make it possible to share revenue based on which company performs the service.
```
