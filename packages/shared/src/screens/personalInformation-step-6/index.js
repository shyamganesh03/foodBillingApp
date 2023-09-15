import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const PersonalInformation = (props) => {
  const [personalInformation, setPersonalInformation] = useState({
    gender: '',
    maritalStatus: '',
    numberOfDependents: '',
    isEnglishYourPrimaryLanguage: '',
    placeOfBirth: '',
    citizenshipStatus: '',
    USCitizenOrPermanentResident: '',
    haveNonUSOrCanadianPassport: '',
    internationalPassportCountry: '',
  })

  const { mutate: handleSave } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  useEffect(() => {
    if (!isFocused) return
    if (applicationDetails) {
      setPersonalInformation({
        gender: applicationDetails['gender'] || '',
        maritalStatus: applicationDetails['maritalStatus'] || '',
        numberOfDependents: applicationDetails['numberOfDependents'] || '',
        isEnglishYourPrimaryLanguage:
          applicationDetails['isEnglishYourPrimaryLanguage'] || '',
        placeOfBirth: applicationDetails['placeOfBirth'] || '',
        citizenshipStatus: applicationDetails['citizenshipStatus'] || '',
        USCitizenOrPermanentResident:
          applicationDetails['USCitizenOrPermanentResident'] || '',
        haveNonUSOrCanadianPassport:
          applicationDetails['haveNonUSOrCanadianPassport'] || '',
        internationalPassportCountry:
          applicationDetails['internationalPassportCountry'] || '',
      })
    }
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setPersonalInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    personalInformation,
    handleValueChange,
    handleSave,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default PersonalInformation
