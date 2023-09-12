import { submitApplication, updateApplication } from '../api'

export const useFormSave = async ({
  submittedData,
  email,
  applicationStatus = 'In progress',
}) => {
  let payload = {
    email,
    applicationStatus,
  }
  submittedData.sections.forEach((section) => {
    // Initialize a variable to store the emergency contact full name.
    let fullName = ''

    // Check if the section has fields.
    if (section.fields?.length > 0) {
      section.fields.forEach((field) => {
        // Check if the field has a fieldName.
        if (field?.fieldName) {
          // Handle emergency contact fields.
          if (
            field.fieldName === 'emergencyContactFirstName' ||
            field.fieldName === 'emergencyContactLastName'
          ) {
            fullName = `${fullName} ${field.selectedValue || ''}`.trim()
            if (!!fullName) payload['emergencyContactFullName'] = fullName
          }

          // Handle PickList or dropdown fields.
          if (field.type === 'PickList' || field.type === 'dropdown') {
            if (field.fieldName === 'mailingCountryCode') {
              payload['mailingCountry'] = field.selectedValue?.name
              payload[field.fieldName] = field.selectedValue?.value
            } else {
              if (!!field.selectedValue?.name || !!field.selectedValue) {
                payload[field.fieldName] =
                  field.selectedValue?.name || field.selectedValue
              }
            }
          } else {
            payload[field.fieldName] = field.selectedValue
          }
        }
      })
    }
  })
  const updateResponse = await updateApplication(payload)
  return updateResponse
}

export const useInitialForm = async ({
  userData,
  initialPayload,
  formData,
}) => {
  let selectedSchoolValue = []
  let errorMessage = []
  formData.step0.sections[formData.step0.sections.length - 1].fields.map(
    (fields) => {
      if (fields.selectedValue.name) {
        return selectedSchoolValue.push(fields.selectedValue.name)
      }
      if (fields.selectedValue) {
        return selectedSchoolValue.push(fields.selectedValue)
      }
    },
  )
  selectedSchoolValue = selectedSchoolValue.filter((item) => item !== 'None')
  const duplicateValueCheck = new Set(
    selectedSchoolValue.filter((item) => item !== undefined),
  )
  if (selectedSchoolValue.length > 1) {
    if (duplicateValueCheck.size !== selectedSchoolValue.length) {
      errorMessage.push(
        '* Please select different schools, as some of your chosen options are the same.',
      )
    }
    const checkBox =
      formData.step0.sections[formData.step0.sections.length - 2].fields[2]
        .selectedValue
    if (!checkBox) {
      errorMessage.push('* Please check the above check box to proceed')
    }
    if (errorMessage.length > 0) {
      return { error: errorMessage }
    }
  }
  if (!userData?.email) {
    const response = await submitApplication(initialPayload)
    return response
  }
  return { initial: false }
}

export const useModalSave = async ({ email, submittedData }) => {
  let modalPayload = { email: email }
  submittedData.sections.forEach((section) => {
    if (section.fieldName) {
      const sectionData = section.selectedValue
      let newSectionDate

      newSectionDate = {
        ...sectionData,
      }

      modalPayload = {
        ...modalPayload,
        [section.fieldName]: [newSectionDate],
      }
    }
  })
  const updateResponse = await updateApplication(modalPayload)
  return updateResponse
}
