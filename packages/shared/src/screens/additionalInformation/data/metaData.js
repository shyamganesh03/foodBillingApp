const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
}

export const fieldData = [
  {
    label: 'How did you hear about GUS Medical Universities',
    lookUpName: 'referralsource',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    fieldName: 'howDidYouHearAboutSABA',
    placeholder: 'Select any Option',
    rules: {
      required: 'This field cannot be empty',
    },
  },
  {
    label: 'Other Schools Applying To',
    lookUpName: 'otherSchoolsApplyingTo',
    type: FieldType.TEXT_INPUT,
    fieldName: 'otherSchoolsApplyingTo', //
    inputType: 'string',
    placeholder: 'Enter your School name',
  },
]
