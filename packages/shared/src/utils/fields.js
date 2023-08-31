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
            type: 'checkbox',
            checkboxValues: [true, false],
          },
          {
            dropdown: [
              {
                label: 'First Choice School',
                name: 'firstChoiceSchool',
                type: 'PickList',
                pickListValues: [
                  { name: 'SABA' },
                  { name: 'MUA' },
                  { name: "St. Matthew's university" },
                  { name: 'None' },
                ],
              },
              {
                label: 'Second Choice School',
                name: 'secondChoiceSchool',
                type: 'PickList',
                pickListValues: [
                  { name: 'SABA' },
                  { name: 'MUA' },
                  { name: "St. Matthew's university" },
                  { name: 'None' },
                ],
              },
              {
                label: 'ThirdChoiceSchool',
                name: 'thirdChoiceSchool',
                type: 'PickList',
                pickListValues: [
                  { name: 'SABA' },
                  { name: 'MUA' },
                  { name: "St. Matthew's university" },
                  { name: 'None' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  step1: {
    title: 'Start Your Application',
    sections: [
      {
        title: 'Applicant Information',
        fields: [
          {
            label: 'First Name',
            name: 'firstName',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Middle Name',
            name: 'middleName',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Last Name',
            name: 'lastName',
            type: 'textField',
            mandatory: true,
          },
          {
            label: 'Title',
            name: 'title',
            type: 'PickList',
            pickListValues: [
              { name: 'Mrs' },
              { name: 'Dr' },
              { name: 'Mr' },
              { name: 'Ms' },
            ],
            mandatory: true,
          },
          {
            label: 'Birthdate',
            name: 'birthdate',
            type: 'date',
            mandatory: true,
          },
          {
            label: 'Previous Names Used',
            name: 'previousNamesUsed',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Previously Applied to this Institution?',
            name: 'previouslyAppliedToThisInstitution',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'Start Term Applying For',
            name: 'startTermApplyingFor',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
          },
        ],
      },
      {
        title: 'Contact Information',
        fields: [
          {
            label: 'Alternative Email Address',
            name: 'alternativeEmailAddress',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Mobile/Primary Number',
            name: 'mobileOrPrimaryNumber',
            type: 'textField',
            inputType: 'number',
            mandatory: true,
          },
          {
            label: 'Alternative Phone Number',
            name: 'alternativePhoneNumber',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Street Address',
            name: 'streetAddress',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'City',
            name: 'city',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Zip/Postal Code',
            name: 'zipOrPostalCode',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Mailing Country Code',
            name: 'mailingCountryCode',
            type: 'dropdown',
            dropdownValues: [{ name: 'India' }, { name: 'china' }],
            mandatory: true,
          },
          {
            label: 'Mailing State/Province Code',
            name: 'mailingStateOrProvinceCode',
            type: 'dropdown',
            dropdownValues: [{ name: 'Ind' }, { name: 'chn' }],
            mandatory: true,
          },
        ],
      },
      {
        title: 'Personal Information',
        fields: [
          {
            label: 'Gender',
            name: 'gender',
            type: 'PickList',
            pickListValues: [
              { name: 'Male' },
              { name: 'Female' },
              { name: 'Prefer not to report' },
            ],
            mandatory: true,
          },
          {
            label: 'Marital Status',
            name: 'maritalStatus',
            type: 'PickList',
            pickListValues: [
              { name: 'Single' },
              { name: 'Married' },
              { name: 'Divorced' },
              { name: 'Separated' },
              { name: 'Prefer not to Say' },
            ],
          },
          {
            label: 'Number of Dependents',
            name: 'NumberOfDependents',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Is English your Primary Language',
            name: 'isEnglishYourPrimaryLanguage',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'Place of Birth',
            name: 'PlaceOfBirth',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'What is your Citizenship Status?',
            name: 'citizenshipStatus',
            type: 'PickList',
            pickListValues: [
              { name: 'US Citizen' },
              { name: 'Canadian Citizen' },
              { name: 'US Permanent Resident' },
              { name: 'Canadian Permanent Resident' },
              { name: 'Dual US/Canadian Citizen or Permanent Resident' },
              { name: 'International' },
            ],
            mandatory: true,
          },
          {
            label: 'Are you a US Citizen/Permanent Resident?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
          },
          {
            label: 'Have a Non US or Canadian Passport?',
            name: 'OtherCountryPassport',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'If International Passport, Which Country?',
            name: 'internationalCitizenCountry',
            type: 'dropdown',
            dropdownValues: [{ name: 'India' }, { name: 'china' }],
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
        modelFields: [
          {
            label: 'Academic Institution',
            name: 'Academic Institution',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Degree Level',
            name: 'Degree Level',
            type: 'PickList',
            pickListValues: [
              { name: 'Undergraduate' },
              { name: 'Graduate' },
              { name: 'professional' },
              { name: 'Certificate' },
              { name: 'premedical' },
            ],
            mandatory: true,
          },
          {
            label: 'Academic Institution Estimated Start',
            name: 'startTime',
            type: 'date',
            mandatory: true,
          },
          {
            label: 'Academic Institution Estimated End Date',
            name: 'endTime',
            type: 'date',
            mandatory: true,
          },
          {
            label: 'Approx. Degree Earned Date',
            name: 'earnedDate',
            type: 'date',
            mandatory: true,
          },
        ],
      },
      {
        title: 'University Partnership',
        fields: [
          {
            label: 'University Partnership',
            name: 'University Partnership',
            type: 'dropdown',
            hasFullWidth: true,
            dropdownValues: [
              { name: 'Avila University' },
              { name: 'Central Methodist University' },
            ],
          },
        ],
      },
      {
        title: 'Prerequisite Coursework Information',
        fields: [
          {
            label: 'Biology 1',
            name: 'Biology_1',
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
            type: 'PickList',
            pickListValues: [
              { name: 'Incomplete' },
              { name: 'Complete' },
              { name: 'InProgress' },
            ],
            mandatory: true,
          },
        ],
      },
      {
        title: 'AAMC-MCAT Reporting',
        type: 'model',
        buttonText: 'New',
        modelFields: [
          {
            label: 'MCAT Exam Date',
            name: 'ExamDate',
            type: 'date',
          },
          {
            label: 'MCAT Total Score',
            name: 'MCAT Total Score',
            type: 'textField',
            inputType: 'string',
          },
        ],
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
            inputType: 'string',
          },
          {
            label: 'Clinical Experience Role',
            name: 'Clinical Experience Role',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Clinical Experience Hours Completed',
            name: 'Clinical Experience Hours Completed',
            type: 'textField',
            inputType: 'string',
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
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label:
              'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label:
              'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label:
              'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label:
              'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
        ],
      },
      {
        title: 'Additional Information',
        direction: 'column',
        fields: [
          {
            label: 'How did you hear about SABA',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [
              { name: 'Alumni' },
              { name: 'Current Student' },
              { name: 'Adviser' },
              { name: 'Internet Search' },
            ],
            mandatory: true,
            hasFullWidth: true,
          },
          {
            label: 'Other Schools Applying To',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
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
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Last Name or Indicate if Interfolio',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Email',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Phone',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
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
            type: 'checkbox',
            checkboxValues: [true, false],
          },
        ],
      },
    ],
  },
  step6: {
    title: 'Application Submission',
    sections: [],
  },
}
