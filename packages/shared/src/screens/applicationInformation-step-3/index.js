import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const ApplicationInformation = (props) => {
  const [applicationInformation, setApplicationInformation] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    title: '',
    birthdate: '',
    previousNamesUsed: '',
    previouslyAppliedToThisInstitution: '',
    startTermApplyingFor: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setApplicationInformation({
        firstName: applicationDetails['firstName'] || '',
        middleName: applicationDetails['middleName'] || '',
        lastName: applicationDetails['lastName'] || '',
        title: applicationDetails['title'] || '',
        birthdate: applicationDetails['birthdate'] || '',
        previousNamesUsed: applicationDetails['previousNamesUsed'] || '',
        previouslyAppliedToThisInstitution:
          applicationDetails['previouslyAppliedToThisInstitution'] || '',
        startTermApplyingFor: applicationDetails['startTermApplyingFor'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setApplicationInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    applicationInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationInformation
