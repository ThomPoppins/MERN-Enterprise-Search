const phoneNumberValidator = (phoneNumber, countryCode) => {
  switch (countryCode) {
    case 'NL':
      return validateNLPhoneNumber(phoneNumber);
    default:
      return false;
  }
};

/*
 * Validates a Dutch phone number.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 */
const validateNLPhoneNumber = (phoneNumber) => {
  const regex = /^(?:\+31|0)(?:[1-9][0-9]?|6(?:[0-9]\s?){7,10})$/;
  return regex.test(phoneNumber);
};

export default phoneNumberValidator;
