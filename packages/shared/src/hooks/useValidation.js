import { getCurrentDate } from '../utils/dateFunction'

export const useValidation = ({
  step,
  sessionIndex,
  modalFields,
  setModalFields,
  formData,
  hasError,
  type,
  submittedData,
  setFormData,
  setHasError,
  sessionName,
}) => {
  let updatedData = submittedData
  let hasValid = []

  const mandatoryCheck = ({ fieldValue }) => {
    if (fieldValue.mandatory && !fieldValue.selectedValue) {
      // Assuming you want to set an error message
      fieldValue.error = {
        hasError: true,
      }
      hasValid.push(false)
      if (type === 'modalSave') {
        setModalFields({
          ...modalFields,
          error: 'Please fill the mandatory fields',
        })
      } else {
        setHasError({
          ...hasError, // Typo here, should be `...setHasError`
          errorMessage1: 'Please fill the mandatory fields',
        })
      }
    }
  }

  const validateForFutureDate = (dateToValidate, dateName, value, hasValid) => {
    // Assuming you have a function getCurrentDate() defined somewhere
    const currentDate = getCurrentDate()
    if (dateToValidate >= currentDate) {
      // Assuming you want to set an error message
      value.error = {
        hasError: true,
        message: `${dateName} cannot be in the future`,
      }
      hasValid.push(false)
    } else {
      hasValid.push(true)
    }
  }

  updatedData.sections = updatedData?.sections?.map((section) => {
    // Corrected 'section' access
    if (section?.fields && type !== 'modalSave') {
      section.fields = section.fields.map((fieldValue) => {
        if (fieldValue.inputType === 'email') {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          const isValidEmail = emailPattern.test(fieldValue.selectedValue)
          if (!isValidEmail) {
            // If email is not valid, set the error message
            fieldValue.error = {
              hasError: true,
              message: 'Invalid Email',
            }
            hasValid.push(false)
          } else {
            hasValid.push(true)
          }
        }
        if (fieldValue.inputType === 'dob') {
          const birthDate = new Date(fieldValue.selectedValue)
          const currentDate = getCurrentDate()

          if (currentDate < birthDate) {
            // If email is not valid, set the error message
            fieldValue.error = {
              hasError: true,
              message: 'Birth Date cannot be in future',
            }
            hasValid.push(false)
          }
        }
        mandatoryCheck({ fieldValue })
        // Corrected 'fieldValue' access
        // Your field validation logic here
        return fieldValue // Return the modified or unmodified value
      })
    }

    if (section?.modalFields && section.title === sessionName) {
      let EmptyModalFields = []
      section.modalFields = section.modalFields.map((modalFieldValue) => {
        const startDate = new Date(section?.modalFields[2]?.selectedValue || '')
        const endDate = new Date(section?.modalFields[3]?.selectedValue || '')
        const degreeDate = new Date(
          section?.modalFields[4]?.selectedValue || '',
        )

        if (modalFieldValue.inputType === 'startAcademicDate') {
          validateForFutureDate(
            startDate,
            'Start Date',
            modalFieldValue,
            hasValid,
          )
        }

        if (modalFieldValue.inputType === 'endAcademicDate') {
          validateForFutureDate(endDate, 'End Date', modalFieldValue, hasValid)

          if (endDate < startDate) {
            modalFieldValue.error = {
              hasError: true,
              message: 'End Date must be greater than Start Date',
            }
            hasValid.push(false)
          } else {
            hasValid.push(true)
          }
        }
        if (modalFieldValue.inputType === 'degreeEarnedDate') {
          validateForFutureDate(
            degreeDate,
            'Degree Earned',
            modalFieldValue,
            hasValid,
          )

          if (degreeDate < endDate) {
            modalFieldValue.error = {
              hasError: true,
              message:
                'Degree Earned Date must be greater than Academic End Date',
            }
            hasValid.push(false)
          } else {
            hasValid.push(true)
          }
        }
        if (modalFieldValue.inputType === 'MCATDate') {
          const mcatDate = new Date(modalFieldValue.selectedValue)
          validateForFutureDate(
            mcatDate,
            'MCAT Exam Date',
            modalFieldValue,
            hasValid,
          )
        }
        mandatoryCheck({ fieldValue: modalFieldValue })
        if (!modalFieldValue?.selectedValue) {
          EmptyModalFields.push(modalFieldValue)
        }
        // Corrected 'modalFieldValue' access
        // Your modal field validation logic here
        return modalFieldValue // Return the modified or unmodified value
      })
      if (EmptyModalFields.length === section.modalFields.length) {
        hasValid.push(false)
      }
    }

    return section
  })
  setFormData({
    ...formData,
    [step]: {
      ...formData[step],
      ...updatedData,
    },
  })

  return !hasValid.includes(false)
}
