export const emailContainsNonLatinCharacters = (email) => {
  const emailSplits = email.split('@');
  if (emailSplits.length < 2) {
    return false;
  }
  return !/^[a-zA-Z0-9.'+-_|~]*$/.test(emailSplits[0]) || !/^[a-zA-Z0-9.-]*$/.test(emailSplits[1]);
};

export const isInvalidEmail = (email) => {
  const hasNonLatinChars = emailContainsNonLatinCharacters(email);
  const isInvalid =
    email.indexOf('@') === -1 ||
    email.indexOf('.') === -1 ||
    email.indexOf('..') !== -1 ||
    emailContainsNonLatinCharacters(email);
  const errorMessage = hasNonLatinChars
    ? window.Messages?.emailValidationErrors.invalidCharacters
    : window.Messages?.emailValidationErrors.invalidEmail;

  return {
    isInvalid,
    errorMessage: isInvalid ? errorMessage : ''
  };
};
