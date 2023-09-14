export const fieldData = {
  step1: {
    title: 'Start Your Application',
    sections: [
      {
        title: 'Program',
        fields: [
          {
            label: 'Choose your Program',
            name: 'programmes',
            fieldName: 'programmeName',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
          },
        ],
      },
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
          },
          {
            label: 'Middle Name',
            name: 'middleName',
            fieldName: 'middleName',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Last Name',
            name: 'lastName',
            fieldName: 'lastName',
            type: 'textField',
            mandatory: true,
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
          },
          {
            label: 'Birthdate',
            name: 'birthdate',
            fieldName: 'birthdate',
            type: 'date',
            inputType: 'dob',
            mandatory: true,
          },
          {
            label: 'Previous Names Used',
            name: 'previousNamesUsed',
            fieldName: 'previousNamesUsed',
            type: 'textField',
            inputType: 'string',
          },
          {
            label: 'Previously Applied to this Institution?',
            name: 'previouslyAppliedToThisInstitution',
            fieldName: 'previouslyAppliedToThisInstitution',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'Start Term Applying For',
            name: 'intakes',
            fieldName: 'startTermApplyingFor',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
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
            inputType: 'email',
            mandatory: true,
          },
          {
            label: 'Mobile/Primary Number',
            name: 'mobileOrPrimaryNumber',
            fieldName: 'phoneNumber',
            type: 'textField',
            inputType: 'phone',
            mandatory: true,
          },
          {
            label: 'Alternative Phone Number',
            name: 'alternativePhoneNumber',
            fieldName: 'AltPhoneNumber',
            type: 'textField',
            inputType: 'phone',
            mandatory: true,
          },
          {
            label: 'Street Address',
            name: 'streetAddress',
            fieldName: 'mailingStreet',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'City',
            name: 'city',
            type: 'textField',
            fieldName: 'mailingCity',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Zip/Postal Code',
            name: 'zipOrPostalCode',
            type: 'textField',
            fieldName: 'mailingPostalCode',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Mailing Country Code',
            name: 'mailingCountryCode',
            fieldName: 'mailingCountryCode',
            type: 'dropdown',
            dropdownValues: [],
            mandatory: true,
          },
          // {
          //   label: 'Mailing State/Province Code',
          //   name: 'mailingStateOrProvinceCode',
          //   fieldName: 'mailingStateCode',
          //   type: 'dropdown',
          //   dropdownValues: [
          //     { name: 'Tamil Nadu', value: 'TN' },
          //     { name: 'Karnataka', value: 'KA' },
          //     { name: 'Kerala', value: 'KL' },
          //   ],
          //   mandatory: true,
          //
          // },
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
          },
          {
            label: 'Emergency Contact Last Name',
            name: 'Emergency Contact Last Name',
            fieldName: 'emergencyContactLastName',
            type: 'textField',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Emergency Contact Relationship',
            name: 'studentrelationships',
            fieldName: 'emergencyContactRelationship',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
          },
          {
            label: 'Emergency Contact Primary Phone',
            name: 'Emergency Contact Primary Phone',
            fieldName: 'emergencyContactPrimaryPhone',
            type: 'textField',
            inputType: 'String',
            mandatory: true,
          },
          {
            label: 'Emergency Contact Email',
            name: 'Emergency Contact Email',
            fieldName: 'emergencyContactEmail',
            type: 'textField',
            inputType: 'email',
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
            fieldName: 'gender',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
          },
          {
            label: 'Marital Status',
            name: 'maritalstatus',
            fieldName: 'maritalStatus',
            type: 'PickList',
            pickListValues: [],
          },
          {
            label: 'Number of Dependents',
            name: 'NumberOfDependents',
            fieldName: 'numberOfDependents',
            type: 'textField',
            inputType: 'number',
          },
          {
            label: 'Is English your Primary Language',
            name: 'isEnglishYourPrimaryLanguage',
            fieldName: 'isEnglishYourPrimaryLanguage',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'Place of Birth',
            name: 'PlaceOfBirth',
            fieldName: 'placeOfBirth',
            type: 'textField',
            inputType: 'dob',
            mandatory: true,
          },
          {
            label: 'What is your Citizenship Status?',
            name: 'citizenshipstatus',
            fieldName: 'citizenshipStatus',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
          },
          {
            label: 'Are you a US Citizen/Permanent Resident?',
            name: 'isUsCitizen',
            fieldName: 'USCitizenOrPermanentResident',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
          },
          {
            label: 'Have a Non US or Canadian Passport?',
            name: 'OtherCountryPassport',
            fieldName: 'haveNonUSOrCanadianPassport',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
          },
          {
            label: 'If International Passport, Which Country?',
            name: 'internationalCitizenCountry',
            fieldName: 'internationalPassportCountry',
            type: 'textField',
            inputType: 'string',
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
        type: 'modal',
        buttonText: 'New',
        fieldName: 'universityOrCollegeInfo',
        modalFields: [
          {
            label: 'Academic Institution',
            name: 'institutionNameIfNotFound',
            type: 'textField',
            fieldName: 'institutionNameIfNotFound',
            inputType: 'string',
            mandatory: true,
          },
          {
            label: 'Degree Level',
            name: 'degreeLevel',
            fieldName: 'degreeLevel',
            type: 'PickList',
            pickListValues: [],
            mandatory: true,
          },
          {
            label: 'Academic Institution Estimated Start',
            name: 'startTermApplyingFor',
            fieldName: 'startTermApplyingFor',
            type: 'date',
            mandatory: true,
            inputType: 'startAcademicDate',
          },
          {
            label: 'Academic Institution Estimated End Date',
            name: 'endTermApplyingFor',
            fieldName: 'endTermApplyingFor',
            inputType: 'endAcademicDate',
            type: 'date',
            mandatory: true,
          },
          {
            label: 'Approx. Degree Earned Date',
            name: 'degreeEarnedDate',
            fieldName: 'degreeEarnedDate',
            inputType: 'degreeEarnedDate',
            type: 'date',
            mandatory: true,
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
      },
      {
        title: 'AAMC-MCAT Reporting',
        fieldName: 'AAMCMCATReporting',
        type: 'modal',
        buttonText: 'New',
        modalFields: [
          {
            label: 'MCAT Exam Date',
            name: 'MCATDate',
            fieldName: 'MCATDate',
            inputType: 'MCATDate',
            type: 'date',
          },
          {
            label: 'MCAT Total Score',
            name: 'MCATTotalScore',
            inputType: 'number',
            type: 'textField',
            fieldName: 'MCATTotalScore',
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
        type: 'modal',
        buttonText: 'New',
        fieldName: 'clinicalOrHospitalExperienceDetails',
        modalDirection: 'column',
        modalFields: [
          {
            label: 'Clinic/Hospital',
            name: 'clinicOrHospital',
            type: 'textField',
            fieldName: 'clinicOrHospital',
            inputType: 'string',
          },
          {
            label: 'Clinical Experience Role',
            name: 'clinicalExperienceRole',
            type: 'textField',
            fieldName: 'clinicalExperienceRole',
            inputType: 'string',
          },
          {
            label: 'Clinical Experience Hours Completed',
            name: 'clinicalExperienceHoursCompleted',
            type: 'textField',
            inputType: 'number',
            fieldName: 'clinicalExperienceHoursCompleted',
          },
        ],
      },
      {
        title: 'Research Experience',
        type: 'modal',
        buttonText: 'New',
        fieldName: 'researchExperience',
        modalDirection: 'column',
        modalFields: [
          {
            label: 'Previous Research Experience',
            name: 'previousResearchExperience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'previousResearchExperience',
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
            fieldName: 'academicWithdrawal',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            fieldName: 'academicWithdrawalReason',
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
            fieldName: 'arrestedChargedOrConvictedOfCrime',
          },
          {
            label: 'If yes, then please explain',
            name: 'crimeReason',
            type: 'textField',
            inputType: 'string',
            fieldName: 'crimeReason',
          },
          {
            label:
              'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: 'technicalStandardAccommodationNeeded',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'technicalStandardAccommodationReason',
          },
          {
            label:
              'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: 'technicalStandardsMedicalConditions',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'technicalStandardsMedicalReason',
          },
          {
            label:
              'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
            name: 'isUsCitizen',
            type: 'PickList',
            pickListValues: [{ name: 'Yes' }, { name: 'No' }],
            mandatory: true,
            hasFullWidth: true,
            fieldName: 'nonAcademicSuspendedDismissWithdrawn',
          },
          {
            label: 'If yes, then please explain',
            name: 'Previous Research Experience',
            type: 'textField',
            inputType: 'string',
            fieldName: 'nonAcademicWithdrawalReason',
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
        hasAttachments: true,
        type: 'modal',
        modalFields: [{ label: 'Name' }, { label: 'Type' }],
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
        type: 'modal',
        buttonText: 'New',
        description: {
          label:
            'At least two letters of recommendation are required of all applicants. For recent graduates it is highly recommended that at least one letter is from a professional acquaintance and the other is academic related.',
          type: 'description',
        },
        fieldName: 'recommenders',
        modalDirection: 'column',
        modalFields: [
          {
            label: 'First Name or Indicate if Interfolio',
            name: 'recommenderFirstName',
            type: 'recommenderFirstName',
            fieldName: 'recommenderFirstName',
            inputType: 'string',

            type: 'textField',
          },
          {
            label: 'Last Name or Indicate if Interfolio',
            name: 'recommenderLastName',
            type: 'textField',
            fieldName: 'recommenderLastName',
            inputType: 'string',
          },
          {
            label: 'Email',
            name: 'recommenderEmail',
            type: 'textField',
            inputType: 'email',
            fieldName: 'recommenderEmail',
          },
          {
            label: 'Phone',
            name: 'recommenderPhone',
            type: 'textField',
            inputType: 'phone',
            fieldName: 'recommenderPhone',
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
          },
          {
            label: 'Submitted Signature Date',
            name: 'signatureDate',
            fieldName: 'signatureDate',
            type: 'date',
            inputType: 'signatureDate',
            mandatory: true,
          },
        ],
      },
    ],
  },
}
