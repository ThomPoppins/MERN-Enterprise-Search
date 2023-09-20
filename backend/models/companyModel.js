import mongoose from "mongoose";

/**
 * Mongoose Schema for Company
 *
 * This schema defines the structure for storing detailed information about a company in the database.
 * It encompasses various aspects such as contact details, addresses, billing information, owners, admins, and more.
 * Several TODOs are marked for future enhancements and integrations with related models.
 *
 * @typedef {Object} CompanySchema
 * @property {string} name - The name of the company.
 * @property {string} email - The email address for company correspondence).
 * @property {string} phone - The contact phone number for the company.
 * @property {string} kvkNumber - KVK number of the company (optional).
 * @property {boolean} kvkValidated - Validation status of the KVK number (default: false).
 * @property {string} slogan - A slogan associated with the company.
 * @property {string} description - A short description of the company.
 * @property {Object} address - Registered address of the company (optional).
 * @property {Object} billingAddress - Address for sending invoices (optional).
 * @property {Object} addressFormat - Format for the company's address (optional).
 * @property {string} country - Country of the company billing address (optional).
 * @property {string} region - Region of the company billing address (optional).
 * @property {Array} owners - Array of owner objects linked to the company (optional).
 * @property {Array} companyAdmins - Array of admin objects linked to the company (optional).
 * @property {Array} departments - Array of departments associated with the company (optional).
 * @property {Object} businessConfig - Configurable settings for owners and admins (optional).
 * @property {Object} paymentDetails - Payment details for different countries or regions (optional).
 * @property {number} startYear - The year the company was started (optional).
 * @property {boolean} active - Current activity status of the company (optional).
 * @property {string} industry - Industry associated with the company (optional).
 * @property {boolean} public - Public or private status of the company (optional).
 * @property {Array} reviews - Array of review objects linked to the company (optional).
 * @property {number} rating - Calculated rating based on reviews (optional).
 * @property {Array} customers - Array of customers affiliated with the company (optional).
 * @property {string} premium - Premium type associated with the company (optional).
 * @property {Object} vendor - Vendor information linked to the company (optional).
 * @property {Array} employees - Array of employee objects linked to the company (optional).
 * @property {Array} stories - Array of stories associated with the company (optional).
 * @property {Array} products - Array of product objects linked to the company (optional).
 * @property {Array} services - Array of service objects linked to the company (optional).
 * @property {Array} appointments - Array of appointment objects linked to the company (optional).
 * @property {Array} messages - Array of message objects linked to the company (optional).
 * @property {Array} notifications - Array of notification objects linked to the company (optional).
 * @property {Array} events - Array of event objects linked to the company (optional).
 * @property {Array} agenda - Array of agenda objects linked to the company (optional).
 * @property {Array} tasks - Array of task objects linked to the company (optional).
 * @property {Array} invoices - Array of invoice objects linked to the company (optional).
 * @property {Array} orders - Array of order objects linked to the company (optional).
 * @property {Array} payments - Array of payment objects linked to the company (optional).
 * @property {string} mainImage - URL of the main image associated with the company (optional).
 * @property {Array} images - Array of image URLs linked to the company (optional).
 * @property {Date} createdAt - Automatically generated timestamp for document creation.
 * @property {Date} updatedAt - Automatically updated timestamp for document modification.
 *
 * Several TODOs indicate planned enhancements and integrations for future development.
 */
const companySchema = new mongoose.Schema(
  {
    // TODO: [MERNSTACK-4] Investigate the usefulness of generating an id myself.
    name: {
      type: String,
      required: true,
    },
    // company email address for correspondence directed to the company with this application.
    // TODO: [MERNSTACK-134] Send confirmation e-mail to this address to verify the company email address.
    email: {
      type: String,
      required: true,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      default: "",
    },
    // `kvkNumber` contains the KVK number of the company
    kvkNumber: {
      type: String,
      required: true,
      default: "",
    },
    // kvk number is validated (with the correct owner and company name) by the KVK API. True or false.
    kvkValidated: {
      type: Boolean,
      required: true,
      default: false,
    },
    // company slogan
    slogan: {
      type: String,
      required: true,
      default: "",
    },
    // Short description of the company.
    description: {
      type: String,
      required: true,
      default: "",
    },
    // Registered address of the company.
    // For example: { street: "Dr Poletlaan", number: "67-006", postalCode: "5626NC", city: "Eindhoven", country: "NL" }
    address: {
      type: Object,
      required: false,
      default: {},
    },
    // Adress to send invoices to.
    // For example: { street: "Dr Poletlaan", number: "67-006", postalCode: "5626NC", city: "Eindhoven", country: "NL" }
    billingAddress: {
      type: Object,
      required: false,
      default: {},
    },
    // "addressFormat" will be used to format the address in the correct way for the country and regional address format.
    // TODO: [MERNSTACK-13] Create a new schema and model for address formats. Address formats will be linked to a company, based on an addressFormatId in the addressFormat model.
    // For example: if the country is the Netherlands, the `addressFormat` should be { country: "NL", region: "" }, because there are not regional address format differences in the Netherlands.
    addressFormat: {
      type: Object,
      required: false,
      default: {},
    },
    // Country of the company billing address. For example: "NL" for the Netherlands.
    country: {
      type: String,
      required: false,
      default: "NL",
    },
    // Region of the company billing address. For example: "Texas" for Texas in the US.
    region: {
      type: String,
      required: false,
      default: "",
    },
    // TODO: [MERNSTACK-15] Save the name , email, phone, and role related to the company as fields in a new user model. (to be created)
    owners: {
      type: Array,
      required: false,
      default: [],
    },
    // TODO: [MERNSTACK-18] Create a new schema and model for companyAdmin users.
    // TODO: [MERNSTACK-19] Admin users will be linked to a company, based on an adminUserId in the adminUser model.
    // TODO: [MERNSTACK-20] `admins` array should contain admin objects with an adminUserId. (For example: { adminUserId = "1234", role = "owner" })
    companyAdmins: {
      type: Array,
      required: false,
      default: [],
    },
    // TODO: [MERNSTACK-21] Create a new schema and model for Role with an roleId and role. For example: { roleId: { type: Number, required: true }, role: { type: String, required: true } } (roleId = 1, role = "owner") (roleId = 2, role = "admin") (roleId = 3, role = "employee") (roleId = 4, role = "vendor") (roleId = 5, role = "customer") (roleId = 6, role = "guest")
    // TODO: [MERNSTACK-22] Roles will be linked to company associated users like employees, vendors, customers, and more, based on an roleId in the role model.
    // TODO: [MERNSTACK-71] companyModel.js: Create `junction` table between companies and the role users have in this many-to-many relationship with the companies. Users can get assigned more than 1 role per company.
    // TODO: [MERNSTACK-72] Reconsider `employees` field if the role `junction` table is not the right place to store the `employee` data.
    // employees: {
    //   type: Array,
    //   required: false,
    // },
    // TODO: [MERNSTACK-23] Create a new schema and model for address.
    // TODO: [MERNSTACK-24] Locations will be linked to a company, based on an addressId in the address model.
    // TODO: [MERNSTACK-25] "locations" array should contain address objects with all address field fields and addressId compatible with the configured addressFormat for the country and region.
    locations: {
      type: Array,
      required: false,
      default: [],
    },
    // Format of which payment options and details are required for the country or region.
    // `businessConfigFormat` will be a object with property `countryCode`, for example `NL` for the Netherlands, and the value will be an object with the required payment details for that country or region.
    // The required payment details will be booleans, true or false.
    // The required payment details will be used to validate the payment details of a company.
    // TODO: [MERNSTACK-26] Find out how to validate correct business and payment details.
    // TODO: [MERNSTACK-27] Inform myself about the required payment details for each country or region. (First the Netherlands, then, maybe the rest of the world.)
    // `businessConfigFormat` Object example (way to):
    // {
    //   "NL": {
    //     "vatNumber": true,
    //     "iban": true,
    //     "bic": true,
    //     "kvkNumber": true,
    //     "btwNumber": true,
    //     "taxNumber": true,
    //     "taxOffice": true,
    //     "taxOfficeAddress": true,
    //     "taxOfficePostalCode": true,
    //     "taxOfficeCity": true,
    //     "taxOfficeCountry": true,
    //     "taxOfficePhone": true,
    //     "taxOfficeEmail": true,
    //     "taxOfficeWebsite": true,
    //     "taxOfficeContactPerson": true,
    //     "taxOfficeContactPersonPhone": true,
    //     "taxOfficeContactPersonEmail": true,
    //     "taxOfficeContactPersonWebsite": true,
    //     "taxOfficeContactPersonAddress": true,
    //     "taxOfficeContactPersonPostalCode": true,
    //     "taxOfficeContactPersonCity": true,
    //     "taxOfficeContactPersonCountry": true,
    //     "taxOfficeContactPersonRole": true,
    //     "taxOfficeContactPersonDepartment": true,
    //     "taxOfficeContactPersonFax": true,
    //     "taxOfficeContactPersonMobile": true,
    //     "taxOfficeContactPersonGender": true,
    //     "taxOfficeContactPersonBirthDate": true,
    //     }
    // }
    // `departments` is an array of objects with an departmentId. Many departments can be linked to a company. many-to-one relationship.
    departments: {
      type: Array,
      required: false,
      default: [],
    },
    // TODO: [MERNSTACK-28] Find out how to validate if the correct business and payment details are being used and the REAL "owner" is the only one authorized to change these details.
    // Object of configurable settings that `company` owners and admins can change.
    businessConfig: {
      type: Object,
      required: false,
      default: {},
    },
    // TODO:[MERNSTACK-75] Create paymentMethod schema and model.
    // `paymentDetails` will be a object with property `countryCode`, for example `NL` for the Netherlands, and the value will be an object with the payment details for that country or region.
    // For example: { paymentMethodId: 0, vatNumber: "", iban: "", creditCard: { number: "", securityCode: "" }, bic: "", kvkNumber: "", taxNumber: "", taxOffice: "Belastingdienst", taxOfficeAddress: "Parnassusweg 5", taxOfficePostalCode: "1077 DC", taxOfficeCity: "Amsterdam", taxOfficeCountry: "NL", taxOfficePhone: "", taxOfficeEmail: "", }
    paymentDetails: {
      type: Object,
      required: false,
      default: {},
    },
    // The year the company was started.
    startYear: {
      type: Number,
      required: false,
      default: 0,
    },
    // Is the company active at THIS moment? True or false.
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    // TODO: [MERNSTACK-29] Create a new schema and model for Industry. Industry will be linked to a company, based on an industryId in the industry model.
    // TODO: [MERNSTACK-76] RECONSIDER: Maybe a `junction` table between companies and the industries they are in is the right place to store necessary data for the specific companyIndustry relationships This extra data might be data like metadata that can be used to improve the result listing order of companies when searched by user in frontend.
    industry: {
      type: String,
      required: false,
      default: "",
    },
    // Is the company public or private at THIS moment?
    // TODO: [MERNSTACK-33] Make it possible to change this value in the user/owner settings.
    public: {
      type: Boolean,
      required: false,
      default: true,
    },
    // TODO: [MERNSTACK-35] Reviews will be linked to a company, based on an reviewId in the review model. This model should contain the review text, rating, reviewer, timestamp and maybe more.
    // TODO: [MERNSTACK-36] "reviews" array should contain review objects with an reviewId.
    reviews: {
      type: Array,
      required: false,
      default: [],
    },
    // Rating property would be the result of calculations based on the ratings given within together with the reviews (or given after being send a mail to user, asking them to rate the `service` or `product`.
    rating: {
      type: Number,
      required: false,
      min: 0,
      max: 5,
      default: 0,
    },
    // Users that want to be affiliated with the company so they can profit of special company's benefits in exchange for a review/rating or something else.
    // `customers` is an array of objects with customerId corresponding with the `id` of the Customer model.
    customers: {
      type: Array,
      required: false,
      default: [],
    },
    // "premium" will be the premiumTypeName "none" "bronze", "silver", "gold" or "platinum" corresponding with the premiumType model?
    // `premium` is the id of the premium type in the corresponding premium type model.
    premium: {
      type: String,
      required: false,
      default: "none",
    },
    // Is this company a vendor? This will be a object containing the vendorId corresponding with the Vendor model. (one-to-one relationship)
    vendor: {
      type: Object,
      required: false,
      default: {},
    },
    // associatedVendors: {
    //   type: Array,
    //   required: false,
    // },
    // `employees` is an array of employee objects with an employeeId corresponding with the `id` in the Employee model.
    employees: {
      type: Array,
      required: false,
      default: [],
    },
    stories: {
      type: Array,
      required: false,
      default: [],
    },
    // "products" is an array of product objects with an productId which is the `id` of the Product model.
    products: {
      type: Array,
      required: false,
      default: [],
    },
    // "services" is an array of service objects with an serviceId.
    services: {
      type: Array,
      required: false,
      default: [],
    },
    // `agenda` is an array of agenda objects with an agendaId corresponding with the Agenda model.
    agenda: {
      type: Array,
      required: false,
      default: [],
    },
    appointments: {
      type: Array,
      required: false,
      default: [],
    },
    // `messages` is an array of message objects with an messageId, corresponding userId, timestamp, and more.
    messages: {
      type: Array,
      required: false,
      default: [],
    },
    notifications: {
      type: Array,
      required: false,
      default: [],
    },
    // `events` is an array of event objects with an eventId.
    events: {
      type: Array,
      required: false,
      default: [],
    },
    // `tasks` is an array of task objects with an taskId.
    tasks: {
      type: Array,
      required: false,
      default: [],
    },
    // `invoices` is an array of invoice objects with an invoiceId corresponding with the Invoice model.
    invoices: {
      type: Array,
      required: false,
      default: [],
    },
    // `orders` is an array of order objects with an orderId corresponding with the Order model.
    orders: {
      type: Array,
      required: false,
      default: [],
    },
    // `payments` is an array of payment objects with an paymentId corresponding with the Payment model.
    payments: {
      type: Array,
      required: false,
      unique: true,
      default: [],
    },
    // `mainImage` is the image corresponding with the Image model id.
    mainImageId: {
      type: String,
      required: false,
      default: "",
    },
    // `images` is an array of image objects with an imageId corresponding with the Image model.
    images: {
      type: Array,
      required: false,
    },
  },
  // enable timestamps
  { timestamps: true }
);
// Company model:
// Create a new model using the companySchema.
// A model is a class with which we construct documents.
// In this case, a company will be a document in our MongoDB database.
export const Company = mongoose.model("Company", companySchema);

// TODO: [MERNSTACK-70] Decide what kind of functionalities and authorizations employees have. Owners should automatically have employee rights and functionalities.
