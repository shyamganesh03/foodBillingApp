import React from 'react'
import { ProgressBar } from '@libs/components'
import Tabs from '../Tabs'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const LeftContainer = ({ content, tabItems, setActiveTab, activeTab }) => {
  const { colors } = useTheme()
  return (
    <View style={styles({ colors }).leftContainer}>
      {/* <Image source={BrandImageWhite} style={{ height: 38, width: 148 }} /> */}
      <ProgressBar progressBarStyle={{ paddingTop: 40 }} />
      <Tabs
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
      maxWidth: 300,
    },
  })

export default LeftContainer
