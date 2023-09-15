export const fieldData = {
  title: 'Prerequisite Coursework Information',
  fields: [
    {
      label: 'Biology 1',
      name: 'Biology_1',
      fieldName: 'biology1',
      type: 'PickList',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],
      mandatory: true,
    },
    {
      label: 'Biology 2',
      name: 'Biology_2',
      fieldName: 'biology2',
      type: 'PickList',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],

      mandatory: true,
    },
    {
      label: 'General/Inorganic Chemistry 1',
      name: 'General/Inorganic_Chemistry_1',
      type: 'PickList',
      fieldName: 'generalOrInorganicChemistry1',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],

      mandatory: true,
    },
    {
      label: 'General/Inorganic Chemistry 2',
      name: 'General/Inorganic_Chemistry_2',
      type: 'PickList',
      fieldName: 'generalOrInorganicChemistry2',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],

      mandatory: true,
    },
    {
      label: 'Organic Chemistry 1',
      name: 'Organic_Chemistry_1',
      fieldName: 'organicChemistry1',
      type: 'PickList',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],

      mandatory: true,
    },
    {
      label: 'Organic Chemistry 2 or Biochemistry',
      name: 'Organic_Chemistry_2_or_Biochemistry',
      fieldName: 'organicChemistry2OrBiochemistry',
      type: 'PickList',
      pickListValues: [
        { name: 'Incomplete' },
        { name: 'Complete' },
        { name: 'InProgress' },
      ],

      mandatory: true,
    },
  ],
}
