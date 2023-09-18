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

  console.log({ errors })

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

  const getPayload = ({ data }) => {
    const updatedData = data
      ?.map((value, dataIndex) => {
        const matchingField = applicationDetails.universityOrCollegeInfo.find(
          (fieldValue) => {
            const keyNames = Object.keys(fieldValue)
            return keyNames.every((key) => value[key] !== fieldValue[key])
          },
        )
        if (matchingField) {
          return value
        }
      })
      .filter((updatedValues) => updatedValues !== undefined)

    let newUpdatePayload = []
    updatedData?.map((data) => {
      const newData = data
      newData.shift()
      const newObjectData = { ...newData }
      newUpdatePayload.push(newObjectData)
    })
    return newUpdatePayload
  }

  const handlePrimary = async (data) => {
    const payload = getPayload({ data: data.universityInformation })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    await mutation.mutateAsync({
      type: 'save',
      fieldData: { universityOrCollegeInfo: payload },
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const handleSecondary = async (data) => {
    const payload = getPayload({ data: data.universityInformation })
    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: true,
    }))

    await mutation.mutateAsync({
      type: 'saveAndNext',
      fieldData: { universityOrCollegeInfo: payload },
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
      })
    }
    const fieldArrayCopy = [...fieldArray]
    remove(indexOfItemToRemove)
    fieldArrayCopy.splice(indexOfItemToRemove, 1)
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
