import { Text } from 'react-native'
import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'

const CommonApplication = (props) => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...props} />
    </Suspense>
  )
}

export default CommonApplication
