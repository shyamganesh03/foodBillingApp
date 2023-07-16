import React, { useCallback, Suspense } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { ScreenLayout } from '@libs/utils'

const DashBoard = () => {
  const viewProps = {}

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default DashBoard
