import { Text } from 'react-native'
import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'

const ErrorScreen = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {}

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ErrorScreen
