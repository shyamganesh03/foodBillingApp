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

const MCATReporting = ({ applicationDetails }) => {
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
    name: 'aamcmcatReporting',
  })

  useEffect(() => {
    if (!isFocused) return

    if (applicationDetails?.AAMCMCATReporting?.length > 0) {
      reset()
      remove(0)

      applicationDetails.AAMCMCATReporting.forEach((fieldItem, fieldIndex) => {
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

  const handleFieldInsertion = (index, wrappedFieldData) => {
    if (fields?.length === 0) {
      insert(index, [wrappedFieldData])
    }
  }

  const updateFieldValues = (fieldIndex, fieldData, fieldItem) => {
    fieldData?.forEach((fieldItemValue) => {
      const fieldName = `aamcmcatReporting.${fieldIndex}.${fieldItemValue?.fieldName}`
      const fieldValue = watch(fieldName)

      setValue(
        fieldName,
        fieldValue || fieldItem[fieldItemValue?.fieldName] || '',
      )
    })
  }

  const handlePrimary = async (data) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    await mutation.mutateAsync({
      type: 'save',
      fieldData: {},
      metaData: fieldData,
      sessionName: 'AAMC-MCAT_Reporting',
      listKey: 'AAMCMCATReporting',
      payloadData: data.aamcmcatReporting,
      isList: true,
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

    await mutation.mutateAsync({
      type: 'saveAndNext',
      fieldData: {},
      metaData: fieldData,
      sessionName: 'AAMC-MCAT_Reporting',
      listKey: 'AAMCMCATReporting',
      payloadData: data.aamcmcatReporting,
      isList: true,
    })

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
      applicationDetails?.['AAMCMCATReporting']?.[indexOfItemToRemove]?.id
    if (recordId) {
      await deleteMutation.mutateAsync({
        id: recordId,
        type: 'AAMCMCATReporting',
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

export default MCATReporting
