// use Mocha to test the API endpoints of the backend server companyRoute.js
//
// 1. Create a new test file called `companiesRoute.test.js` in the `backend/test` folder.
// 2. Import the `chai` and `chai-http` modules.
// 3. Import the `app` variable from `backend/server.js`.
// 4. Import the `Company` model from `backend/models/companyModel.js`.
// 5. Import the `v4` function from the `uuid` module.
// 6. Create a new test suite called `Companies API`.
// 7. Create a new test case called `should return all companies`.
// 8. Use the `chai.request(app)` function to make a `GET` request to the `/companies` endpoint.
// 9. Use the `expect` function to assert that the response status code is `200`.
// 10. Use the `expect` function to assert that the response body is an array.
// 11. Create a new test case called `should add a new company`.
// 12. Use the `chai.request(app)` function to make a `POST` request to the `/companies` endpoint.
// 13. Use the `send` function to send the following data in the request body:
// ```
// {
//   name: "Test Company",
//   address: "Test Address",
//   city: "Test City",
//   country: "Test Country",
//   email: "test@test",
//   phone: "123456789",
//   slogan: "Test Slogan",
//   description: "Test Description",
//   owners: ["Test Owner"],
//   companyAdmins: ["Test Admin"],
//   locations: ["Test Location"],
//   departments: ["Test Department"],
//   businessConfig: {
//     businessType: "Test Business Type",
//     businessSize: "Test Business Size",
//     businessAge: "Test Business Age",
//     businessActivity: "Test Business Activity",
//     businessActivityOther: "Test Business Activity Other",
//     businessActivityDescription: "Test Business Activity Description",
//     businessActivityDescriptionOther: "Test Business Activity Description Other"
//   },
//   paymentDetails: {
//     paymentMethodId: 0,
//     vatNumber: "Test VAT Number",
//     iban: "Test IBAN",
//     creditCard: {
//       number: "Test Credit Card Number",
//       securityCode: "Test Credit Card Security Code"
//     },
//     bic: "Test BIC",
//     kvkNumber: "Test KVK Number",
//     taxNumber: "Test Tax Number"
//   }
// }
// ```
// 14. Use the `expect` function to assert that the response status code is `201`.
// 15. Use the `expect` function to assert that the response body is an object.
// 16. Use the `expect` function to assert that the response body has the following properties:
// ```
// {
//   name: "Test Company",
//   address: "Test Address",
//   city: "Test City",
//   country: "Test Country",
//   email: "test@test",
//   phone: "123456789",
//   slogan: "Test Slogan",
//   description: "Test Description",
//   owners: ["Test Owner"],
//   companyAdmins: ["Test Admin"],
//   locations: ["Test Location"],
//   departments: ["Test Department"],
//   businessConfig: {
//     businessType: "Test Business Type",
//     businessSize: "Test Business Size",
//     businessAge: "Test Business Age",
//     businessActivity: "Test Business Activity",
//     businessActivityOther: "Test Business Activity Other",
//     businessActivityDescription: "Test Business Activity Description",
//     businessActivityDescriptionOther: "Test Business Activity Description Other"
//   },
//   paymentDetails: {
//     paymentMethodId: 0,
//     vatNumber: "Test VAT Number",
//     iban: "Test IBAN",
//     creditCard: {
//       number: "Test Credit Card Number",
//       securityCode: "Test Credit Card Security Code"
//     },
//     bic: "Test BIC",
//     kvkNumber: "Test KVK Number",
//     taxNumber: "Test Tax Number"
//   }
// }
// ```
// 17. Create a new test case called `should update a company`.
// 18. Use the `chai.request(app)` function to make a `PUT` request to the `/companies/:id` endpoint.
// 19. Use the `send` function to send the following data in the request body:
// ```
// {
//   name: "Updated Test Company"
// }
// ```
// 20. Use the `expect` function to assert that the response status code is `200`.
// 21. Use the `expect` function to assert that the response body has the following properties:
// ```
// {
//   name: "Updated Test Company",
//   address: "Test Address",
//   city: "Test City",
//   country: "Test Country",
//   email: "test@test",
//   phone: "123456789",
//   slogan: "Test Slogan",
//   description: "Test Description",
//   owners: ["Test Owner"],
//   companyAdmins: ["Test Admin"],
//   locations: ["Test Location"],
//   departments: ["Test Department"],
//   businessConfig: {
//     businessType: "Test Business Type",
//     businessSize: "Test Business Size",
//     businessAge: "Test Business Age",
//     businessActivity: "Test Business Activity",
//     businessActivityOther: "Test Business Activity Other",
//     businessActivityDescription: "Test Business Activity Description",
//     businessActivityDescriptionOther: "Test Business Activity Description Other"
//   },
//   paymentDetails: {
//     paymentMethodId: 0,
//     vatNumber: "Test VAT Number",
//     iban: "Test IBAN",
//     creditCard: {
//       number: "Test Credit Card Number",
//       securityCode: "Test Credit Card Security Code"
//     },
//     bic: "Test BIC",
//     kvkNumber: "Test KVK Number",
//     taxNumber: "Test Tax Number"
//   }
// }
// ```
// 22. Create a new test case called `should delete a company`.
// 23. Use the `chai.request(app)` function to make a `DELETE` request to the `/companies/:id` endpoint.
// 24. Use the `expect` function to assert that the response status code is `200`.
// 25. Use the `expect` function to assert that the response body has the following properties:
// ```
// {
//   name: "Updated Test Company",
//   address: "Test Address",
//   city: "Test City",
//   country: "Test Country",
//   email: "test@test",
//   phone: "123456789",
//   slogan: "Test Slogan",
//   description: "Test Description",
//   owners: ["Test Owner"],
//   companyAdmins: ["Test Admin"],
//   locations: ["Test Location"],
//   departments: ["Test Department"],
//   businessConfig: {
//     businessType: "Test Business Type",
//     businessSize: "Test Business Size",
//     businessAge: "Test Business Age",
//     businessActivity: "Test Business Activity",
//     businessActivityOther: "Test Business Activity Other",
//     businessActivityDescription: "Test Business Activity Description",
//     businessActivityDescriptionOther: "Test Business Activity Description Other"
//   },
//   paymentDetails: {
//     paymentMethodId: 0,
//     vatNumber: "Test VAT Number",
//     iban: "Test IBAN",
//     creditCard: {
//       number: "Test Credit Card Number",
//       securityCode: "Test Credit Card Security Code"
//     },
//     bic: "Test BIC",
//     kvkNumber: "Test KVK Number",
//     taxNumber: "Test Tax Number"
//   }
// }
// ```
// 26. Create a new test case called `should return a company by id`.
// 27. Use the `chai.request(app)` function to make a `GET` request to the `/companies/:id` endpoint.
// 28. Use the `expect` function to assert that the response status code is `200`.
// 29. Use the `expect` function to assert that the response body has the following properties:
// ```
// {
//   name: "Updated Test Company",
//   address: "Test Address",
//   city: "Test City",
//   country: "Test Country",
//   email: "test@test",
//   phone: "123456789",
//   slogan: "Test Slogan",
//   description: "Test Description",
//   owners: ["Test Owner"],
//   companyAdmins: ["Test Admin"],
//   locations: ["Test Location"],
//   departments: ["Test Department"],
//   businessConfig: {
//     businessType: "Test Business Type",
//     businessSize: "Test Business Size",
//     businessAge: "Test Business Age",
//     businessActivity: "Test Business Activity",
//     businessActivityOther: "Test Business Activity Other",
//     businessActivityDescription: "Test Business Activity Description",
//     businessActivityDescriptionOther: "Test Business Activity Description Other"
//   },
//   paymentDetails: {
//     paymentMethodId: 0,
//     vatNumber: "Test VAT Number",
//     iban: "Test IBAN",
//     creditCard: {
//       number: "Test Credit Card Number",
//       securityCode: "Test Credit Card Security Code"
//     },
//     bic: "Test BIC",
//     kvkNumber: "Test KVK Number",
//     taxNumber: "Test Tax Number"
//   }
// }
// ```
