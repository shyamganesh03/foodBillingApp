import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Button, PasswordInput, Text, TextInput } from '@libs/components'
import { LinkText } from '../../components'
import LayoutContainer from "../../container/LayoutContainer"

const MobileView = ({ loginCredential, handleLogin, handleValueChange }) => {
  const { colors } = useTheme()
  return (
    <LayoutContainer>
      <View style={styles({ colors }).loginContainer}>
        <Text
          variant="heading2"
          style={{ textAlign: 'center', marginTop: 80 }}
        >
          Sign In
        </Text>
        <TextInput placeholder="UserName / Email" value={loginCredential.email} onChangeText={(value) => handleValueChange(value, 'email')} />
        <PasswordInput placeholder="Password" value={loginCredential.password} onChangeText={(value) => handleValueChange(value, 'password')} />
        <Button
          label="Sign In"
          buttonStyle={{ marginTop: 20, width: 220 }}
          labelColors={colors.white}
          onPress={handleLogin}
        />
        <Text
          variant="display1"
          style={{ marginTop: 60 }}
          color={colors.primary}
        >
          Powered by Fusion Fox
        </Text>
      </View>
    </LayoutContainer>
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
