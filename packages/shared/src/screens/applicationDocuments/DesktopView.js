import { View, ScrollView } from 'react-native'
import React from 'react'
import { FilePicker, Text } from '@libs/components'

const DesktopView = () => {
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
        <CVContainer />
      </ScrollView>
    </View>
  )
}

const CVContainer = () => {
  return (
    <View style={{}}>
      <FilePicker heading="CV" />
    </View>
  )
}

export default DesktopView
