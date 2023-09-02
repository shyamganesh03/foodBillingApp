export const fieldData = {
  step0: {
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
            label: 'ThirdChoiceSchool',
            fieldName: 'thirdChoiceSchool',
            name: 'schools',
            type: 'PickList',
            pickListValues: [],
            selectedValue: '',
          },
        ],
      },
    ],
  },
  step1: {
    title: 'Start Your Application',
    sections: [
      {
        title: 'Application Information',
        fields: [
          {
            label: 'First Name',
            name: 'firstName',
            fieldName: 'firstName',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Middle Name',
            name: 'middleName',
            fieldName: 'middleName',
            type: 'textField',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Last Name',
            name: 'lastName',
            fieldName: 'lastName',
            type: 'textField',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Title',
            name: 'title',
            fieldName: 'title',
            type: 'PickList',
            pickListValues: [
              { name: 'Mrs' },
              { name: 'Dr' },
              { name: 'Mr' },
              { name: 'Ms' },
            ],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Birthdate',
            name: 'birthdate',
            fieldName: 'birthdate',
            type: 'date',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Previous Names Used',
            name: 'previousNamesUsed',
            fieldName: 'previousNamesUsed',
            type: 'textField',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Previously Applied to this Institution?',
            name: 'previouslyAppliedToThisInstitution',
            fieldName: 'previouslyAppliedToThisInstitution',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            selectedValue: '',
          },
          {
            label: 'Start Term Applying For',
            name: 'intakes',
            fieldName: 'startTermApplyingFor',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
            selectedValue: '',
          },
        ],
      },
      {
        title: 'Contact Information',
        columnIndex: 8,
        fields: [
          {
            label: 'Alternative Email Address',
            name: 'alternativeEmailAddress',
            type: 'textField',
            fieldName: 'alternativeEmailAddress',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Mobile/Primary Number',
            name: 'mobileOrPrimaryNumber',
            fieldName: 'phoneNumber',
            type: 'textField',
            inputType: 'number',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Alternative Phone Number',
            name: 'alternativePhoneNumber',
            fieldName: 'AltPhoneNumber',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Street Address',
            name: 'streetAddress',
            fieldName: 'mailingStreet',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'City',
            name: 'city',
            type: 'textField',
            fieldName: 'mailingCity',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Zip/Postal Code',
            name: 'zipOrPostalCode',
            type: 'textField',
            fieldName: 'mailingPostalCode',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Mailing Country Code',
            name: 'mailingCountryCode',
            fieldName: 'mailingCountryCode',
            type: 'dropdown',
            dropdownValues: [{ name: 'India' }, { name: 'china' }],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Mailing State/Province Code',
            name: 'mailingStateOrProvinceCode',
            fieldName: 'mailingStateCode',
            type: 'dropdown',
            dropdownValues: [{ name: 'Ind' }, { name: 'chn' }],
            mandatory: true,
            selectedValue: '',
          },
          {
            label:
              'Text messages sent by the Admissions Office will not be used for "spam." By checking the confirmation box, you grant permission to Saba University School of Medicine to send text messages to your personal mobile phone number.',
            name: 'canTextToMobile',
            fieldName: 'canTextToMobile',
            isColumn: true,
            type: 'checkbox',
            checkboxValues: [true, false],
            selectedValue: false,
          },
        ],
      },
      {
        title: 'Emergency Contact Information',
        fields: [
          {
            label: 'Emergency Contact First Name',
            name: 'Emergency Contact First Name',
            type: 'textField',
            fieldName: 'emergencyContactFirstName',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Emergency Contact Last Name',
            name: 'Emergency Contact Last Name',
            fieldName: 'emergencyContactLastName',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Emergency Contact Relationship',
            name: 'studentrelationships',
            fieldName: 'emergencyContactRelationship',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Emergency Contact Primary Phone',
            name: 'Emergency Contact Primary Phone',
            fieldName: 'emergencyContactPrimaryPhone',
            type: 'textField',
            inputType: 'number',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Emergency Contact Email',
            name: 'Emergency Contact Email',
            fieldName: 'emergencyContactEmail',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
        ],
      },
      {
        title: 'Personal Information',
        fields: [
          {
            label: 'Gender',
            name: 'gender',
            fieldName: 'gender',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Marital Status',
            name: 'maritalstatus',
            fieldName: 'maritalStatus',
            type: 'PickList',
            pickListValues: [],
            selectedValue: '',
          },
          {
            label: 'Number of Dependents',
            name: 'NumberOfDependents',
            fieldName: 'numberOfDependents',
            type: 'textField',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Is English your Primary Language',
            name: 'isEnglishYourPrimaryLanguage',
            fieldName: 'isEnglishYourPrimaryLanguage',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            selectedValue: '',
          },
          {
            label: 'Place of Birth',
            name: 'PlaceOfBirth',
            fieldName: 'placeOfBirth',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'What is your Citizenship Status?',
            name: 'citizenshipstatus',
            fieldName: 'citizenshipStatus',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Are you a US Citizen/Permanent Resident?',
            name: 'isUsCitizen',
            fieldName: 'USCitizenOrPermanentResident',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Have a Non US or Canadian Passport?',
            name: 'OtherCountryPassport',
            fieldName: 'haveNonUSOrCanadianPassport',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            selectedValue: '',
          },
          {
            label: 'If International Passport, Which Country?',
            name: 'internationalCitizenCountry',
            fieldName: 'internationalPassportCountry',
            type: 'dropdown',
            dropdownValues: [{ name: 'India' }, { name: 'china' }],
            selectedValue: '',
          },
        ],
      },
    ],
  },
  step2: {
    title: 'Prerequisites, MCAT & Achievements',
    sections: [
      {
        title: 'University/College Information',
        type: 'model',
        buttonText: 'New',
        fieldName: 'universityOrCollegeInfo',
        modelFields: [
          {
            label: 'Academic Institution',
            name: 'Academic Institution',
            type: 'textField',
            fieldName: 'academicInstitution',
            inputType: 'string',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Degree Level',
            name: 'degreelevel',
            fieldName: 'degreeLevel',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Academic Institution Estimated Start',
            name: 'startTime',
            fieldName: 'startTermApplyingFor',
            type: 'date',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Academic Institution Estimated End Date',
            name: 'endTime',
            fieldName: 'endTermApplyingFor',
            type: 'date',
            mandatory: true,
            selectedValue: '',
          },
          {
            label: 'Approx. Degree Earned Date',
            name: 'earnedDate',
            fieldName: 'degreeEarnedDate',
            type: 'date',
            mandatory: true,
            selectedValue: '',
          },
        ],
      },
      {
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
            selectedValue: '',
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
            selectedValue: '',
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
            selectedValue: '',
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
            selectedValue: '',
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
            selectedValue: '',
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
            selectedValue: '',
            mandatory: true,
          },
        ],
      },
      {
        title: 'AAMC-MCAT Reporting',
        fieldName: 'AAMCMCATReporting',
        type: 'model',
        buttonText: 'New',
        modelFields: [
          {
            label: 'MCAT Exam Date',
            name: 'ExamDate',
            fieldName: 'MCATDate',
            type: 'date',
          },
          {
            label: 'MCAT Total Score',
            name: 'MCAT Total Score',
            type: 'textField',
            fieldName: 'MCATTotalScore',
            inputType: 'string',
          },
        ],
        selectedValue: '',
      },
    ],
  },
  step3: {
    title: 'Clinical and Research Experience',
    sections: [
      {
        title:
          'Clinical/Hospital Experience (Volunteer, Shadowing, Observation or Otherwise)',
        type: 'model',
        buttonText: 'New',
        modelDirection: 'column',
        modelFields: [
          {
            label: 'Clinic/Hospital',
            name: 'Clinic/Hospital',
            type: 'textField',
            fieldName: 'clinicOrHospital',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Clinical Experience Role',
            name: 'Clinical Experience Role',
            type: 'textField',
            fieldName: 'Professional_Experiences__c',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Clinical Experience Hours Completed',
            name: 'Clinical Experience Hours Completed',
            type: 'textField',
            inputType: 'string',
            fieldName: 'Professional_Experiences__c', //
            selectedValue: '',
          },
        ],
      },
      {
        title: 'Research Experience',
        type: 'model',
        buttonText: 'New',
        modelDirection: 'column',
        modelFields: [
          {
            label: 'Previous Research Experience',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'Professional_Experiences__c', //
            selectedValue: '',
          },
        ],
      },
    ],
  },
  step4: {
    title: 'Background Information and Technical Standards',
    sections: [
      {
        title: 'Background Information and Technical Standards',
        direction: 'column',
        fields: [
          {
            label:
              'All candidates for admission must meet the school’s Technical Standards, which describe the essential abilities and characteristics for the study and practice of medicine, including the abilities which relate to observation; communication; motor function; intellectual-conceptual (integrative and quantitative) abilities; and behavioral and social skills. By submitting this application, the candidate affirms that he or she has read the Technical Standards, which are available at www.saba.edu.',
            type: 'description',
          },
          {
            label:
              'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for academic reasons?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: '', //
            selectedValue: '',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            fieldName: '', //
            inputType: 'string',
            selectedValue: '',
          },
          {
            label:
              'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: '', //
            selectedValue: '',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: '', //
            selectedValue: '',
          },
          {
            label:
              'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: '', //
            selectedValue: '',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: '', //
            selectedValue: '',
          },
          {
            label:
              'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: '', //
            selectedValue: '',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: '', //
            selectedValue: '',
          },
          {
            label:
              'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: '', //
            selectedValue: '',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: '', //
            selectedValue: '',
          },
        ],
      },
      {
        title: 'Additional Information',
        direction: 'column',
        fields: [
          {
            label: 'How did you hear about SABA',
            name: 'referralsource',
            type: 'PickList',
            pickListValues: [],
            fieldName: '', //
            mandatory: true,
            hasFullWidth: true,
            selectedValue: '',
          },
          {
            label: 'Other Schools Applying To',
            name: 'Previous Research Experience',
            type: 'textField',
            fieldName: '', //
            inputType: 'string',
            selectedValue: '',
          },
        ],
      },
    ],
  },
  step5: {
    title: 'Application Document Requirements',
    sections: [
      {
        title: 'Application Document Requirements',
        hasNoBorder: true,
        fields: [{ label: 'Attach File', type: 'attachDocument' }],
      },
      {
        title: 'Attached Files',
        type: 'model',
        buttonText: 'New',
        modelFields: [],
      },
      {
        title: 'Supplemental Requirements',
        fields: [
          {
            label:
              'Your personal medical school statement, applicant photo and resume/CV will be required of all candidates. You may upload these supplemental documents to your Community Portal. Acceptable document formats for attachments are: Microsoft Word, PDF, and Jpeg.',
            type: 'description',
          },
        ],
      },
      {
        title: 'Recommenders',
        type: 'model',
        buttonText: 'New',
        description: {
          label:
            'At least two letters of recommendation are required of all applicants. For recent graduates it is highly recommended that at least one letter is from a professional acquaintance and the other is academic related.',
          type: 'description',
        },
        modelDirection: 'column',
        modelFields: [
          {
            label: 'First Name or Indicate if Interfolio',
            name: 'Previous Research Experience',
            type: 'recommenderFirstName',
            fieldName: '',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Last Name or Indicate if Interfolio',
            name: 'Previous Research Experience',
            type: 'textField',
            fieldName: 'recommenderLastName',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Email',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'recommenderEmail',
            selectedValue: '',
          },
          {
            label: 'Phone',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'recommenderPhone',
            selectedValue: '',
          },
        ],
      },
      {
        hasNoBorder: true,
        fields: [
          {
            label:
              "Under the terms of the Family Educational Rights and Privacy Act (FERPA), you can review letters of recommendation and accompanying forms after you enroll at a postsecondary institution and only if that institution saves the documents post-enrollment.Why should you consider waiving your right of access? Waiving your right lets colleges know that you will never try to read your recommendations. That in turn reassures colleges that your recommenders have provided support that is candid and truthful. While you are free to respond as you wish, if you choose not to waive your right, some recommenders may decline your request, and some colleges may disregard letters submitted on your behalf. Remember, even if you retain your right of access, you still won't be able to view any recommendations until after you have been admitted to and enrolled in a college. In other words, FERPA does not give you the right to inspect recommendations before they are sent to your colleges.After you make your selection, you will be able to invite your counselor and recommenders. Once you make the first invitation, you will not be able to change your response to the waiver question. To ensure that you fully understand the implications of your selection, we urge you not to answer the waiver question until you have consulted with your guidance counselor or another school official.For more information on FERPA, click here.",
            type: 'description',
          },
        ],
      },
      {
        hasNoBorder: true,
        fields: [
          {
            label: 'Waive Access to Recommendation',
            name: 'isCommonApplication',
            fieldName: 'WaiveAccessToRecommendation',
            type: 'checkbox',
            checkboxValues: [true, false],
            selectedValue: '',
          },
        ],
      },
    ],
  },
  step6: {
    title: 'Application Submission',
    sections: [
      {
        fields: [
          {
            label: 'Submission Signature',
            name: 'signature',
            fieldName: 'signature',
            type: 'textField',
            inputType: 'string',
            selectedValue: '',
          },
          {
            label: 'Submitted Signature Date',
            name: 'signatureDate',
            fieldName: 'signatureDate',
            type: 'date',
            mandatory: true,
            selectedValue: '',
          },
        ],
      },
    ],
  },
}
