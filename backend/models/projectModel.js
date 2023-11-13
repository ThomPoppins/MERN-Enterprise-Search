import mongoose from "mongoose";

/*
 * TODO: [MERNSTACK-43] Create a new schema and model for projects.
 * TODO: [MERNSTACK-63] Create a new schema and model for projects. Projects will be linked to a company, based on an projectId in the project model. (and maybe userId's? or employeeId's)
 * TODO: [MERNSTACK-64] Make it possible to create and design a project profile page, with a storyline of stories linked to companies, employees, associated customers, reviews, ratings and more. Authorize employees to change project settings. (premium feature? Maybe "bronze": 2 employees, "silver": 5 employees, "gold": 10 employees, "platinum": 20 employees, "astronomical": unlimited, something like that.)
 * TODO: [MERNSTACK-65] Create functionalities for companies to automatically share costs for premium features, based on a percentage all associated companies have to agree on for this to work.
 * TODO: [MERNSTACK-66] Make functionalities so companies can share the revenue of a project's products and services, based on a percentage all associated companies have to agree on for this to work, or share revenue based on the assigned employees (from a specific company) that are associated to the delivered products and services.
 * TODO: [MERNSTACK-67] Make it possible for companies associated to projects to share revenue per service or product.
 * TODO: [MERNSTACK-68] Make it possible to configure revenue sharing per product, per service based on from which profile page the product or service was ordered.
 * TODO: [MERNSTACK-69] Make it possible to share revenue based on which company performs the service.
 */

/**
 * Mongoose Schema for the Project Model
 * @typedef {object} ProjectSchema
 * @property {string} name - The name of the project.
 * @property {string} email - Project email address for correspondence.
 * @property {string} phone - Project contact phone number.
 * @property {string} slogan - The slogan of the project.
 * @property {string} description - Short description of the company.
 * @property {object} address - Registered address of the project.
 * @property {object} billingAddress - Address for sending invoices.
 * @property {object} addressFormat - Format for displaying the address.
 * @property {string} country - Country of the project billing address.
 * @property {string} region - Region of the project billing address.
 * @property {string[]} projectAdmins - Array of project administrators.
 * @property {string[]} locations - Array of project locations.
 * @property {object} businessConfigFormat - Object defining required payment details by country or region.
 * @property {object[]} departments - Array of linked departments.
 * @property {object} businessConfig - Configurable settings for company owners and admins.
 * @property {object} paymentDetails - Payment details for different countries or regions.
 * @property {number} startYear - Year the company was started.
 * @property {boolean} active - Indicates if the project is currently active.
 * @property {string} industries - Industries associated with the project.
 * @property {boolean} public - Indicates if the project is public or private.
 * @property {object[]} reviews - Array of project reviews.
 * @property {number} rating - Overall rating of the project.
 * @property {object[]} customers - Array of affiliated customers.
 * @property {string} premium - Type of premium status (e.g., bronze, silver).
 * @property {object} vendor - Vendor information associated with the project.
 * @property {object[]} employees - Array of employees linked to the project.
 * @property {object[]} stories - Array of project stories.
 * @property {object[]} products - Array of products associated with the project.
 * @property {object[]} services - Array of services offered by the project.
 * @property {object[]} agenda - Array of agenda items.
 * @property {object[]} appointments - Array of project appointments.
 * @property {object[]} messages - Array of project messages.
 * @property {object[]} notifications - Array of project notifications.
 * @property {object[]} events - Array of project events.
 * @property {object[]} tasks - Array of project tasks.
 * @property {object[]} invoices - Array of project invoices.
 * @property {object[]} orders - Array of project orders.
 * @property {object[]} payments - Array of project payments.
 * @property {string} mainImageId - ID of the main image associated with the project.
 * @property {object[]} images - Array of images associated with the project.
 * @property {Date} createdAt - Timestamp for when the project was created.
 * @property {Date} updatedAt - Timestamp for when the project was last updated.
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Project email address for correspondence directed to the project with this application.
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
    // Project slogan
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
    /*
     * Registered address of the project.
     * For example: { street: "Dr Poletlaan", number: "67-006", postalCode: "5626NC", city: "Eindhoven", country: "NL" }
     */
    address: {
      type: Object,
      required: false,
      default: {},
    },
    /*
     * Adress to send invoices to.
     * For example: { street: "Dr Poletlaan", number: "67-006", postalCode: "5626NC", city: "Eindhoven", country: "NL" }
     */
    billingAddress: {
      type: Object,
      required: false,
      default: {},
    },
    /*
     * "addressFormat" will be used to format the address in the correct way for the country and regional address format.
     * For example: if the country is the Netherlands, the `addressFormat` should be { country: "NL", region: "" }, because there are not regional address format differences in the Netherlands.
     */
    addressFormat: {
      type: Object,
      required: false,
      default: {},
    },
    // Country of the project billing address. For example: "NL" for the Netherlands.
    country: {
      type: String,
      required: false,
      default: "NL",
    },
    // Region of the project billing address. For example: "Texas" for Texas in the US.
    region: {
      type: String,
      required: false,
      default: "",
    },
    projectAdmins: {
      type: Array,
      required: false,
      default: [],
    },
    /*
     * Employees: {
     *   type: Array,
     *   required: false,
     * },
     */
    locations: {
      type: Array,
      required: false,
      default: [],
    },
    /*
     * Format of which payment options and details are required for the country or region.
     * `businessConfigFormat` will be a object with property `countryCode`, for example `NL` for the Netherlands, and the value will be an object with the required payment details for that country or region.
     * The required payment details will be booleans, true or false.
     * The required payment details will be used to validate the payment details of a company.
     * `businessConfigFormat` Object example (way to):
     * {
     *   "NL": {
     *     "vatNumber": true,
     *     "iban": true,
     *     "bic": true,
     *     "kvkNumber": true,
     *     "btwNumber": true,
     *     "taxNumber": true,
     *     "taxOffice": true,
     *     "taxOfficeAddress": true,
     *     "taxOfficePostalCode": true,
     *     "taxOfficeCity": true,
     *     "taxOfficeCountry": true,
     *     "taxOfficePhone": true,
     *     "taxOfficeEmail": true,
     *     "taxOfficeWebsite": true,
     *     "taxOfficeContactPerson": true,
     *     "taxOfficeContactPersonPhone": true,
     *     "taxOfficeContactPersonEmail": true,
     *     "taxOfficeContactPersonWebsite": true,
     *     "taxOfficeContactPersonAddress": true,
     *     "taxOfficeContactPersonPostalCode": true,
     *     "taxOfficeContactPersonCity": true,
     *     "taxOfficeContactPersonCountry": true,
     *     "taxOfficeContactPersonRole": true,
     *     "taxOfficeContactPersonDepartment": true,
     *     "taxOfficeContactPersonFax": true,
     *     "taxOfficeContactPersonMobile": true,
     *     "taxOfficeContactPersonGender": true,
     *     "taxOfficeContactPersonBirthDate": true,
     *     }
     * }
     * `departments` is an array of objects with an departmentId. Many departments can be linked to a project. many-to-one relationship.
     */
    departments: {
      type: Array,
      required: false,
      default: [],
    },
    // Object of configurable settings that `company` owners and admins can change.
    businessConfig: {
      type: Object,
      required: false,
      default: {},
    },
    /*
     * `paymentDetails` will be a object with property `countryCode`, for example `NL` for the Netherlands, and the value will be an object with the payment details for that country or region.
     * For example: { paymentMethodId: 0, vatNumber: "", iban: "", creditCard: { number: "", securityCode: "" }, bic: "", kvkNumber: "", taxNumber: "", taxOffice: "Belastingdienst", taxOfficeAddress: "Parnassusweg 5", taxOfficePostalCode: "1077 DC", taxOfficeCity: "Amsterdam", taxOfficeCountry: "NL", taxOfficePhone: "", taxOfficeEmail: "", }
     */
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
    // Is the project active at THIS moment? True or false.
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    industries: {
      type: Array,
      required: false,
      default: [],
    },
    // Is the project public or private at THIS moment?
    public: {
      type: Boolean,
      required: false,
      default: true,
    },
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
    /*
     * Users that want to be affiliated with the company so they can profit of special company's benefits in exchange for a review/rating or something else.
     * `customers` is an array of objects with customerId corresponding with the `id` of the Customer model.
     */
    customers: {
      type: Array,
      required: false,
      default: [],
    },
    /*
     * "premium" will be the premiumTypeName "none" "bronze", "silver", "gold" or "platinum" corresponding with the premiumType model?
     * `premium` is the id of the premium type in the corresponding premium type model.
     */
    premium: {
      type: String,
      required: false,
      default: "none",
    },
    // Is this project a vendor? This will be a object containing the vendorId corresponding with the Vendor model. (one-to-one relationship)
    vendor: {
      type: Object,
      required: false,
      default: {},
    },
    /*
     * AssociatedVendors: {
     *   type: Array,
     *   required: false,
     * },
     * `employees` is an array of employee objects with an employeeId corresponding with the `id` in the Employee model.
     */
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
  // Enable timestamps
  { timestamps: true }
);
/*
 * Project model:
 * Create a new model using the companySchema.
 * A model is a class with which we construct documents.
 * In this case, a project will be a document in our MongoDB database.
 */
export const Project = mongoose.model("Project", projectSchema);
