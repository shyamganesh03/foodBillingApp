import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import CommonApplication from '../common-application'
import ApplicationInformation from '../applicationInformation'
import ContactInformation from '../contactInformation'
import EmergencyContact from '../emergencyContact'
import PersonalInformation from '../personalInformation'
import PrerequisiteCourseworkInformation from '../prerequisiteCourseworkInformation'
import BackgroundInformation from '../background-Information-and-Technical-Standards'
import UniversityInformation from '../universityInformation'
import MCATReporting from '../aamc-mcat-Reporting'
import WorkExperience from '../workExperience'
import ResearchExperience from '../researchExperience'
import Recommenders from '../recommenders'
import ApplicationDocuments from '../applicationDocuments'
import ApplicationSubmission from '../applicationSubmission'
import { Loader } from '../../components'

const DesktopView = ({
  applicantPhoto,
  cvDocument,
  medicalDocuments,
  r3ApplicationDetails,
  steps,
  isLoading,
}) => {
  const { colors } = useTheme()

  if (isLoading) {
    return (
      <View style={styles({ colors }).container}>
        <Loader />
      </View>
    )
  }

  if (Number(steps) === 1) {
    return (
      <View style={styles({ colors }).container}>
        <CommonApplication applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }

  if (Number(steps) === 2) {
    return (
      <View style={styles({ colors }).container}>
        <ApplicationInformation applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 3) {
    return (
      <View style={styles({ colors }).container}>
        <ContactInformation applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 4) {
    return (
      <View style={styles({ colors }).container}>
        <EmergencyContact applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 5) {
    return (
      <View style={styles({ colors }).container}>
        <PersonalInformation applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 6) {
    return (
      <View style={styles({ colors }).container}>
        <UniversityInformation applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 7) {
    return (
      <View style={styles({ colors }).container}>
        <PrerequisiteCourseworkInformation
          applicationDetails={r3ApplicationDetails}
        />
      </View>
    )
  }
  if (Number(steps) === 8) {
    return (
      <View style={styles({ colors }).container}>
        <MCATReporting applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 9) {
    return (
      <View style={styles({ colors }).container}>
        <WorkExperience applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 10) {
    return (
      <View style={styles({ colors }).container}>
        <ResearchExperience applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 11) {
    return (
      <View style={styles({ colors }).container}>
        <BackgroundInformation applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 12) {
    return (
      <View style={styles({ colors }).container}>
        <ApplicationDocuments
          applicationDetails={r3ApplicationDetails}
          cvDocuments={cvDocument}
          applicantPhotoDocs={applicantPhoto}
          medicalStatementDocs={medicalDocuments}
        />
      </View>
    )
  }
  if (Number(steps) === 13) {
    return (
      <View style={styles({ colors }).container}>
        <Recommenders applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  if (Number(steps) === 14) {
    return (
      <View style={styles({ colors }).container}>
        <ApplicationSubmission applicationDetails={r3ApplicationDetails} />
      </View>
    )
  }
  return null
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      height: '100vh',
      flexDirection: 'row',
      backgroundColor: props.colors.backgroundVariant,
    },
  })

export default DesktopView
