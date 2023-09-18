const FieldType = {
  DROPDOWN: 'PickList',
  CHECKBOX: 'checkbox',
}

export const fieldData = [
  {
    label:
      'By checking the box below, you are opting in to the Common Application. This will automatically enter you for consideration based on this application to any schools you choose in the fields below.',
    name: 'isCommonApplication',
    fieldName: 'isCommonApplication',
    type: FieldType.CHECKBOX,
    checkboxValues: [true, false],
  },
  {
    fieldName: 'firstChoiceSchool',
    label: 'First Choice School',
    name: 'schools',
    pickListValues: [],
    type: FieldType.DROPDOWN,
    placeholder: 'Select any Option',
    rules: {
      required: 'Title cannot be empty',
    },
  },
  {
    label: 'Second Choice School',
    fieldName: 'secondChoiceSchool',
    name: 'schools',
    type: FieldType.DROPDOWN,
    pickListValues: [],
  },
  {
    label: 'Third Choice School',
    fieldName: 'thirdChoiceSchool',
    name: 'schools',
    type: FieldType.DROPDOWN,
    pickListValues: [],
  },
]
