// Filepath to KVK API certificates related to this file
// TODO: Before deployment to production, change the TEST certificate chain to PROD certificate chain
const kvkApiCertificates = "./kvkApi/certs/Private_G1_chain.pem";

// TODO: [MERNSTACK-189] Add real kvk number validation with API call
const kvkNumberValidator = (kvkNumber) => {
  const regex = /^[0-9]{8}$/;
  const validNumber = regex.test(kvkNumber);
  const apiCallValidated = true;
  return validNumber && apiCallValidated;
};

export default kvkNumberValidator;
