import React, { useEffect, useState } from 'react'
import { ProgressBar, Text } from '@libs/components'
import TimeLine from '../../components/TimeLine'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { gesMedicalCollegeLogo } from '@oap/assets'
import { applicationProgressDetails } from '../../utils/atom'
import { useAtom } from 'jotai'
import { getCurrent } from '../../navigation/RootNavigator'
import { useParams } from '@libs/utils'

const LeftContainer = ({ tabItems }) => {
  const { colors } = useTheme()
  const [applicationProgressDetail] = useAtom(applicationProgressDetails)
  const [progress, setProgress] = useState(0)
  const isFocused = useIsFocused()
  const routes = getCurrent()
  const { params } = useParams()
  const currentRoute = routes?.getCurrentRoute()
  const currentRoueName = currentRoute?.path
  const [showContainer, setShowContainer] = useState(true)
  const nonContainerRoutes = ['success', 'error']

  useEffect(() => {
    if (currentRoueName) {
      if (
        nonContainerRoutes.includes(
          currentRoueName.split('?')[0]?.replace('/', ''),
        )
      ) {
        setShowContainer(false)
      }
    }
  }, [isFocused, currentRoueName])

  useEffect(() => {
    if (!isFocused) return

    setProgress(applicationProgressDetail?.totalProgress?.progress)
  }, [isFocused, applicationProgressDetail?.totalProgress?.progress])

  if (!params?.steps) {
    return null
  }

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
      <View style={{ marginVertical: 20 }}>
        <Text
          variant="body1"
          color={colors.white}
          style={{ marginLeft: 10, marginBottom: 10 }}
        >
          {`${progress || 0}% completed `}
        </Text>
        <ProgressBar
          progressBarStyle={{
            maxWidth: '80%',
            marginLeft: 10,
          }}
          percentage={progress}
        />
      </View>
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
