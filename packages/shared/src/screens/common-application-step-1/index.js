import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const CommonApplication = (props) => {
  const [school, setSchool] = useState({
    firstChoiceSchool: '',
    secondChoiceSchool: '',
    thirdChoiceSchool: '',
    isCommonApplication: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setSchool({
        firstChoiceSchool: applicationDetails['firstChoiceSchool'] || '',
        secondChoiceSchool: applicationDetails['secondChoiceSchool'] || '',
        thirdChoiceSchool: applicationDetails['thirdChoiceSchool'] || '',
        isCommonApplication: applicationDetails['isCommonApplication'] || false,
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setSchool((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = { school, handleValueChange, handleSave }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default CommonApplication
