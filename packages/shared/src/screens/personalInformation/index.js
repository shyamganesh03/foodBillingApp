import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { fieldData } from './data/metaData'
import {
  canNonEmptyObject,
  fieldValidation,
  mandatoryValidation,
} from '../../utils/fieldValidation'

const PersonalInformation = (props) => {
  const [personalInformation, setPersonalInformation] = useState({})
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })

  const { mutate: mutation } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const [validationError, setValidationError] = useState()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const checkCTAStatus = () => {
    let hasNonEmptyValue = false

    if (validationError) {
      hasNonEmptyValue = canNonEmptyObject(validationError)
    }

    if (isLoading.primary || isLoading.secondary || hasNonEmptyValue) {
      return true
    }

    return hasNonEmptyValue
  }

  const handleSubmit = async ({ type, buttonVariant }) => {
    const mandatoryFields = mandatoryValidation(fieldData, personalInformation)
    if (mandatoryFields?.length > 0) {
      mandatoryFields.forEach((mandatoryFieldItem) => {
        setValidationError((prevError) => ({
          ...prevError,
          [mandatoryFieldItem]: 'Please fill the Field',
        }))
      })

      toast.show('Please fill the mandatory Fields', {
        type: 'danger',
      })
    } else {
      setIsLoading((prevValue) => ({
        ...prevValue,
        [buttonVariant]: true,
      }))

      const updatedContactInformation = {
        ...personalInformation,
        AltPhoneNumber: `${personalInformation['alternativePhoneNumberCountryCode']}-${personalInformation['AltPhoneNumber']}`,
        mobileOrPrimaryNumber: `${personalInformation['mobileOrPrimaryNumberCountryCode']}-${personalInformation['mobileOrPrimaryNumber']}`,
      }

      await mutation.mutateAsync({
        type,
        fieldData: updatedContactInformation,
      })

      setIsLoading((prevValue) => ({
        ...prevValue,
        [buttonVariant]: false,
      }))
    }
  }

  useEffect(() => {
    if (!isFocused) return
    fieldData.forEach((fieldItem) => {
      setPersonalInformation((prevValue) => ({
        ...prevValue,
        [fieldItem.fieldName]: applicationDetails?.[fieldItem?.fieldName] || '',
      }))
    })
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    const validation = fieldValidation({
      type: fieldItem.inputType,
      validationValue: selectedValue,
    })
    if (!validation.isValid && fieldItem.inputType !== 'number') {
      setValidationError((prevValidationError) => ({
        ...prevValidationError,
        [fieldItem.fieldName]: validation.error,
      }))
    } else {
      setValidationError((prevValidationError) => ({
        ...prevValidationError,
        [fieldItem.fieldName]: '',
      }))
    }
    if (validation.isValid || selectedValue === '')
      setPersonalInformation((prevValue) => ({
        ...prevValue,
        [fieldItem.fieldName]: selectedValue?.name || selectedValue,
      }))
  }

  const handleCountrySelection = ({ fieldItem, selectedValue }) => {
    setPersonalInformation((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue.name.split(' ')[1],
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    fieldData,
    personalInformation,
    isLoading,
    validationError,
    checkCTAStatus,
    handleCountrySelection,
    handleValueChange,
    handleSubmit,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default PersonalInformation
