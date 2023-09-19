import { atom } from 'jotai'

export const studentDetails = atom({})

export const applicationProgressDetails = atom({
  mandatoryFields: {
    Common_Application: [
      { label: 'First Choice School', isSaved: false },
      { label: 'Second Choice School', isSaved: false },
      { label: 'Third Choice School', isSaved: false },
    ],
    Additional_Information: [
      { label: 'First Name', isSaved: false },
      { label: 'Last Name', isSaved: false },
      { label: 'Title', isSaved: false },
      { label: 'Birthdate', isSaved: false },
      { label: 'Choose your Program', isSaved: false },
    ],
    Contact_Information: [
      { label: 'Alternative Email Address', isSaved: false },
      { label: 'Mobile/Primary Number', isSaved: false },
      { label: 'Alternative Phone Number', isSaved: false },
      { label: 'Street Address', isSaved: false },
      { label: 'City', isSaved: false },
      { label: 'Zip/Postal Code', isSaved: false },
      { label: 'Mailing Country Code', isSaved: false },
    ],
    Emergency_Contact_Information: [
      { label: 'Emergency Contact First Name', isSaved: false },
      { label: 'Emergency Contact Last Name', isSaved: false },
      { label: 'Emergency Contact Contact Relationship', isSaved: false },
      { label: 'Emergency Contact Primary Phone', isSaved: false },
      { label: 'Emergency Contact Email', isSaved: false },
    ],
    Personal_Information: [
      { label: 'Gender', isSaved: false },
      { label: 'Place of Birth', isSaved: false },
      { label: 'What is your Citizenship Status?', isSaved: false },
    ],
    //university
    //{...}
    Prerequisite_Coursework_Information: [
      { label: 'Biology 1', isSaved: false },
      { label: 'Biology 2', isSaved: false },
      { label: 'General/Inorganic Chemistry 1', isSaved: false },
      { label: 'General/Inorganic Chemistry 2', isSaved: false },
      { label: 'Organic Chemistry 1', isSaved: false },
      { label: 'Organic Chemistry 2 or Biochemistry', isSaved: false },
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
      },
      {
        label:
          'Have you been arrested, charged or convicted of a felony, misdemeanor or other crime?',
        isSaved: false,
      },
      {
        label:
          'Do you require any accommodation relating to a medical, mental, emotional, or other condition in order to meet the Technical Standards?',
        isSaved: false,
      },
      {
        label:
          'Do you have any medical, mental, emotional, or other condition that may prevent you from meeting the Technical Standards?',
        isSaved: false,
      },
      {
        label:
          'Have you withdrawn, been dismissed, suspended, or placed on probation from an academic institution for non-academic reasons?',
        isSaved: false,
      },
    ],
    Additional_Information: [
      {
        label: 'How did you hear about GUS Medical Universities',
        isSaved: false,
      },
    ],
    Application_Document_Requirements: [
      {
        label: 'CV',
        isSaved: false,
      },
      {
        label: 'Applicant Photo',
        isSaved: false,
      },
      {
        label: 'Personal Medical School Statements',
        isSaved: false,
      },
    ],
  },
})
