import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import CommonApplication from '../common-application'
import ChooseProgrammes from '../chooseProgrammes'
import ApplicationInformation from '../applicationInformation'
import ContactInformation from '../contactInformation'
import EmergencyContact from '../emergencyContact'
import PersonalInformation from '../personalInformation'
import PrerequisiteCourseworkInformation from '../prerequisiteCourseworkInformation'
import BackgroundInformation from '../background-Information-and-Technical-Standards'
import AdditionalInformation from '../additionalInformation'

const DesktopView = ({
  steps,
  activeTab,
  formData,
  handleSave,
  handleValueChanged,
  isLoading,
  setActiveTab,
  tabItems,
  validationError,
}) => {
  const { colors } = useTheme()

  if (Number(steps) === 2) {
    return (
      <View style={styles({ colors }).container}>
        <ChooseProgrammes />
      </View>
    )
  }
  if (Number(steps) === 3) {
    return (
      <View style={styles({ colors }).container}>
        <ApplicationInformation />
      </View>
    )
  }
  if (Number(steps) === 4) {
    return (
      <View style={styles({ colors }).container}>
        <ContactInformation />
      </View>
    )
  }
  if (Number(steps) === 5) {
    return (
      <View style={styles({ colors }).container}>
        <EmergencyContact />
      </View>
    )
  }
  if (Number(steps) === 6) {
    return (
      <View style={styles({ colors }).container}>
        <PersonalInformation />
      </View>
    )
  }
  if (Number(steps) === 8) {
    return (
      <View style={styles({ colors }).container}>
        <PrerequisiteCourseworkInformation />
      </View>
    )
  }
  if (Number(steps) === 11) {
    return (
      <View style={styles({ colors }).container}>
        <BackgroundInformation />
      </View>
    )
  }
  if (Number(steps) === 12) {
    return (
      <View style={styles({ colors }).container}>
        <AdditionalInformation />
      </View>
    )
  }
  return (
    <View style={styles({ colors }).container}>
      <CommonApplication />
    </View>
  )
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
