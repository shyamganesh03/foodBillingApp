import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { Text } from '@libs/components'
import { fieldData } from './data/metaData'
import { useIsFocused } from '@react-navigation/native'
import { useSave } from '../../hooks/useSave'
import { useDelete } from '../../hooks/useDelete'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { isValidateInstitutionDate } from '../../utils/dateFunction'
import { applicationProgressDetails } from '../../utils/atom'
import { useAtom } from 'jotai'

const UniversityInformation = ({ applicationDetails, refetch }) => {
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )
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
    fieldData?.forEach((fieldItemValue) => {
      const fieldName = `universityInformation.${fieldIndex}.${fieldItemValue?.fieldName}`
      const fieldValue = watch(fieldName)

      setValue(
        fieldName,
        fieldValue || fieldItem[fieldItemValue?.fieldName] || '',
      )
    })
  }

  useEffect(() => {
    if (!isFocused) return

    if (applicationDetails?.universityOrCollegeInfo?.length > 0) {
      reset()
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
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    await mutation.mutateAsync(
      {
        type: 'save',
        metaData: fieldData,
        sessionName: 'University/College_Information',
        listKey: 'universityOrCollegeInfo',
        payloadData: data.universityInformation,
        isList: true,
      },
      {
        onSuccess: () => {
          refetch()
        },
      },
    )

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

    await mutation.mutateAsync(
      {
        type: 'saveAndNext',
        fieldData: {},
        metaData: fieldData,
        sessionName: 'University/College_Information',
        payloadData: data.universityInformation,
        listKey: 'universityOrCollegeInfo',
        isList: true,
      },
      {
        onSuccess: () => {
          refetch()
        },
      },
    )

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  const handleAddEducation = () => {
    const wrappedFieldData = [fieldData]
    let mandatoryFieldsData = { ...applicationProgressDetail }
    let universityInformation =
      mandatoryFieldsData?.mandatoryFields?.['University/College_Information']
    let list = universityInformation?.list || {}

    const newIndex = Object.keys(list).length
    const newList = []
    fieldData.map((item, index) => {
      newList.push({
        label: item?.label,
        isSaved: false,
        fieldName: item?.fieldName,
      })
    })

    mandatoryFieldsData.mandatoryFields['University/College_Information'] =
      universityInformation

    setApplicationProgressDetail(mandatoryFieldsData)
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
