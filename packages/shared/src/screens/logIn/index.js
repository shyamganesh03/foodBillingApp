import React, { Suspense, useCallback, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '@libs/components'
import MobileView from './MobileView'

const Login = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: '',
    password: ''
  })

  const handleValueChange = (value, fieldName) => {
    setLoginCredential((prev) => ({ ...prev, [fieldName]: value }))
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(MobileView, MobileView, MobileView),
    [],
  )
  const viewProps = { loginCredential, handleValueChange }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Login
