import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, ProgressBar } from '@libs/components'
import { Header, Loader, StartApplication } from '../../components'
import CommonApplication from '../common-application-step-0'

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

  if (Number(steps) === 1) {
    return (
      <View style={styles({ colors }).container}>
        <View style={styles({ colors }).rightContainer}>
          <StartApplication
            fieldData={formData[`step${steps}`]}
            activeTab={steps}
            tabItems={tabItems}
            handleValueChanged={handleValueChanged}
            handleSave={handleSave}
          />
        </View>
      </View>
    )
  }

  return (
    <CommonApplication
      fieldData={formData[`step${activeTab}`]}
      activeTab={activeTab}
      tabItems={tabItems}
      handleSave={handleSave}
    />
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
