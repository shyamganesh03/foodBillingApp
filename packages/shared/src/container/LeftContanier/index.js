import React from 'react'
import { ProgressBar } from '@libs/components'
import TimeLine from '../../components/TimeLine'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SabaLogo } from '@oap/assets'

const LeftContainer = ({ content, tabItems, setActiveTab, activeTab }) => {
  const { colors } = useTheme()
  return (
    <View style={styles({ colors }).leftContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image
          source={SabaLogo}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
        <Image
          source={SabaLogo}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
        <Image
          source={SabaLogo}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
      </View>
      {/* <ProgressBar progressBarStyle={{ paddingTop: 40 }} /> */}
      <TimeLine
        categoryData={tabItems}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    leftContainer: {
      backgroundColor: props.colors?.primary,
      paddingHorizontal: 25,
      paddingVertical: 20,
      maxWidth: 350,
    },
  })

export default LeftContainer
