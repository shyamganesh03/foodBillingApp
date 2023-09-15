import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const PrerequisiteCourseworkInformation = (props) => {
  const [
    prerequisiteCourseworkInformation,
    setPrerequisiteCourseworkInformation,
  ] = useState({
    biology1: '',
    biology2: '',
    generalOrInorganicChemistry1: '',
    generalOrInorganicChemistry2: '',
    organicChemistry1: '',
    organicChemistry2OrBiochemistry: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setPrerequisiteCourseworkInformation({
        biology1: applicationDetails['biology1'] || '',
        biology2: applicationDetails['biology2'] || '',
        generalOrInorganicChemistry1:
          applicationDetails['generalOrInorganicChemistry1'] || '',
        generalOrInorganicChemistry2:
          applicationDetails['generalOrInorganicChemistry2'] || '',
        organicChemistry1: applicationDetails['organicChemistry1'] || '',
        organicChemistry2OrBiochemistry:
          applicationDetails['organicChemistry2OrBiochemistry'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setPrerequisiteCourseworkInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    prerequisiteCourseworkInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default PrerequisiteCourseworkInformation
