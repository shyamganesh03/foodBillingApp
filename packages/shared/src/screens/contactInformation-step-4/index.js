import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const ContactInformation = (props) => {
  const [contactInformation, setContactInformation] = useState({
    alternativeEmailAddress: '',
    phoneNumber: '',
    AltPhoneNumber: '',
    mailingStreet: '',
    mailingCity: '',
    mailingPostalCode: '',
    mailingCountryCode: '',
    canTextToMobile: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setContactInformation({
        alternativeEmailAddress:
          applicationDetails['alternativeEmailAddress'] || '',
        phoneNumber: applicationDetails['phoneNumber'] || '',
        AltPhoneNumber: applicationDetails['AltPhoneNumber'] || '',
        mailingStreet: applicationDetails['mailingStreet'] || '',
        mailingCity: applicationDetails['mailingCity'] || '',
        mailingPostalCode: applicationDetails['mailingPostalCode'] || '',
        mailingCountryCode: applicationDetails['mailingCountryCode'] || '',
        canTextToMobile: applicationDetails['canTextToMobile'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setContactInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    contactInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ContactInformation
