function startYearValidator(startYear) {
  const currentYear = new Date().getFullYear();
  const startYearInt = parseInt(startYear);

  if (isNaN(startYearInt)) {
    return false;
  }

  if (startYearInt > currentYear) {
    return false;
  }

  return true;
}

export default startYearValidator;
