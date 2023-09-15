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

const ApplicationInformation = (props) => {
  const [applicationInformation, setApplicationInformation] = useState({})
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const [validationError, setValidationError] = useState()
  const { mutate: mutation } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const handleSubmit = async ({ type, buttonVariant }) => {
    const mandatoryFields = mandatoryValidation(
      fieldData,
      applicationInformation,
    )
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

      await mutation.mutateAsync({
        type,
        fieldData: applicationInformation,
      })

      setIsLoading((prevValue) => ({
        ...prevValue,
        [buttonVariant]: false,
      }))
    }
  }
  const checkCTAStatus = () => {
    let hasNonEmptyValue = false // Initialize to false initially

    if (validationError) {
      hasNonEmptyValue = canNonEmptyObject(validationError)
    }

    if (isLoading.primary || isLoading.secondary || hasNonEmptyValue) {
      return true
    }

    return hasNonEmptyValue
  }

  useEffect(() => {
    if (!isFocused) return
    fieldData.forEach((fieldItem) => {
      setApplicationInformation((prevValue) => ({
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
    if (!validation.isValid) {
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

    if (validation.isValid) {
      setApplicationInformation((prevValue) => ({
        ...prevValue,
        [fieldItem.fieldName]: selectedValue?.name || selectedValue,
      }))
    }
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    fieldData,
    applicationInformation,
    validationError,
    isLoading,
    checkCTAStatus,
    handleValueChange,
    handleSubmit,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationInformation
