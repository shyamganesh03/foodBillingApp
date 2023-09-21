import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from './data/metaData'
import { useFormContext } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { getRequiredPayload } from '../../utils/fieldFunction'

const CommonApplication = ({ applicationDetails }) => {
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

    let requiredPayload = getRequiredPayload(fieldData, data)

    let payload = { ...requiredPayload }

    await mutation.mutateAsync({
      type: 'create',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Common_Application',
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

    let requiredPayload = getRequiredPayload(fieldData, data)

    let payload = { ...requiredPayload }

    await mutation.mutateAsync({
      type: 'createAndNext',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Common_Application',
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

export default CommonApplication
