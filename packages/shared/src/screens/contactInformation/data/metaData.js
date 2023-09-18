const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
  Mobile_INPUT: 'mobile',
  CHECKBOX: 'checkbox',
}

export const fieldData = [
  {
    label: 'Alternative Email Address',
    type: FieldType.TEXT_INPUT,
    fieldName: 'alternativeEmailAddress',
    inputType: 'email',
    placeholder: 'Enter your Alternative Email Address',
    rules: {
      required: 'Alternative Email Address cannot be empty',
    },
  },
  {
    label: 'Mobile/Primary Number',
    fieldName: 'phoneNumber',
    countryCode: 'mobileOrPrimaryNumberCountyCode',
    type: FieldType.Mobile_INPUT,
    inputType: 'phone',
    placeholder: 'Enter your Mobile/Primary Number',
    rules: {
      required: 'Mobile/Primary Number cannot be empty',
    },
  },
  {
    label: 'Alternative Phone Number',
    fieldName: 'AltPhoneNumber',
    countryCode: 'alternativePhoneNumberCountryCode',
    type: FieldType.Mobile_INPUT,
    inputType: 'phone',
    placeholder: 'Enter your Alternative Phone Number',
    rules: {
      required: 'Alternative Phone Number cannot be empty',
    },
  },
  {
    label: 'Street Address',
    fieldName: 'mailingStreet',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your Street Address',
    rules: {
      required: 'Street Address cannot be empty',
    },
  },
  {
    label: 'City',
    type: FieldType.TEXT_INPUT,
    fieldName: 'mailingCity',
    inputType: 'string',
    placeholder: 'Enter your City',
    rules: {
      required: 'City cannot be empty',
    },
  },
  {
    label: 'Zip/Postal Code',
    type: FieldType.TEXT_INPUT,
    fieldName: 'mailingPostalCode',
    inputType: 'string',
    placeholder: 'Enter your Zip/Postal Code',
    rules: {
      required: 'Zip/Postal Code cannot be empty',
    },
  },
  {
    label: 'Mailing Country Code',
    fieldName: 'mailingCountryCode',
    type: FieldType.DROPDOWN,
    dropdownValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'Mailing Country Code cannot be empty',
    },
  },
  {
    label:
      'Text messages sent by the Admissions Office will not be used for "spam." By checking the confirmation box, you grant permission to Saba University School of Medicine to send text messages to your personal mobile phone number.',
    fieldName: 'canTextToMobile',
    type: FieldType.CHECKBOX,
    checkboxValues: [true, false],
    selectedValue: false,
  },
]
