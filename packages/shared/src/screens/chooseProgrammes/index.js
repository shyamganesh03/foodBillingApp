import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { fieldData } from './data/metaData'

const ChooseProgrammes = (props) => {
  const [programmes, setProgrammes] = useState({})
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
    let hasNonEmptyValue = false // Initialize to false initially

    if (validationError) {
      hasNonEmptyValue = canNonEmptyObject(validationError)
    }

    if (isLoading.primary || isLoading.secondary || hasNonEmptyValue) {
      return true
    }

    return hasNonEmptyValue
  }

  const handleSubmit = async ({ type, buttonVariant }) => {
    const mandatoryFields = mandatoryValidation(fieldData, programmes)
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
        fieldData: programmes,
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
      setProgrammes((prevValue) => ({
        ...prevValue,
        [fieldItem.fieldName]: applicationDetails?.[fieldItem?.fieldName] || '',
      }))
    })
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setProgrammes((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    fieldData,
    programmes,
    isLoading,
    validationError,
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

export default ChooseProgrammes
