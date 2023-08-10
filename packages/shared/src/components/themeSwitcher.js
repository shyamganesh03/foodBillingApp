import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai'
import { appTheme } from '../utils/atom'
import { useTheme } from '@react-navigation/native'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(appTheme)
  const { colors } = useTheme()
  return (
    <View style={{ paddingRight: 20, flexDirection: 'row', gap: 20 }}>
      <TouchableOpacity onPress={() => setTheme('light')}>
        <Text style={{ color: colors.text }}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme('dark')}>
        <Text style={{ color: colors.text }}>Dark</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ThemeSwitcher
