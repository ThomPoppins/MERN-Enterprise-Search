// Validate company slogan to be alphanumeric and special characters and not empty
function companySloganValidator(slogan) {
  const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  return slogan.trim().length > 0 && regex.test(slogan);
}

export default companySloganValidator;
