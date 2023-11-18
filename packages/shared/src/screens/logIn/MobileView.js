import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Button, Text, TextInput } from '@libs/components'
import { LinkText } from '../../components'

const MobileView = ({ loginCredential, handleValueChange }) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView style={styles({ colors }).container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles({ colors }).loginContainer}>
          <Text
            variant="heading2"
            style={{ textAlign: 'center', marginTop: 80 }}
          >
            Sign In
          </Text>
          <TextInput placeholder="userName" />
          <TextInput placeholder="password" />
          <Button
            label="Sign In"
            buttonStyle={{ marginTop: 20, width: 220 }}
            labelColors={colors.white}
          />
          <Text
            variant="display1"
            style={{ marginTop: 60 }}
            color={colors.primary}
          >
            Powered by Fusion Fox
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: '30%',
    },
  })

export default MobileView
