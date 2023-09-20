import { View } from 'react-native'
import React from 'react'
import { Text } from '@libs/components'
import { Icon } from '@r3-oaf/native-icons'
import { useTheme } from '@react-navigation/native'

const DesktopView = ({ tabName, programName }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <View
        style={{
          maxWidth: 800,
          padding: 20,
        }}
      >
        <Text
          variant="heading1"
          style={{ textAlign: 'center', marginBottom: 30 }}
          color={colors.onAlert}
        >
          Thank You for applying!
        </Text>
        <Text
          variant="heading2"
          style={{ textAlign: 'center', marginBottom: 30 }}
          color={colors.primary}
        >
          {programName}
        </Text>
        <View style={{ flexDirection: 'column' }}>
          {tabName?.map((item) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="Check"
                  height={20}
                  width={20}
                  color={colors.onAlert}
                />
                <Text style={{ marginLeft: 10 }} variant="body1">
                  {item?.title}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default DesktopView
