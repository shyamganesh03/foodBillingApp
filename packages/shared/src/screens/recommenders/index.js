import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { Text } from '@libs/components'
import { fieldData } from './data/metaData'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { useSave } from '../../hooks/useSave'
import { useDelete } from '../../hooks/useDelete'
import { useForm, useFieldArray } from 'react-hook-form'
import { getPayload } from '../../utils/fieldFunction'

const Recommenders = () => {
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const [waiveCheck, setWaiveCheck] = useState()
  const { mutate: mutation } = useSave()
  const { mutate: deleteMutation } = useDelete()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'recommenders',
  })

  const handleFieldInsertion = (index, wrappedFieldData) => {
    if (fields?.length === 0) {
      insert(index, [wrappedFieldData])
    }
  }

  const updateFieldValues = (fieldIndex, fieldData, fieldItem) => {
    fieldData?.forEach((fieldValue) => {
      setValue(
        `recommenders.${fieldIndex}.${fieldValue?.fieldName}`,
        fieldItem[fieldValue?.fieldName] || '',
      )
    })
  }

  useEffect(() => {
    if (!isFocused) return
    const waiveCheck =
      applicationDetails?.['WaiveAccessToRecommendation'] || false
    setWaiveCheck(waiveCheck)
    if (applicationDetails?.recommenders?.length > 0) {
      remove(0)
      applicationDetails.recommenders.forEach((fieldItem, fieldIndex) => {
        let wrappedFieldData = [fieldData]
        let newFieldData = []
        newFieldData.push(fieldData)
        insert(fieldIndex, [wrappedFieldData])
        updateFieldValues(fieldIndex, fieldData, fieldItem)
      })
    } else {
      let wrappedFieldData = [fieldData]
      handleFieldInsertion(0, wrappedFieldData)
    }
  }, [isFocused, applicationDetails])

  const handlePrimary = async (data) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    let payload = getPayload({
      data: data.recommenders,
      applicationDetails,
      fieldName: 'recommenders',
    })
    let newPayload = { WaiveAccessToRecommendation: waiveCheck }

    if (payload?.length > 0) {
      newPayload = { ...newPayload, recommenders: payload }
      await mutation.mutateAsync({
        type: 'save',
        fieldData: newPayload,
      })
    } else {
      toast.show('Please fill all the fields', {
        type: 'danger',
      })
    }

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const handleSecondary = async (data) => {
    let payload = getPayload({
      data: data.recommenders,
      applicationDetails,
      fieldName: 'recommenders',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: true,
    }))

    let newPayload = { WaiveAccessToRecommendation: waiveCheck }

    if (payload?.length > 0) {
      newPayload = { ...newPayload, recommenders: payload }
      await mutation.mutateAsync({
        type: 'saveAndNext',
        fieldData: newPayload,
      })
    } else {
      toast.show('Please fill all the fields', {
        type: 'danger',
      })
    }
    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  const handleWaveCheck = (checkBoxStatus) => {
    setWaiveCheck(checkBoxStatus)
  }

  const handleAddEducation = () => {
    const wrappedFieldData = [fieldData]
    append([wrappedFieldData])
  }

  const handleRemove = async (indexOfItemToRemove) => {
    const recordId =
      applicationDetails?.['recommenders']?.[indexOfItemToRemove]?.id
    if (recordId) {
      await deleteMutation.mutateAsync({
        id: recordId,
        type: 'recommenders',
      })
    }
    remove(indexOfItemToRemove)
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    fields,
    control,
    errors,
    isLoading,
    waiveCheck,
    handlePrimary,
    handleSecondary,
    handleAddEducation,
    handleFormSubmit,
    handleWaveCheck,
    handleRemove,
  }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Recommenders
