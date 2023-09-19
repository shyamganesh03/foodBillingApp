import { View, ScrollView } from 'react-native'
import React from 'react'
import { Button, FilePicker, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'

const DesktopView = ({
  applicantPhotoDocs,
  cvDocuments,
  fileData,
  medicalStatementDocs,
  handleDelete,
  handleNextStep,
  uploadDocs,
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
          uploadFile={uploadDocs}
          successState={fileData}
          handleDelete={handleDelete}
          uploadedFiles={cvDocuments}
          documentType="CV"
        />
        <FilePicker
          heading="Applicant Photo"
          uploadFile={uploadDocs}
          successState={fileData}
          handleDelete={handleDelete}
          uploadedFiles={applicantPhotoDocs}
          documentType="Applicant_Photo"
        />
        <FilePicker
          heading="Personal Medical School Statement"
          uploadFile={uploadDocs}
          successState={fileData}
          handleDelete={handleDelete}
          uploadedFiles={medicalStatementDocs}
          documentType="Medical_Statement"
          isMultiUpload
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
