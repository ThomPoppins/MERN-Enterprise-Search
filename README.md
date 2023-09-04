# MERN Stack Project

## Company Schema:

The schema contains a **lot** of TODO's, because I'm still figuring out how to structure the database and this shows my thought process the most without having to rewrite all TODO's this early in the process.

- [x] Copy paste company schema from companyModel.js to README.md.

```
/**
 * Company Schema:
 * Create a new company schema for our database.
 * The schema defines the shape of documents in a collection.
 * In this case, a company will have a name property of type String.
 * The name property is required, which means that every company document must have a name.
 * Same goes for the author and publishYear properties, only the publishYear property is of type Number.
 * timestamps: true adds createdAt and updatedAt properties to the company document.
 * createdAt is the date and time when the company document was created.
 * updatedAt is the date and time when the company document was last updated.
 * These properties are useful for debugging purposes.
 * For example, if a company document was created a long time ago and it has not been updated since,
 * then it is probably safe to delete it.
 * If a company document was created a long time ago and it has been updated recently,
 * then it is probably still in use and should not be deleted.
 * The timestamps option is not required, but it is useful.
 * @typedef {Object} CompanySchema
 * @property {string} name - The name of the company.
 * @property {Array} owners - An array of owner objects with an userId.
 * @property {Array} addresses - An array of address objects with an addressId.
 * @property {number} startedInYear - The year the company was started.
 * @property {boolean} stillActive - Is the company active at THIS moment?
 * @property {string} slogan - Company slogan.
 * @property {string} description - Short description of the company.
 * @property {string} industry - The industry the company is in. (The type of field it is operational in.)
 * @property {boolean} isPublic - Is the company public or private at THIS moment?
 * @property {Array} reviews - An array of review objects with an reviewId.
 * @property {number} rating - Rating of the company. Will be calculated based on the reviews property "ratings". This will only show on the profile page when some (10 or more) reviews with ratings are present. (reviews.length > 10 maybe)
 * @property {Object} linkedCustomers - Users that want to be affiliated with the company so they can profit of special company's benefits in exchange for a review/rating or something else.
 * @property {boolean} isPremium - Is the company a bronze, silver, gold or platinum premium company? Does it pay for extra features? True or false.
 * @property {string} premiumKind - "premiumKind" is "bronze", "silver", "gold", "platinum" or "astronomical"?
 * @property {boolean} isVendor - Is this company a vendor itself? True or false.
 * @property {Array} associatedVendors - An array of vendor objects with an vendorId (and userId?).
 */

const companySchema = new mongoose.Schema(
  {
    // TODO: Investigate the usefulness of generating an id myself.
    name: {
      type: String,
      required: true,
    },
    // TODO: Create a new schema and model for user and one for owner.
    // TODO: Save the name , email, phone, and role properties in a new user model. (to be created)
    // TODO: Users will be linked to a company, based on an userId in the owner model.
    // TODO: "owners" array should contain owner objects with an userId.
    owners: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for address.
    // TODO: Addresses will be linked to a company, based on an addressId in the address model.
    // TODO: "addresses" array should contain address objects with an addressId.
    addresses: {
      type: Array,
      required: true,
    },
    // The year the company was started.
    startedInYear: {
      type: Number,
      required: true,
    },
    // Is the company active at THIS moment?
    stillActive: {
      type: Boolean,
      required: true,
    },
    // company slogan
    slogan: {
      type: String,
      required: false,
    },
    // Short description of the company.
    description: {
      type: String,
      required: false,
    },
    // TODO: Create a new schema and model for type of industries, so that the user can select from a list of industries, or add a new one.
    // TODO: Industries will be linked to a company, based on an industryId in the industry model.
    // TODO: Create collection of industries, and link the companies in a companies[] property, which should contain company id's of the companies.
    // The industry the company is in. (The type of field it is operational in.)
    industry: {
      type: String,
      required: false,
    },
    // Is the company public or private at THIS moment?
    // TODO: Make it possible to change this value in the user/owner settings.
    isPublic: {
      type: Boolean,
      required: true,
    },
    // TODO: Create review schema and model.
    // TODO: Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
    // TODO: "reviews" array should contain review objects with an reviewId.
    reviews: {
      type: Array,
      required: true,
    },
    // Rating of the company. Will be calculated based on the reviews property "ratings". This will only show on the profile page when some (10 or more) reviews with ratings are present. (reviews.length > 10 maybe)
    rating: {
      type: Float,
      required: false,
    },
    // Users that want to be affiliated with the company so they can profit of special company's benefits in exchange for a review/rating or something else.
    linkedCustomers: {
      type: Object,
      required: true,
    },
    // Is the company a bronze, silver, gold or platinum premium company? Does it pay for extra features? True or false.
    isPremium: {
      type: Boolean,
      required: true,
    },
    // "premiumKind" is "bronze", "silver", "gold", "platinum" or "astronomical"? TODO: Decide on the premium names, which features they have, and how much they cost and how to pay for them.
    // TODO: Create a new schema and model for premium types. Premium types will be linked to a company, based on an premiumTypeId in the premiumType model.
    // TODO:
    premiumKind: {
      type: String,
      required: false,
    },
    // TODO: Create a new schema and model for vendors. Decide what kind of vendors there are, and what properties they need. Vendors are the business to business users and can possibly be linked to a company, based on an vendorId in the vendor model.
    // TODO: Decide what kind of functionalities and authorizations vendors have.
    // Is this company a vendor itself? True or false.
    isVendor: {
      type: Boolean,
      required: true,
    },
    // "associatedVendors" is an array of vendor objects with an vendorId (and userId?).
    associatedVendors: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for employees. Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities. The key difference between owner and employee is the authorization to change company (profile and project association) settings.
    // TODO: Employees will be linked to a company, based on an employeeId in the employee model. (and userId?)
    // Linked employees.
    linkedEmployees: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for stories. Stories will be linked to a company, to read on their profile page. Stories will contain a title, text, image, linked customer, linked employees, linked vendors, linked products, linked services, linked projects, and more.

    stories: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for projects. It should be possible for different companies to be associated to a project. (many-to-many relationship) A project page should also have a storyline of stories linked to companies, employees, associated customers, reviews and more.
    // TODO: IMPORTANT! Find out how to use a "junction table" to link companies to projects. (many-to-many relationship)
    // "projects" is an array of project objects with an projectId.
    projects: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for products. If more than one company would associate to a product, they have to create a project together and work from there. The products from a project should also (optionally) be visible on the associated company profiles.
    // TODO: A company product listing page should have a search bar, and a filter for industry, rating, price, and more.
    // TODO: It should be possible to search for products without having to visit a company profile. (search bar on the home page)
    // TODO: Make product listing something companies can pay for. (premium feature) IMPORTANT: Make sure that the users finds what they search for, that should have BIG priority over paid listings that will feel unpleasant and not logical.
    // TODO: A product page should also have reviews from customers. (maybe also from employees and vendors?)
    // TODO: IMPORTANT! Find out how to use a "junction table" to link companies to products and products to projects. (many-to-many relationship)
    // "products" is an array of product objects with an productId.
    products: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for services. If more than one company would associate to a service, they have to create a project together and work from there. The services from a project should also (optionally) be visible on the associated company profiles.
    // TODO: Make it possible for users to contact a company for about a service with chat and video call (maybe chat and video calls should be a premium features, decide about this later).
    // TODO: A appointment can be made with a company, with the advantage that the service delivered to the customer can be linked to a story on the company/project profile page. The customer, employee, vendor, product, service, and more can be linked to the story and leave their part of the message, this way a customer (user) can maybe have a beneficial price in return for a review with rating.
    // TODO: Think about how to make appointments with companies, how the agenda model and schema should look like, and how to link appointments to stories.
    linkedServices: {
      type: Object,
      required: true,
    },
    // TODO: Create a new schema and model for appointments. Appointments will be linked to a company or project, based on an appointmentId in the appointment model. (and maybe userId's? or employeeId's)
    // TODO: Make it possible for employees to respond on service contact chat/video call requests, and make appointments with customers. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
    appointments: {
      type: Array,
      required: true,
    },
    // TODO: Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
    // TODO: Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
    // TODO: Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
    // TODO: Make functionalities so companies can share the revenue of a project's products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
    // TODO: Make it possible for companies associated to projects to share revenue per service or product.
    // TODO: Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
    // TODO: Make it possible to share revenue based on which company performs the service.
    linkedProjects: {
      type: Object,
      required: true,
    },
  },
  // enable timestamps
  { timestamps: true }
);
```
