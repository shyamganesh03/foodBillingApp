import { validateForFutureDate } from '../../../utils/dateFunction'

const FieldType = {
  TEXT_INPUT: 'textField',
  DATE: 'date',
}

export const fieldData = [
  {
    label: 'Clinic/Hospital',
    name: 'clinicOrHospital',
    type: FieldType.TEXT_INPUT,
    fieldName: 'clinicOrHospital',
    inputType: 'string',
  },
  {
    label: 'Clinical Experience Role',
    name: 'clinicalExperienceRole',
    type: FieldType.TEXT_INPUT,
    fieldName: 'clinicalExperienceRole',
    inputType: 'string',
  },
  {
    label: 'Clinical Experience Hours Completed',
    name: 'clinicalExperienceHoursCompleted',
    type: FieldType.TEXT_INPUT,
    inputType: 'number',
    fieldName: 'clinicalExperienceHoursCompleted',
    rules: {
      pattern: {
        value: /^[0-9]+$/,
        message: 'Invalid Number format',
      },
    },
  },
]
