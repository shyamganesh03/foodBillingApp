import { View, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Button, Text, TextInput } from '@libs/components'

const MobileView = () => {
  const { colors } = useTheme()
  return (
    <SafeAreaView style={styles({ colors }).container}>
      <View>
        <TextInput />
        <TextInput />
        <Button />
      </View>
    </SafeAreaView>
  )
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.primary,
    },
    loginContainer: {},
  })

export default MobileView
