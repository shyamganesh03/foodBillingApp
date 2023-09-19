import { validateForFutureDate } from '../../../utils/dateFunction'

const FieldType = {
  TEXT_INPUT: 'textField',
  DATE: 'date',
}

export const fieldData = [
  {
    label: 'MCAT Exam Date',
    name: 'MCATDate',
    fieldName: 'MCATDate',
    inputType: 'MCATDate',
    type: FieldType.DATE,
    rules: {
      validate: (value) =>
        validateForFutureDate({
          dateToValidate: value,
          dateName: 'MCAT Exam Date',
        }),
    },
  },
  {
    label: 'MCAT Total Score',
    name: 'MCATTotalScore',
    inputType: 'number',
    type: FieldType.TEXT_INPUT,
    fieldName: 'MCATTotalScore',
  },
]
