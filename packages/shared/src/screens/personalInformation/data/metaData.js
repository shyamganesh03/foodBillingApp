const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
  Mobile_INPUT: 'mobile',
  CHECKBOX: 'checkbox',
}

export const fieldData = [
  {
    label: 'Gender',
    lookUpName: 'gender',
    fieldName: 'gender',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'Gender cannot be empty',
    },
  },
  {
    label: 'Marital Status',
    lookUpName: 'maritalstatus',
    fieldName: 'maritalStatus',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
  },
  {
    label: 'Number of Dependents',
    fieldName: 'numberOfDependents',
    type: FieldType.TEXT_INPUT,
    inputType: 'number',
    placeholder: 'Enter your Number of Dependents',
  },
  {
    label: 'Is English your Primary Language',
    fieldName: 'isEnglishYourPrimaryLanguage',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    placeholder: 'Select any Option',
  },
  {
    label: 'Place of Birth',
    fieldName: 'placeOfBirth',
    type: FieldType.TEXT_INPUT,
    inputType: 'dob',
    placeholder: 'Enter your Place of Birth',
    rules: {
      required: 'Place of Birth cannot be empty',
    },
  },
  {
    label: 'What is your Citizenship Status?',
    lookUpName: 'citizenshipstatus',
    fieldName: 'citizenshipStatus',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'Citizenship Status can not be empty',
    },
  },
  {
    label: 'Are you a US Citizen/Permanent Resident?',
    lookUpName: 'isUsCitizen',
    fieldName: 'USCitizenOrPermanentResident',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    placeholder: 'Select any Option',
    rules: {
      required: 'Citizen/Permanent Resident can not be empty',
    },
  },
  {
    label: 'Have a Non US or Canadian Passport?',
    lookUpName: 'OtherCountryPassport',
    fieldName: 'haveNonUSOrCanadianPassport',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    placeholder: 'Select any Option',
  },
  {
    label: 'If International Passport, Which Country?',
    fieldName: 'internationalPassportCountry',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your International Passport Country',
  },
]
