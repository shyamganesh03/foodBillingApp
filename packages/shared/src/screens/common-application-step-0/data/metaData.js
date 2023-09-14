export const fieldData = {
  title: 'Common Application',
  sections: [
    {
      title: 'One Dream, Three Schools, One Free Application',
      fields: [
        {
          label:
            'Saba University School of Medicine, along with its sister schools Medical University of the Americas and St. Matthew’s University, offer the unprecedented opportunity to apply to up to three top Caribbean medical schools at once! By submitting just one set of documents and participating in one interview, you can receive admissions decisions from any or all of the three medical schools. And there is no application fee! Tell us to which of the three medical schools you would like to apply, and in what order. And, it is just as easy (and free) to apply only to Saba, if that is what you prefer.',
          type: 'description',
        },
        {
          label:
            'https://gusmed--r3play.sandbox.my.site.com/saba/servlet/rtaImage?eid=a0jS00000098Ni8&feoid=00N4P00000GiZXx&refid=0EMS0000000BUVz',
          type: 'image',
        },
        {
          label:
            'By checking the box below, you are opting in to the Common Application. This will automatically enter you for consideration based on this application to any schools you choose in the fields below.',
          name: 'isCommonApplication',
          fieldName: 'isCommonApplication',
          type: 'checkbox',
          checkboxValues: [true, false],
          selectedValue: false,
        },
      ],
    },
    {
      direction: 'row',
      fields: [
        {
          label: 'First Choice School',
          fieldName: 'firstChoiceSchool',
          name: 'schools',
          mandatory: true,
          type: 'PickList',
          pickListValues: [],
          selectedValue: '',
        },
        {
          label: 'Second Choice School',
          fieldName: 'secondChoiceSchool',
          name: 'schools',
          type: 'PickList',
          pickListValues: [],
          selectedValue: '',
        },
        {
          label: 'Third Choice School',
          fieldName: 'thirdChoiceSchool',
          name: 'schools',
          type: 'PickList',
          pickListValues: [],
          selectedValue: '',
        },
      ],
    },
  ],
}
