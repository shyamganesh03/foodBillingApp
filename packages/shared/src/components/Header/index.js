import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@r3-oaf/native-icons'
import { Text } from '@libs/components'

const Header = ({ title }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
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
      <View style={styles.headerText}>
        <Icon
          name="ParliamentBuilding"
          height={27}
          width={29}
          color={colors.onNeutral}
        />
        <Text
          variant="heading1"
          style={{ paddingLeft: 20 }}
          color={colors.onNeutral}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default Header
