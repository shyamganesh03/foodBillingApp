import { getCurrentDate } from './dateFunction'

export const fieldValidation = ({ type, validationValue, fieldItem }) => {
  let validatedValue
  const startDate = new Date(
    fieldItem?.['startTermApplyingFor'] || validationValue || '',
  )
  const endDate = new Date(
    fieldItem?.['endTermApplyingFor'] || validationValue || '',
  )
  const degreeDate = new Date(
    fieldItem?.['degreeEarnedDate'] || validationValue || '',
  )

  const validateForFutureDate = ({ dateToValidate, dateName }) => {
    // Assuming you have a function getCurrentDate() defined somewhere
    const currentDate = getCurrentDate({ type: 'Date' })
    if (dateToValidate >= currentDate) {
      // Assuming you want to set an error message
      return {
        isValid: false,
        error: `${dateName} cannot be in the future`,
      }
    } else {
      return {
        isValid: true,
      }
    }
  }
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
    case 'dob':
      const birthDate = new Date(validationValue)
      const currentDate = getCurrentDate({ type: 'Date' })

      if (currentDate < birthDate) {
        return {
          isValid: false,
          error: 'Birth Date cannot be in future',
        }
      } else {
        return {
          isValid: true,
        }
      }
    case 'startAcademicDate':
      validatedValue = validateForFutureDate({
        dateToValidate: startDate,
        dateName: 'Start Date',
      })
      return validatedValue
    case 'endAcademicDate':
      validatedValue = validateForFutureDate({
        dateToValidate: endDate,
        dateName: 'End Date',
      })
      if (endDate < startDate) {
        return {
          isValid: false,
          error: 'End Date must be greater than Start Date',
        }
      }
      if (validatedValue) {
        return validatedValue
      }

    case 'degreeEarnedDate':
      validatedValue = validateForFutureDate({
        dateToValidate: degreeDate,
        dateName: 'Degree Earned',
      })
      if (degreeDate < endDate) {
        return {
          isValid: false,
          error: 'Degree Earned Date must be greater than Academic End Date',
        }
      }
      if (validatedValue) {
        return validatedValue
      }
    case 'MCATDate':
      const mcatDate = new Date(validationValue)
      validatedValue = validateForFutureDate({
        dateToValidate: mcatDate,
        dateName: 'MCAT Exam Date',
        value: modalFieldValue,
      })
      return validatedValue
    default:
      return {
        isValid: true,
      }
  }
}

export const mandatoryValidation = (fieldData, filedItemValues, isArray) => {
  if (isArray) {
    const mandatoryFields = []

    filedItemValues.forEach((entry, index) => {
      let mandatoryFieldArray = []
      fieldData.forEach((field) => {
        if (field.mandatory && !entry[field.fieldName]) {
          mandatoryFieldArray.push(field.fieldName)
        }
      })

      if (mandatoryFieldArray.length > 0) {
        const entryMandatoryFields = { [`${index}`]: mandatoryFieldArray }
        mandatoryFields.push(entryMandatoryFields)
      }
    })

    return mandatoryFields
  } else {
    const mandatoryFields = fieldData
      ?.filter(
        (fieldItem) =>
          fieldItem?.mandatory && filedItemValues[fieldItem?.fieldName] === '',
      )
      ?.map((fieldItem) => fieldItem?.fieldName)
    return mandatoryFields
  }
}

export const canNonEmptyObject = (validationValue) => {
  let hasNonEmptyValue

  hasNonEmptyValue = Object.values(validationValue).some((validationItem) => {
    const keys = Object.keys(validationItem)
    if (keys.length > 0) {
      return Object.values(validationItem).some(
        (validationKeyItem) => !!validationKeyItem,
      )
    } else {
      return !!validationItem
    }
  })

  return hasNonEmptyValue
}
