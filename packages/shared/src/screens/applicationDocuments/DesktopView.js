import { View, ScrollView } from 'react-native'
import React from 'react'
import { Button, FilePicker, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'

const DesktopView = ({
  applicantPhotoDocs,
  cvDocuments,
  cvDocs,
  medicalDocs,
  photoDocs,
  medicalStatementDocs,
  handleDelete,
  handleNextStep,
  handleUploadDocs,
}) => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 60,
          paddingHorizontal: 40,
        }}
      >
        <Text variant="heading2" style={{ marginBottom: 20 }}>
          Application Document Requirements
        </Text>
        <Text variant="body2" style={{ marginBottom: 20 }}>
          Your personal medical school statement, applicant photo and resume/CV
          will be required of all candidates. You may upload these supplemental
          documents to your Community Portal. Acceptable document formats for
          attachments are: Microsoft Word, PDF, and Jpeg.
        </Text>
        <FilePicker
          heading="CV"
          uploadFile={handleUploadDocs}
          successState={cvDocs}
          handleDelete={handleDelete}
          uploadedFiles={cvDocuments}
          documentType="CV"
          isMandatory
        />
        <FilePicker
          heading="Applicant Photo"
          uploadFile={handleUploadDocs}
          successState={photoDocs}
          handleDelete={handleDelete}
          uploadedFiles={applicantPhotoDocs}
          documentType="Applicant_Photo"
          isMandatory
        />
        <FilePicker
          heading="Personal Medical School Statements"
          uploadFile={handleUploadDocs}
          successState={medicalDocs}
          handleDelete={handleDelete}
          uploadedFiles={medicalStatementDocs}
          documentType="Medical_Statement"
          isMultiUpload
          isMandatory
        />
        <Button
          label="Next"
          buttonStyle={{ marginVertical: 30, maxWidth: 70 }}
          labelColors={colors.white}
          onPress={() => handleNextStep()}
        />
      </ScrollView>
    </View>
  )
}

export default DesktopView
