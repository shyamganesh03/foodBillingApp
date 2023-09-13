import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'
import { Text, ProgressBar } from '@libs/components'
import {
  Tabs,
  Header,
  Loader,
  LeftContainer,
  CommonApplication,
} from '../../components'

const DesktopView = ({
  isLoading,
  tabItems,
  activeTab,
  formData,
  setActiveTab,
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
        <Header title={'Test'} />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingVertical: 60,
            paddingHorizontal: 40,
          }}
        >
          <RenderComponent activeTab={activeTab} fieldData={formData} />
        </ScrollView>
      </View>
    </View>
  )
}

const RenderComponent = ({ activeTab, fieldData }) => {
  if (activeTab === 0) {
    return <CommonApplication fieldData={fieldData[`step${activeTab}`]} />
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
