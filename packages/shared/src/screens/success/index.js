import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { fieldData } from '../../utils/fields'
import { useIsFocused } from '@react-navigation/native'
import { LeftTimeLineData } from '../../constants/left-timeline-data'

const ThankYouScreen = (props) => {
  const [tabName, setTabName] = useState()
  const isFocused = useIsFocused()
  const programName = props.route.params?.programName

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      const tabs = LeftTimeLineData.map((item) => {
        return { title: item?.displayName }
      })
      setTabName(tabs)
    })()
  }, [isFocused])
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )
  const viewProps = { tabName, programName }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ThankYouScreen
