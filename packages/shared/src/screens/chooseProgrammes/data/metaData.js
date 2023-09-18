const FieldType = {
  DROPDOWN: 'PickList',
}

export const fieldData = [
  {
    label: 'Choose your Program',
    name: 'programmes',
    fieldName: 'programmeName',
    type: FieldType.DROPDOWN,
    pickListValues: [],
    placeholder: 'Select any Option',
    rules: {
      required: 'programmes should not be empty',
    },
  },
]
