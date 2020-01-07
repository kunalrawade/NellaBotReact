/* eslint-disable no-debugger */
const validationRules = (fieldName, value) => {

  let fieldValidationErrors = true;
  switch (fieldName) {
    case 'email':
      if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        fieldValidationErrors = false;
      } else {
        fieldValidationErrors = true;
      }
      break;
    case 'password':
      if (value.length >= 6) {
        fieldValidationErrors = false;
      } else {
        fieldValidationErrors = true;
      }
      break;
    case 'required':
      if (value === '') {
        fieldValidationErrors = false;
      } else {
        fieldValidationErrors = true;
      }
      break;
      case 'wildchar':
      const expr = /^[a-z0-9 ]+$/i;
      if (!expr.test(value) && value !== "") {
        fieldValidationErrors = false;
      } else {
        fieldValidationErrors = true;
      }
      break;
    default:
      fieldValidationErrors = false;
      break;
  }
  return fieldValidationErrors;
};

export default validationRules;