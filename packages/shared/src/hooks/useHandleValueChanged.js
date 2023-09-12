export const useFormValueChanged = ({
  fieldIndex,
  selectedValue,
  sectionIndex,
  step,
  formData,
}) => {
  let copyFormData = formData
  copyFormData = formData
  let currentField =
    copyFormData[step]?.sections[sectionIndex]?.fields[fieldIndex]
  const numericRegex = /^[0-9.]+$/
  if (currentField?.inputType === 'number') {
    if (numericRegex.test(selectedValue) || selectedValue === '') {
      currentField.selectedValue = selectedValue
    }
  } else {
    currentField.selectedValue =
      selectedValue?.value || !selectedValue.name
        ? selectedValue
        : selectedValue.name
  }
  currentField.error = {}
  const currentFields = {
    ...copyFormData[step].sections[sectionIndex],
    fields: [
      ...copyFormData[step].sections[sectionIndex].fields?.slice(0, fieldIndex),
      { ...currentField },
      ...copyFormData[step].sections[sectionIndex].fields?.slice(
        fieldIndex + 1,
      ),
    ],
  }

  const currentSessions = [
    ...copyFormData[step].sections.slice(0, sectionIndex),
    { ...currentFields },
    ...copyFormData[step].sections.slice(sectionIndex + 1),
  ]
  const newFromField = {
    ...copyFormData,
    [step]: { ...copyFormData[step], sections: currentSessions },
  }
  return newFromField
}

export const useModalValueChanged = ({
  fieldIndex,
  selectedValue,
  sectionIndex,
  step,
  formData,
}) => {
  let copyFormData = formData
  copyFormData = formData
  let currentField =
    copyFormData[step]?.sections[sectionIndex]?.modalFields[fieldIndex]

  const numericRegex = /^[0-9.]+$/
  if (currentField?.inputType === 'number') {
    if (numericRegex.test(selectedValue) || selectedValue === '') {
      currentField.selectedValue = selectedValue
    }
  } else {
    currentField.selectedValue =
      selectedValue?.value || !selectedValue.name
        ? selectedValue
        : selectedValue.name
  }
  currentField.error = {}

  const currentFields = {
    ...copyFormData[step].sections[sectionIndex],
    modalFields: [
      ...copyFormData[step].sections[sectionIndex].modalFields?.slice(
        0,
        fieldIndex,
      ),
      { ...currentField },
      ...copyFormData[step].sections[sectionIndex].modalFields?.slice(
        fieldIndex + 1,
      ),
    ],
    selectedValue: {
      ...copyFormData[step].sections[sectionIndex]?.selectedValue,
      [currentField.fieldName]:
        selectedValue?.value || !selectedValue.name
          ? selectedValue
          : selectedValue.name,
    },
  }

  const currentSessions = [
    ...copyFormData[step].sections.slice(0, sectionIndex),
    { ...currentFields },
    ...copyFormData[step].sections.slice(sectionIndex + 1),
  ]
  const newFromField = {
    ...copyFormData,
    [step]: { ...copyFormData[step], sections: currentSessions },
  }
  return newFromField
}
