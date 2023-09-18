// TODO: Add real kvk number validation with API call
const kvkNumberValidator = (kvkNumber) => {
  const regex = /^[0-9]{8}$/;
  const validNumber = regex.test(kvkNumber);

  return validNumber;
};

export default kvkNumberValidator;
