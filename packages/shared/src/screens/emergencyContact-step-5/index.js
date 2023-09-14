import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'

const EmergencyContact = () => {
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

export default EmergencyContact
