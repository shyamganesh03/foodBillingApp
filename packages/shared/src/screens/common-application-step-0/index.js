import { Text } from 'react-native'
import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'

const CommonApplication = (props) => {
  const [school, setSchool] = useState({
    firstChoiceSchool: '',
    secondChoiceSchool: '',
    thirdChoiceSchool: '',
    isCommonApplication: '',
  })

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const handleValueChange = () => {}

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...props} />
    </Suspense>
  )
}

export default CommonApplication
