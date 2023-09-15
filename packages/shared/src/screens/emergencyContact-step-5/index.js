import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const EmergencyContact = (props) => {
  const [emergencyContact, setEmergencyContact] = useState({
    emergencyContactFirstName: '',
    emergencyContactLastName: '',
    emergencyContactRelationship: '',
    emergencyContactPrimaryPhone: '',
    emergencyContactEmail: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setEmergencyContact({
        emergencyContactFirstName:
          applicationDetails['emergencyContactFirstName'] || '',
        emergencyContactLastName:
          applicationDetails['emergencyContactLastName'] || '',
        emergencyContactRelationship:
          applicationDetails['emergencyContactRelationship'] || '',
        emergencyContactPrimaryPhone:
          applicationDetails['emergencyContactPrimaryPhone'] || '',
        emergencyContactEmail:
          applicationDetails['emergencyContactEmail'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setEmergencyContact((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    emergencyContact,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default EmergencyContact