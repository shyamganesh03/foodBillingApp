import { validateForFutureDate } from '../../../utils/dateFunction'

const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
  Mobile_INPUT: 'mobile',
  CHECKBOX: 'checkbox',
  DATE: 'date',
}

export const fieldData = [
  {
    label: 'Academic Institution',
    name: 'institutionNameIfNotFound',
    type: FieldType.TEXT_INPUT,
    fieldName: 'institutionNameIfNotFound',
    inputType: 'string',
    placeholder: 'Enter your Academic Institution',
    rules: {
      required: 'Academic Institution cannot be empty',
    },
  },
  {
    label: 'Degree Level',
    lookUpName: 'degreeLevel',
    fieldName: 'degreeLevel',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'degreeLevel cannot be empty',
    },
  },
  {
    label: 'Academic Institution Estimated Start',
    name: 'startTermApplyingFor',
    fieldName: 'startTermApplyingFor',
    type: FieldType.DATE,
    mandatory: true,
    inputType: 'startAcademicDate',
    placeholder: 'Select any Option',
    rules: {
      required: 'Academic Institution Estimated Start cannot be empty',
      validate: (value) =>
        validateForFutureDate({
          dateToValidate: value,
          dateName: 'Start Date',
        }),
    },
  },
  {
    label: 'Academic Institution Estimated End Date',
    name: 'endTermApplyingFor',
    fieldName: 'endTermApplyingFor',
    inputType: 'endAcademicDate',
    type: FieldType.DATE,
    placeholder: 'Select any Option',
    rules: {
      required: 'Academic Institution Estimated End Date Start cannot be empty',
    },
  },
  {
    label: 'Approx. Degree Earned Date',
    name: 'degreeEarnedDate',
    fieldName: 'degreeEarnedDate',
    inputType: 'degreeEarnedDate',
    type: FieldType.DATE,
    placeholder: 'Select any Option',
    rules: {
      required: 'Approx. Degree Earned Date cannot be empty',
    },
  },
]
