import { validateForFutureDate } from '../../../utils/dateFunction'

const FieldType = {
  TEXT_INPUT: 'textField',
  DATE: 'date',
}

export const fieldData = [
  {
    label: 'Submission Signature',
    name: 'signature',
    fieldName: 'signature',
    type: FieldType.TEXT_INPUT,
    inputType: 'string',
    rules: {
      required: 'signature can not be empty',
    },
  },
  {
    label: 'Submitted Signature Date',
    name: 'signatureDate',
    fieldName: 'signatureDate',
    type: FieldType.DATE,
    inputType: 'signatureDate',
    rules: {
      required: 'signature Date can not be empty',
    },
  },
]
