import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from './data/metaData'
import { useFormContext } from 'react-hook-form'
import { getRequiredPayload } from '../../utils/fieldFunction'

const BackgroundInformation = ({ applicationDetails }) => {
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
    watch,
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
      type: 'save',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Background_Information_and_Technical_Standards',
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
      type: 'saveAndNext',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Background_Information_and_Technical_Standards',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  useEffect(() => {
    if (!isFocused) return
    fieldData.forEach((fieldItem) => {
      const fieldName = fieldItem?.fieldName
      const fieldValue = watch(fieldName)
      setValue(fieldName, fieldValue || applicationDetails?.[fieldName] || '')
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

export default BackgroundInformation
