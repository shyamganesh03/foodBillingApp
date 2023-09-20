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
import { isValidateInstitutionDate } from '../../utils/dateFunction'
import { getPayload } from '../../utils/fieldFunction'

const UniversityInformation = () => {
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })

  const { mutate: mutation } = useSave()
  const { mutate: deleteMutation } = useDelete()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'universityInformation',
  })

  const updateFieldRules = (fieldItem, fieldIndex) => {
    if (fieldItem.fieldName === 'endTermApplyingFor') {
      fieldItem.rules = {
        ...fieldItem.rules,
        validate: (value) =>
          isValidateInstitutionDate({
            dateToValidate: value,
            dateName: 'End Date',
            inputType: fieldItem.inputType,
            fieldIndex,
            watch: watch,
          }),
      }
    } else if (fieldItem.fieldName === 'degreeEarnedDate') {
      fieldItem.rules = {
        ...fieldItem.rules,
        validate: (value) =>
          isValidateInstitutionDate({
            dateToValidate: value,
            dateName: 'Degree Earned',
            inputType: fieldItem.inputType,
            fieldIndex,
            watch: watch,
          }),
      }
    }
  }

  const processFieldData = (fieldData, fieldIndex) => {
    let wrappedFieldData = [fieldData]
    wrappedFieldData?.forEach((fieldItems) => {
      fieldItems?.forEach((fieldItem) => {
        updateFieldRules(fieldItem, fieldIndex)
      })
    })
    return wrappedFieldData
  }

  const handleFieldInsertion = (index, wrappedFieldData) => {
    if (fields?.length === 0) {
      insert(index, [wrappedFieldData])
    }
  }

  const updateFieldValues = (fieldIndex, fieldData, fieldItem) => {
    fieldData?.forEach((fieldValue) => {
      setValue(
        `universityInformation.${fieldIndex}.${fieldValue?.fieldName}`,
        fieldItem[fieldValue?.fieldName] || '',
      )
    })
  }

  useEffect(() => {
    if (!isFocused) return

    if (applicationDetails?.universityOrCollegeInfo?.length > 0) {
      remove(0)

      applicationDetails.universityOrCollegeInfo.forEach(
        (fieldItem, fieldIndex) => {
          let wrappedFieldData = processFieldData(fieldData, fieldIndex)
          let newFieldData = []
          newFieldData.push(fieldData)
          insert(fieldIndex, [wrappedFieldData])
          updateFieldValues(fieldIndex, fieldData, fieldItem)
        },
      )
    } else {
      let wrappedFieldData = processFieldData(fieldData, 0)
      handleFieldInsertion(0, wrappedFieldData)
    }
  }, [isFocused, applicationDetails])

  const handlePrimary = async (data) => {
    const payload = getPayload({
      data: data.universityInformation,
      applicationDetails,
      fieldName: 'universityOrCollegeInfo',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    await mutation.mutateAsync({
      type: 'save',
      fieldData: { universityOrCollegeInfo: payload },
      metaData: fieldData,
      sessionName: 'University/College_Information',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const handleSecondary = async (data) => {
    const payload = getPayload({
      data: data.universityInformation,
      applicationDetails,
      fieldName: 'universityOrCollegeInfo',
    })

    await mutation.mutateAsync({
      type: 'saveAndNext',
      fieldData: { universityOrCollegeInfo: payload },
      metaData: fieldData,
      sessionName: 'University/College_Information',
      listKey: 'universityOrCollegeInfo',
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
      applicationDetails?.['universityOrCollegeInfo']?.[indexOfItemToRemove]?.id
    if (recordId) {
      await deleteMutation.mutateAsync({
        id: recordId,
        type: 'universityOrCollegeInfo',
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

export default UniversityInformation
