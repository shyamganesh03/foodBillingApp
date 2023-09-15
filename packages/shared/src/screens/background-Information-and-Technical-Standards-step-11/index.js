import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const BackgroundInformation = (props) => {
  const [backgroundInformation, setBackgroundInformation] = useState({
    academicWithdrawal: '',
    academicWithdrawalReason: '',
    arrestedChargedOrConvictedOfCrime: '',
    crimeReason: '',
    technicalStandardAccommodationReason: '',
    technicalStandardsMedicalConditions: '',
    technicalStandardsMedicalReason: '',
    nonAcademicSuspendedDismissWithdrawn: '',
    nonAcademicWithdrawalReason: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setBackgroundInformation({
        academicWithdrawal: applicationDetails['academicWithdrawal'] || '',
        academicWithdrawalReason:
          applicationDetails['academicWithdrawalReason'] || '',
        arrestedChargedOrConvictedOfCrime:
          applicationDetails['arrestedChargedOrConvictedOfCrime'] || '',
        crimeReason: applicationDetails['crimeReason'] || '',
        technicalStandardAccommodationReason:
          applicationDetails['technicalStandardAccommodationReason'] || '',
        technicalStandardsMedicalConditions:
          applicationDetails['technicalStandardsMedicalConditions'] || '',
        technicalStandardsMedicalReason:
          applicationDetails['technicalStandardsMedicalReason'] || '',
        nonAcademicSuspendedDismissWithdrawn:
          applicationDetails['nonAcademicSuspendedDismissWithdrawn'] || '',
        nonAcademicWithdrawalReason:
          applicationDetails['nonAcademicWithdrawalReason'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setBackgroundInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    backgroundInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default BackgroundInformation
