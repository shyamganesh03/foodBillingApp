const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
  Mobile_INPUT: 'mobile',
  CHECKBOX: 'checkbox',
}

export const fieldData = [
  {
    label: 'Emergency Contact First Name',
    type: FieldType.TEXT_INPUT,
    fieldName: 'emergencyContactFirstName',
    inputType: 'string',
    placeholder: 'Enter your Emergency Contact First Name',
    rules: {
      required: 'Emergency Contact First Name cannot be empty',
    },
  },
  {
    label: 'Emergency Contact Last Name',
    fieldName: 'emergencyContactLastName',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your Emergency Contact Last Name',
    rules: {
      required: 'Emergency Contact Last Name cannot be empty',
    },
  },
  {
    label: 'Emergency Contact Relationship',
    lookUpName: 'studentrelationships',
    fieldName: 'emergencyContactRelationship',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'Emergency Contact Relationship cannot be empty',
    },
  },
  {
    label: 'Emergency Contact Primary Phone',
    fieldName: 'emergencyContactPrimaryPhone',
    type: FieldType.Mobile_INPUT,
    inputType: 'phone',
    placeholder: 'Enter your Emergency Contact Primary Phone',
    rules: {
      required: 'Emergency Contact Primary Phone cannot be empty',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Invalid Mobile Number',
      },
    },
  },
  {
    label: 'Emergency Contact Email',
    fieldName: 'emergencyContactEmail',
    type: FieldType.TEXT_INPUT,
    inputType: 'email',
    placeholder: 'Enter your Emergency Contact Email',
    rules: {
      required: 'Emergency Contact Email cannot be empty',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid Email',
      },
    },
  },
]
