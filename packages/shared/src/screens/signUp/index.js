import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '@libs/components'
import MobileView from './MobileView'

const SignUp = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(MobileView, MobileView, MobileView),
    [],
  )
  const viewProps = {}
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default SignUp
