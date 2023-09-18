import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { Text } from '@libs/components'
import { fieldData } from './data/metaData'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import {
  canNonEmptyObject,
  fieldValidation,
  mandatoryValidation,
} from '../../utils/fieldValidation'
import { useSave } from '../../hooks/useSave'
import { useDelete } from '../../hooks/useDelete'
import { useForm } from 'react-hook-form'

const UniversityInformation = () => {
  const [universityInformation, setUniversityInformation] = useState()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const [validationError, setValidationError] = useState()
  const [mandatoryValidationError, setMandatoryValidationError] = useState()
  const [updatedValueIndex, setUpdatedValueIndex] = useState([])
  const [fieldArray, setFieldArray] = useState()
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
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (!isFocused) return

    let newFieldData = []

    if (applicationDetails?.['universityOrCollegeInfo']?.length > 0) {
      applicationDetails['universityOrCollegeInfo'].forEach(
        (fieldItem, fieldIndex) => {
          Object.keys(fieldItem).forEach((key) => {
            setValue(`${key}[${fieldIndex}]`, item[key])
          })
          newFieldData.push(fieldData)
        },
      )
      setFieldArray(newFieldData)
    } else {
      setFieldArray([fieldData])
    }
  }, [isFocused, applicationDetails])

  const handlePrimary = async (data) => {
    // console.log({ data })
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    await mutation.mutateAsync({
      type: 'save',
      fieldData: data,
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
      fieldData: data,
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  const handleAddEducation = () => {
    let universityData = []
    const updatedFieldArray = [...fieldArray, fieldData]
    const mappedData = {}
    updatedFieldArray?.map((filedItem, fieldIndex) => {
      console.log({ filedItem })
      Object.keys(filedItem).forEach((key) => {
        console.log(
          {
            [key]:
              applicationDetails?.['universityOrCollegeInfo']?.[fieldIndex]?.[
                key
              ],
          },
          fieldIndex,
        )
        setValue(
          `${key}[${fieldIndex}]`,
          applicationDetails?.['universityOrCollegeInfo']?.[fieldIndex]?.[
            key
          ] || '',
        )
      })
    })

    fieldData.forEach((fieldItem) => {
      mappedData[fieldItem.fieldName] = ''
    })
    universityData = [mappedData]
    setFieldArray(updatedFieldArray)
  }

  const checkCTAStatus = () => {
    let hasNonEmptyMandatoryValidationErrorValue = false
    let hasNonEmptyValidationErrorValue = false
    let validationErrorCopy
    if (mandatoryValidationError) {
      validationErrorCopy = mandatoryValidationError

      hasNonEmptyMandatoryValidationErrorValue =
        canNonEmptyObject(validationErrorCopy)
    }
    if (validationError) {
      validationErrorCopy = validationError

      hasNonEmptyValidationErrorValue = canNonEmptyObject(validationErrorCopy)
    }

    if (
      isLoading.primary ||
      isLoading.secondary ||
      hasNonEmptyMandatoryValidationErrorValue ||
      hasNonEmptyValidationErrorValue
    ) {
      return true
    }

    return false
  }

  const handleSubmit = async ({ type, buttonVariant, fieldIndex }) => {
    const updateUniversityInformationData = updatedValueIndex.map(
      (fieldIndexValue) => universityInformation[fieldIndexValue],
    )

    const mandatoryFields = mandatoryValidation(
      fieldData,
      updateUniversityInformationData?.length > 0
        ? updateUniversityInformationData
        : universityInformation,
      true,
    )
    if (mandatoryFields?.length > 0) {
      mandatoryFields.forEach((mandatoryFieldItem) => {
        let newValue = {}
        let keyName = ''
        Object.entries(mandatoryFieldItem).map(([key, values]) => {
          keyName = key
          values?.map((value) => {
            newValue = {
              ...newValue,
              [value]: 'Please fill the Field',
            }
          })
        })
        setMandatoryValidationError((prevValidationError) => ({
          ...prevValidationError,
          [keyName]: newValue,
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
        fieldData: { universityOrCollegeInfo: updateUniversityInformationData },
      })

      setIsLoading((prevValue) => ({
        ...prevValue,
        [buttonVariant]: false,
      }))
    }
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
    fieldArrayCopy.splice(indexOfItemToRemove, 1)
    setFieldArray(fieldArrayCopy)
  }

  const handleValueChange = ({ fieldItem, selectedValue, fieldIndex }) => {
    const validation = fieldValidation({
      type: fieldItem.inputType,
      validationValue: selectedValue,
      fieldItem: universityInformation[fieldIndex],
    })
    let validationErrorCopy = validationError
    let mandatoryValidationErrorCopy = mandatoryValidationError

    mandatoryValidationErrorCopy = {
      [fieldIndex]: {
        ...mandatoryValidationErrorCopy?.[fieldIndex],
        [fieldItem.fieldName]: '',
      },
    }
    if (!validation.isValid) {
      validationErrorCopy[fieldIndex] = {
        ...validationErrorCopy?.[fieldIndex],
        [fieldItem.fieldName]: validation.error,
      }
      setValidationError(validationErrorCopy)
    } else {
      validationErrorCopy = {
        [fieldIndex]: {
          ...validationErrorCopy?.[fieldIndex],
          [fieldItem.fieldName]: '',
        },
      }
      setValidationError((prevValidationError) => ({
        ...prevValidationError,
        ...validationErrorCopy,
      }))
    }
    const universityInformationCopy = universityInformation

    universityInformationCopy[fieldIndex] = {
      ...universityInformationCopy[fieldIndex],
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }
    const updatedValueIndexCopy = updatedValueIndex
    updatedValueIndexCopy.push(fieldIndex)
    const newUpdatedValueIndexCopy = [...new Set([...updatedValueIndexCopy])]
    setUpdatedValueIndex(newUpdatedValueIndexCopy)
    setUniversityInformation(universityInformationCopy)
    setMandatoryValidationError(mandatoryValidationErrorCopy)
  }

  const getValidationError = (fieldIndex) => {
    if (mandatoryValidationError) {
      const keys = Object.keys(mandatoryValidationError)
      const validationData = keys
        .map((key) => {
          if (key === fieldIndex.toString()) {
            return mandatoryValidationError[key]
          }
        })
        ?.filter((validationValue) => !!validationValue)
      return validationData[0]
    }
    if (validationError) {
      const keys = Object.keys(validationError)
      const validationData = keys
        .map((key) => {
          if (key === fieldIndex.toString()) {
            return validationError[key]
          }
        })
        ?.filter((validationValue) => !!validationValue)
      return validationData[0]
    }
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    control,
    errors,
    fieldArray,
    isLoading,
    universityInformation,
    validationError,
    handlePrimary,
    handleSecondary,
    checkCTAStatus,
    getValidationError,
    handleAddEducation,
    handleFormSubmit,
    handleRemove,
    handleSubmit,
    handleValueChange,
  }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default UniversityInformation
