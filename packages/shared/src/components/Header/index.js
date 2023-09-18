import React from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Icon } from '@r3-oaf/native-icons'
import { Text } from '@libs/components'

const Header = ({ title }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.header}>
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
  },
  headerText: {
    paddingLeft: 20,
    flexDirection: 'row',
  },
})

export default Header
