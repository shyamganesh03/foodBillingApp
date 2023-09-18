import { validateForFutureDate } from '../../../utils/dateFunction'

const FieldType = {
  TEXT_INPUT: 'textField',
  DATE: 'date',
  DROPDOWN: 'PickList',
}

export const fieldData = [
  {
    label: 'First Name',
    fieldName: 'firstName',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your first name',
    rules: {
      required: 'First name cannot be empty',
    },
  },
  {
    label: 'Middle Name',
    fieldName: 'middleName',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your middle name',
  },
  {
    label: 'Last Name',
    fieldName: 'lastName',
    type: FieldType.TEXT_INPUT,
    placeholder: 'Enter your last name',
    rules: {
      required: 'Last name cannot be empty',
    },
  },
  {
    label: 'Title',
    fieldName: 'title',
    type: FieldType.DROPDOWN,
    pickListValues: [
      { name: 'Mrs' },
      { name: 'Dr' },
      { name: 'Mr' },
      { name: 'Ms' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'Title cannot be empty',
    },
  },
  {
    label: 'Birthdate',
    fieldName: 'birthdate',
    type: FieldType.DATE,
    inputType: 'dob',
    placeholder: 'Select your dob',
    rules: {
      required: 'Birthdate cannot be empty',
      validate: (value) =>
        validateForFutureDate({
          dateToValidate: value,
          dateName: 'Birthdate',
        }),
    },
  },
  {
    label: 'Previous Names Used',
    fieldName: 'previousNamesUsed',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    placeholder: 'Enter your previous name',
    rules: {
      required: 'Previous Names cannot be empty',
    },
  },
  {
    label: 'Previously Applied to this Institution?',
    fieldName: 'previouslyAppliedToThisInstitution',
    type: FieldType.DROPDOWN,
    pickListValues: [{ name: 'Yes' }, { name: 'No' }],
    placeholder: 'Select any Option',
  },
  {
    label: 'Start Term Applying For',
    fieldName: 'startTermApplyingFor',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
  },
]
