export const fieldData = [
  {
    label: 'Gender',
    name: 'gender',
    fieldName: 'gender',
    type: 'PickList',
    pickListValues: [],
    mandatory: true,
  },
  {
    label: 'Marital Status',
    name: 'maritalstatus',
    fieldName: 'maritalStatus',
    type: 'PickList',
    pickListValues: [],
  },
  {
    label: 'Number of Dependents',
    name: 'NumberOfDependents',
    fieldName: 'numberOfDependents',
    type: 'textField',
    inputType: 'number',
  },
  {
    label: 'Is English your Primary Language',
    name: 'isEnglishYourPrimaryLanguage',
    fieldName: 'isEnglishYourPrimaryLanguage',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
  },
  {
    label: 'Place of Birth',
    name: 'PlaceOfBirth',
    fieldName: 'placeOfBirth',
    type: 'textField',
    inputType: 'dob',
    mandatory: true,
  },
  {
    label: 'What is your Citizenship Status?',
    name: 'citizenshipstatus',
    fieldName: 'citizenshipStatus',
    type: 'PickList',
    pickListValues: [],
    mandatory: true,
  },
  {
    label: 'Are you a US Citizen/Permanent Resident?',
    name: 'isUsCitizen',
    fieldName: 'USCitizenOrPermanentResident',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    mandatory: true,
  },
  {
    label: 'Have a Non US or Canadian Passport?',
    name: 'OtherCountryPassport',
    fieldName: 'haveNonUSOrCanadianPassport',
    type: 'PickList',
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
  },
  {
    label: 'If International Passport, Which Country?',
    name: 'internationalCitizenCountry',
    fieldName: 'internationalPassportCountry',
    type: 'textField',
    inputType: 'string',
  },
]
