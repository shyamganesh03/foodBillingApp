export const fieldValidation = ({ type, validationValue }) => {
  switch (type) {
    case 'email':
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      const isValidEmail = emailPattern.test(validationValue)
      if (!isValidEmail) {
        return {
          isValid: false,
          error: 'Invalid Email',
        }
      } else {
        return {
          isValid: true,
        }
      }
    case 'phone':
      const phoneNumberRegex = /^(\+\d{1,3}-?)?(\d{5}-?)?\d{5}$/
      const isValidPhoneNumber = phoneNumberRegex.test(validationValue)
      if (!isValidPhoneNumber) {
        return {
          isValid: false,
          error: 'Invalid Mobile number',
        }
      } else {
        return {
          isValid: true,
        }
      }
    case 'number':
      const numberRegex = /^[0-9]+$/
      const isValidNumber = numberRegex.test(validationValue)
      if (!isValidNumber) {
        return {
          isValid: false,
          error: 'Invalid Number',
        }
      } else {
        return {
          isValid: true,
        }
      }
    default:
      break
  }
}
