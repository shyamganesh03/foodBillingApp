export const fieldData = [
  {
    label:
      'By checking the box below, you are opting in to the Common Application. This will automatically enter you for consideration based on this application to any schools you choose in the fields below.',
    name: 'isCommonApplication',
    fieldName: 'isCommonApplication',
    type: 'checkbox',
    checkboxValues: [true, false],
  },
  {
    fieldName: 'firstChoiceSchool',
    label: 'First Choice School',
    mandatory: true,
    name: 'schools',
    pickListValues: [],
    type: 'PickList',
  },
  {
    label: 'Second Choice School',
    fieldName: 'secondChoiceSchool',
    name: 'schools',
    type: 'PickList',
    pickListValues: [],
  },
  {
    label: 'Third Choice School',
    fieldName: 'thirdChoiceSchool',
    name: 'schools',
    type: 'PickList',
    pickListValues: [],
  },
]
