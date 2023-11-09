const genderValidator = (value) => {
  if (value === "Man" || value === "Woman" || value === "Other") {
    return true;
  }

  return false;
};

export default genderValidator;
