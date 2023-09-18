const FieldType = {
  TEXT_INPUT: 'textField',
  DROPDOWN: 'PickList',
  Mobile_INPUT: 'mobile',
  CHECKBOX: 'checkbox',
}

export const fieldData = [
  {
    label: 'Biology 1',
    lookUpName: 'Biology_1',
    fieldName: 'biology1',
    type: FieldType.DROPDOWN,
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'Biology_1 cannot be empty',
    },
  },
  {
    label: 'Biology 2',
    lookUpName: 'Biology_2',
    fieldName: 'biology2',
    type: FieldType.DROPDOWN,
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'Biology_2 cannot be empty',
    },
  },
  {
    label: 'General/Inorganic Chemistry 1',
    lookUpName: 'General/Inorganic_Chemistry_1',
    type: FieldType.DROPDOWN,
    fieldName: 'generalOrInorganicChemistry1',
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'General/Inorganic Chemistry 1 cannot be empty',
    },
  },
  {
    label: 'General/Inorganic Chemistry 2',
    lookUpName: 'General/Inorganic_Chemistry_2',
    type: FieldType.DROPDOWN,
    fieldName: 'generalOrInorganicChemistry2',
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'General/Inorganic Chemistry 2 cannot be empty',
    },
  },
  {
    label: 'Organic Chemistry 1',
    lookUpName: 'Organic_Chemistry_1',
    fieldName: 'organicChemistry1',
    type: FieldType.DROPDOWN,
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'Organic Chemistry 1 cannot be empty',
    },
  },
  {
    label: 'Organic Chemistry 2 or Biochemistry',
    lookUpName: 'Organic_Chemistry_2_or_Biochemistry',
    fieldName: 'organicChemistry2OrBiochemistry',
    type: FieldType.DROPDOWN,
    pickListValues: [
      { name: 'Incomplete' },
      { name: 'Complete' },
      { name: 'InProgress' },
    ],
    placeholder: 'Select any Option',
    rules: {
      required: 'Organic Chemistry 2 or Biochemistry cannot be empty',
    },
  },
]
