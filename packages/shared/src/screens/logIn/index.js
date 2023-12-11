import React, { Suspense, useCallback, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { ScreenLayout, SecureStore } from '@libs/utils'
import { Text } from '@libs/components'
import MobileView from './MobileView'
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Login = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: '',
    password: ''
  })
  const authentication = auth()
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const handleValueChange = (value, fieldName) => {
    setLoginCredential((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleLogin = async () => {
    const res = await authentication.signInWithEmailAndPassword(loginCredential.email, loginCredential.password)
    await SecureStore.setItemAsync('userProfile', JSON.stringify(res.user))
    navigation.navigate('dashboard')
  }

  useEffect(() => {
    if (!isFocused) return

    (async () => {
      const currentUser = authentication.currentUser

      if (currentUser) {
        navigation.navigate('dashboard')
      }
    })()
  }, [isFocused])

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(MobileView, MobileView, MobileView),
    [],
  )
  const viewProps = { loginCredential, handleLogin, handleValueChange }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Login
