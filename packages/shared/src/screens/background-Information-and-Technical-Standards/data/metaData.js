const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
}

export const fieldData = [
  {
    label:
      'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for academic reasons?',
    lookUpName: 'isUsCitizen',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    fieldName: 'academicWithdrawal',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field should not be empty',
    },
  },
  {
    label: 'If yes, then please explain',
    lookUpName: 'Previous Research Experience',
    type: FieldType.TEXT_INPUT,
    fieldName: 'academicWithdrawalReason',
    inputType: 'string',
  },
  {
    label:
      'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
    lookUpName: 'isUsCitizen',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    fieldName: 'arrestedChargedOrConvictedOfCrime',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field should not be empty',
    },
  },
  {
    label: 'If yes, then please explain',
    lookUpName: 'crimeReason',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    fieldName: 'crimeReason',
  },
  {
    label:
      'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
    lookUpName: 'isUsCitizen',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    fieldName: 'technicalStandardAccommodationNeeded',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field should not be empty',
    },
  },
  {
    label: 'If yes, then please explain',
    lookUpName: 'Previous Research Experience',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    fieldName: 'technicalStandardAccommodationReason',
  },
  {
    label:
      'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
    lookUpName: 'isUsCitizen',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    fieldName: 'technicalStandardsMedicalConditions',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field should not be empty',
    },
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    fieldName: 'technicalStandardsMedicalReason',
  },
  {
    label:
      'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
    lookUpName: 'isUsCitizen',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    fieldName: 'nonAcademicSuspendedDismissWithdrawn',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field should not be empty',
    },
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    fieldName: 'nonAcademicWithdrawalReason',
  },
]
