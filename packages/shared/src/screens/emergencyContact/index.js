import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from './data/metaData'
import { useFormContext } from 'react-hook-form'

const EmergencyContact = ({ applicationDetails }) => {
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const { mutate: mutation } = useSave()
  const isFocused = useIsFocused()

  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const handlePrimary = async (data) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    let payload = { ...data }
    payload = {
      ...payload,
      emergencyContactFullName: `${
        data['emergencyContactFirstName'] + data['emergencyContactLastName']
      }`,
    }

    await mutation.mutateAsync({
      type: 'save',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Emergency_Information',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const handleSecondary = async (data) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: true,
    }))

    let payload = { ...data }
    payload = {
      ...payload,
      emergencyContactFullName: `${
        data['emergencyContactFirstName'] + data['emergencyContactLastName']
      }`,
    }

    await mutation.mutateAsync({
      type: 'saveAndNext',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Emergency_Information',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  useEffect(() => {
    if (!isFocused) return
    fieldData.forEach((fieldItem) => {
      setValue(
        fieldItem?.fieldName,
        applicationDetails?.[fieldItem?.fieldName] || '',
      )
    })
  }, [isFocused, applicationDetails])

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    control,
    errors,
    handleFormSubmit,
    handlePrimary,
    handleSecondary,
    isLoading,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default EmergencyContact
