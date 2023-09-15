export const fieldData = {
  title: 'Additional Information',
  direction: 'column',
  fields: [
    {
      label: 'How did you hear about SABA',
      name: 'referralsource',
      type: 'PickList',
      pickListValues: [],
      fieldName: 'howDidYouHearAboutSABA',
      mandatory: true,
      hasFullWidth: true,
    },
    {
      label: 'Other Schools Applying To',
      name: 'Previous Research Experience',
      type: 'textField',
      fieldName: 'otherSchoolsApplyingTo', //
      inputType: 'string',
    },
  ],
}
