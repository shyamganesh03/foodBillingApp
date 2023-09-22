import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { Text } from '@libs/components'
import { fieldData } from './data/metaData'
import { useIsFocused } from '@react-navigation/native'
import { useSave } from '../../hooks/useSave'
import { useDelete } from '../../hooks/useDelete'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { getPayload } from '../../utils/fieldFunction'

const ResearchExperience = ({ applicationDetails }) => {
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })

  const { mutate: mutation } = useSave()
  const { mutate: deleteMutation } = useDelete()

  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'researchExperience',
  })

  const handleFieldInsertion = (index, wrappedFieldData) => {
    if (fields?.length === 0) {
      insert(index, [wrappedFieldData])
    }
  }

  const updateFieldValues = (fieldIndex, fieldData, fieldItem) => {
    fieldData?.forEach((fieldItemValue) => {
      const fieldName = `researchExperience.${fieldIndex}.${fieldItemValue?.fieldName}`
      const fieldValue = watch(fieldName)
      setValue(
        fieldName,
        fieldValue || fieldItem[fieldItemValue?.fieldName] || '',
      )
    })
  }

  useEffect(() => {
    if (!isFocused) return

    if (applicationDetails?.researchExperience?.length > 0) {
      reset()
      remove(0)

      applicationDetails.researchExperience.forEach((fieldItem, fieldIndex) => {
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
    const payload = getPayload({
      data: data.researchExperience,
      applicationDetails,
      fieldName: 'researchExperience',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    if (payload?.length > 0) {
      await mutation.mutateAsync({
        type: 'save',
        fieldData: { researchExperience: payload },
        metaData: fieldData,
        sessionName: 'Research_Experience',
        listKey: 'researchExperience',
        isList: true,
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
    const payload = getPayload({
      data: data.researchExperience,
      applicationDetails,
      fieldName: 'researchExperience',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: true,
    }))

    if (payload?.length > 0) {
      await mutation.mutateAsync({
        type: 'saveAndNext',
        fieldData: { researchExperience: payload },
        metaData: fieldData,
        sessionName: 'Research_Experience',
        listKey: 'researchExperience',
        isList: true,
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

  const handleAddEducation = () => {
    const wrappedFieldData = [fieldData]
    append([wrappedFieldData])
  }

  const handleRemove = async (indexOfItemToRemove) => {
    const recordId =
      applicationDetails?.['researchExperience']?.[indexOfItemToRemove]?.id
    if (recordId) {
      await deleteMutation.mutateAsync({
        id: recordId,
        type: 'researchExperience',
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
    handlePrimary,
    handleSecondary,
    handleAddEducation,
    handleFormSubmit,
    handleRemove,
  }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ResearchExperience
