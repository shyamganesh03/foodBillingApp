const FieldType = {
  TEXT_INPUT: 'textField',
}

export const fieldData = [
  {
    label: 'First Name or Indicate if Interfolio',
    name: 'recommenderFirstName',
    type: 'recommenderFirstName',
    fieldName: 'recommenderFirstName',
    inputType: 'string',
    type: FieldType.TEXT_INPUT,
  },
  {
    label: 'Last Name or Indicate if Interfolio',
    name: 'recommenderLastName',
    type: FieldType.TEXT_INPUT,
    fieldName: 'recommenderLastName',
    inputType: 'string',
  },
  {
    label: 'Email',
    name: 'recommenderEmail',
    type: FieldType.TEXT_INPUT,
    inputType: 'email',
    fieldName: 'recommenderEmail',
  },
  {
    label: 'Phone',
    name: 'recommenderPhone',
    type: FieldType.TEXT_INPUT,
    inputType: 'phone',
    fieldName: 'recommenderPhone',
  },
]
