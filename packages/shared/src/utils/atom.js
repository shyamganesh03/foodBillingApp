import { atom } from 'jotai'

export const studentDetails = atom({})

export const applicationProgressDetails = atom({
  mandatoryFields: {
    Common_Application: [
      {
        label: 'First Choice School',
        isSaved: false,
        fieldName: 'firstChoiceSchool',
      },
      {
        label: 'Second Choice School',
        isSaved: false,
        fieldName: 'secondChoiceSchool',
      },
      {
        label: 'Third Choice School',
        isSaved: false,
        fieldName: 'thirdChoiceSchool',
      },
    ],
    Application_Information: [
      { label: 'First Name', isSaved: false, fieldName: 'firstName' },
      { label: 'Last Name', isSaved: false, fieldName: 'lastName' },
      { label: 'Title', isSaved: false, fieldName: 'title' },
      { label: 'Birthdate', isSaved: false, fieldName: 'birthdate' },
      {
        label: 'Choose your Program',
        isSaved: false,
        fieldName: 'programmeName',
      },
    ],
    Contact_Information: [
      {
        label: 'Alternative Email Address',
        isSaved: false,
        fieldName: 'alternativeEmailAddress',
      },
      {
        label: 'Mobile/Primary Number',
        isSaved: false,
        fieldName: 'phoneNumber',
      },
      {
        label: 'Alternative Phone Number',
        isSaved: false,
        fieldName: 'AltPhoneNumber',
      },
      { label: 'Street Address', isSaved: false, fieldName: 'mailingStreet' },
      { label: 'City', isSaved: false, fieldName: 'mailingCity' },
      {
        label: 'Zip/Postal Code',
        isSaved: false,
        fieldName: 'mailingPostalCode',
      },
      {
        label: 'Mailing Country Code',
        isSaved: false,
        fieldName: 'mailingCountryCode',
      },
    ],
    Emergency_Contact_Information: [
      {
        label: 'Emergency Contact First Name',
        isSaved: false,
        fieldName: 'emergencyContactFirstName',
      },
      {
        label: 'Emergency Contact Last Name',
        isSaved: false,
        fieldName: 'emergencyContactLastName',
      },
      {
        label: 'Emergency Contact Contact Relationship',
        isSaved: false,
        fieldName: 'emergencyContactRelationship',
      },
      {
        label: 'Emergency Contact Primary Phone',
        isSaved: false,
        fieldName: 'emergencyContactPrimaryPhone',
      },
      {
        label: 'Emergency Contact Email',
        isSaved: false,
        fieldName: 'emergencyContactEmail',
      },
    ],
    Personal_Information: [
      { label: 'Gender', isSaved: false, fieldName: 'gender' },
      {
        label: 'Place of Birth',
        isSaved: false,
        fieldName: 'placeOfBirth',
      },
      {
        label: 'What is your Citizenship Status?',
        isSaved: false,
        fieldName: 'citizenshipStatus',
      },
    ],
    'University/College_Information': {
      mandatoryFieldDetail: [
        {
          label: 'Academic Institution',
          isSaved: false,
          fieldName: 'institutionNameIfNotFound',
        },
        {
          label: 'Degree Level',
          isSaved: false,
          fieldName: 'degreeLevel',
        },
        {
          label: 'Academic Institution Estimated Start Date',
          isSaved: false,
          fieldName: 'startTermApplyingFor',
        },
        {
          label: 'Academic Institution Estimated End Date',
          isSaved: false,
          fieldName: 'endTermApplyingFor',
        },
        {
          label: 'Approx. Degree Earned Date',
          isSaved: false,
          fieldName: 'degreeEarnedDate',
        },
      ],
      list: [],
    },
    Prerequisite_Coursework_Information: [
      { label: 'Biology 1', isSaved: false, fieldName: 'biology1' },
      { label: 'Biology 2', isSaved: false, fieldName: 'biology2' },
      {
        label: 'General/Inorganic Chemistry 1',
        isSaved: false,
        fieldName: 'generalOrInorganicChemistry1',
      },
      {
        label: 'General/Inorganic Chemistry 2',
        isSaved: false,
        fieldName: 'generalOrInorganicChemistry2',
      },
      {
        label: 'Organic Chemistry 1',
        isSaved: false,
        fieldName: 'organicChemistry1',
      },
      {
        label: 'Organic Chemistry 2 or Biochemistry',
        isSaved: false,
        fieldName: 'organicChemistry2OrBiochemistry',
      },
    ],
    //AAMC-MCAT Reporting
    //{...}
    //Clinical/Hospital Experience
    //{...}
    //Research Experience
    //{...}
    Background_Information_and_Technical_Standards: [
      {
        label:
          'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for academic reasons?',
        isSaved: false,
        fieldName: 'academicWithdrawal',
      },
      {
        label:
          'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
        isSaved: false,
        fieldName: 'arrestedChargedOrConvictedOfCrime',
      },
      {
        label:
          'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
        isSaved: false,
        fieldName: 'technicalStandardAccommodationNeeded',
      },
      {
        label:
          'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
        isSaved: false,
        fieldName: 'technicalStandardsMedicalConditions',
      },
      {
        label:
          'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
        isSaved: false,
        fieldName: 'nonAcademicSuspendedDismissWithdrawn',
      },
    ],
    Additional_Information: [
      {
        label: 'How did you hear about GUS Medical Universities',
        isSaved: false,
        fieldName: 'howDidYouHearAboutSABA',
      },
    ],
    Application_Document_Requirements: [
      {
        fileType: 'CV',
        label: 'CV',
        isSaved: false,
      },
      {
        fileType: 'Applicant_Photo',
        label: 'Applicant Photo',
        isSaved: false,
      },
      {
        fileType: 'Medical_Statement',
        label: 'Personal Medical School Statements',
        isSaved: false,
      },
    ],
  },
})
