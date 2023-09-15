import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const AdditionalInformation = (props) => {
  const [additionalInformation, setAdditionalInformation] = useState({
    howDidYouHearAboutSABA: '',
    otherSchoolsApplyingTo: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setAdditionalInformation({
        howDidYouHearAboutSABA:
          applicationDetails['howDidYouHearAboutSABA'] || '',
        otherSchoolsApplyingTo:
          applicationDetails['otherSchoolsApplyingTo'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setAdditionalInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    additionalInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default AdditionalInformation
