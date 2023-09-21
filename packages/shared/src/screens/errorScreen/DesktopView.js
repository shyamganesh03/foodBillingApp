import { Image, View } from 'react-native'
import React from 'react'
import { gesMedicalCollegeLogo } from '@oap/assets'
import { Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'

const DesktopView = () => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
      }}
    >
      <Image
        source={gesMedicalCollegeLogo}
        style={{ height: 400, width: 400 }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}
      >
        <Icon name="AlertIcon" height={18} width={18} color={colors.primary} />
        <Text
          variant="subHeading1"
          style={{ marginLeft: 10 }}
          color={colors.onAlert}
        >
          Invalid Application Id. Please try with a valid application.
        </Text>
      </View>
    </View>
  )
}

export default DesktopView
