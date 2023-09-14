import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, ProgressBar } from '@libs/components'
import {
  Header,
  Loader,
  LeftContainer,
  CommonApplication,
} from '../../components'

const DesktopView = ({
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

  if (isLoading) {
    return (
      <ScrollView
        contentContainerStyle={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </ScrollView>
    )
  }
  return (
    <View style={styles({ colors }).container}>
      <LeftContainer
        tabItems={tabItems}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <View style={styles({ colors }).rightContainer}>
        <Header title={'saba university school of medicine'} />
        <RenderComponent
          activeTab={activeTab}
          fieldData={formData}
          tabItems={tabItems}
          handleValueChanged={handleValueChanged}
          handleSave={handleSave}
        />
        {validationError ? (
          <Text
            variant="body2"
            style={{ marginTop: 20, paddingLeft: 12 }}
            color={colors.onAlert}
          >
            {validationError}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

const RenderComponent = ({
  handleSave,
  activeTab,
  fieldData,
  tabItems,
  handleValueChanged,
}) => {
  if (activeTab === 0) {
    return (
      <CommonApplication
        fieldData={fieldData[`step${activeTab}`]}
        activeTab={activeTab}
        tabItems={tabItems}
        handleValueChanged={handleValueChanged}
        handleSave={handleSave}
      />
    )
  }
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
