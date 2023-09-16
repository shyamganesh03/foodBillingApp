export const fieldData = [
  {
    label:
      'All candidates for admission must meet the school’s Technical Standards, which describe the essential abilities and characteristics for the study and practice of medicine, including the abilities which relate to observation; communication; motor function; intellectual-conceptual (integrative and quantitative) abilities; and behavioral and social skills. By submitting this application, the candidate affirms that he or she has read the Technical Standards, which are available at www.saba.edu.',
    type: 'description',
  },
  {
    label:
      'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for academic reasons?',
    name: 'isUsCitizen',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
    hasFullWidth: true,
    fieldName: 'academicWithdrawal',
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: 'textField',
    fieldName: 'academicWithdrawalReason',
    inputType: 'string',
  },
  {
    label:
      'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
    name: 'isUsCitizen',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
    hasFullWidth: true,
    fieldName: 'arrestedChargedOrConvictedOfCrime',
  },
  {
    label: 'If yes, then please explain',
    name: 'crimeReason',
    type: 'textField',
    inputType: 'string',
    fieldName: 'crimeReason',
  },
  {
    label:
      'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
    name: 'isUsCitizen',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
    hasFullWidth: true,
    fieldName: 'technicalStandardAccommodationNeeded',
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: 'textField',
    inputType: 'string',
    fieldName: 'technicalStandardAccommodationReason',
  },
  {
    label:
      'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
    name: 'isUsCitizen',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
    hasFullWidth: true,
    fieldName: 'technicalStandardsMedicalConditions',
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: 'textField',
    inputType: 'string',
    fieldName: 'technicalStandardsMedicalReason',
  },
  {
    label:
      'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
    name: 'isUsCitizen',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
    hasFullWidth: true,
    fieldName: 'nonAcademicSuspendedDismissWithdrawn',
  },
  {
    label: 'If yes, then please explain',
    name: 'Previous Research Experience',
    type: 'textField',
    inputType: 'string',
    fieldName: 'nonAcademicWithdrawalReason',
  },
]
