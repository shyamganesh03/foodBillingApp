import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, ProgressBar } from '@libs/components'
import { Header, Loader, StartApplication } from '../../components'
import CommonApplication from '../common-application-step-1'
import ChooseProgrammes from '../chooseProgrammes-step-2'

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
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
    },
  })

export default DesktopView
