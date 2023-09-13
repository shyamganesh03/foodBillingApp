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
import { Loader } from '../../components'
import ApplicationProgressCard from '../../components/Card/ApplicationProgressCard'

const DesktopView = ({ isLoading, tabItems }) => {
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
      <LeftContainer tabItems={tabItems} />
      <View style={styles({ colors }).rightContainer}>
        <Header title={'Test'} />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingVertical: 60,
            paddingHorizontal: 40,
            alignItems: 'center',
          }}
        ></ScrollView>
      </View>
    </View>
  )
}

const LeftContainer = ({ content, tabItems }) => {
  const { colors } = useTheme()
  return (
    <View style={styles({ colors }).leftContainer}>
      {/* <Image source={BrandImageWhite} style={{ height: 38, width: 148 }} /> */}
      <ProgressBar progressBarStyle={{ paddingTop: 40 }} />
      <ApplicationProgressCard categoryData={tabItems} />
    </View>
  )
}

const Header = ({ title }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <View style={styles(colors).header}>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'web') {
            window.history.go(-1)
          } else {
            navigation.goBack()
          }
        }}
      >
        <Icon
          name="ArrowNarrowLeft"
          height={24}
          width={24}
          color={colors.text}
        />
      </TouchableOpacity>
      <View style={styles(colors).headerText}>
        <Icon
          name="ParliamentBuilding"
          height={27}
          width={29}
          color={colors.onNeutral}
        />
        <Text
          variant="display2"
          style={{ paddingLeft: 20 }}
          color={colors.onNeutral}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      height: '100vh',
      flexDirection: 'row',
    },
    leftContainer: {
      backgroundColor: props.colors?.primary,
      paddingHorizontal: 25,
      paddingVertical: 20,
      maxWidth: 300,
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
    },
    header: {
      flexDirection: 'row',
      paddingVertical: 27,
      paddingHorizontal: 30,
      shadowColor: 'rgba(3, 30, 125, 0.05)',
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    headerText: {
      paddingLeft: 20,
      flexDirection: 'row',
    },
  })

export default DesktopView
