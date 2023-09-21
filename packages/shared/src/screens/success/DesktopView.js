import { FlatList, Image, View } from 'react-native'
import React from 'react'
import { Text } from '@libs/components'
import { Icon } from '@r3-oaf/native-icons'
import { useTheme } from '@react-navigation/native'
import { gesMedicalCollegeLogo } from '@oap/assets'

const DesktopView = ({ tabName, programName }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <Image
        source={gesMedicalCollegeLogo}
        style={{ height: 150, width: 300 }}
        resizeMode="contain"
      />
      <View
        style={{
          width: 800,
          padding: 20,
          backgroundColor: colors.white,
          borderRadius: 10,
          marginLeft: 20,
        }}
      >
        <Text
          variant="heading1"
          style={{ textAlign: 'center', fontWight: 700, marginBottom: 20 }}
          color={colors.onAlert}
        >
          Thank You for applying!
        </Text>
        <Text
          variant="heading2"
          style={{ textAlign: 'center', marginBottom: 10, fontWight: 700 }}
          color={colors.onNeutral}
        >
          {programName}
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <FlatList
            data={tabName}
            numColumns={2}
            keyExtractor={(_, index) => index}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    width: 380,
                  }}
                >
                  <Icon
                    name="Check"
                    height={20}
                    width={20}
                    color={colors.onAlert}
                  />
                  <Text
                    style={{ marginLeft: 10 }}
                    color={colors.onNeutral}
                    variant="body1"
                  >
                    {item?.title}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default DesktopView
