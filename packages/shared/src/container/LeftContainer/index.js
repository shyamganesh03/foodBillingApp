import React, { useEffect, useState } from 'react'
import { ProgressBar } from '@libs/components'
import TimeLine from '../../components/TimeLine'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { gesMedicalCollegeLogo } from '@oap/assets'

const LeftContainer = ({ tabItems }) => {
  const { colors } = useTheme()

  return (
    <View style={styles({ colors }).leftContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image
          source={gesMedicalCollegeLogo}
          style={{
            height: 102,
            width: 302,
            alignSelf: 'center',
            marginBottom: 30,
          }}
          resizeMode="contain"
        />
      </View>
      {/* <ProgressBar progressBarStyle={{ paddingTop: 40 }} /> */}
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TimeLine categoryData={tabItems} />
      </ScrollView>
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    leftContainer: {
      backgroundColor: props.colors?.primary,
      height: '100vh',
      paddingHorizontal: 25,
      paddingVertical: 20,
      maxWidth: 350,
    },
  })

export default LeftContainer
