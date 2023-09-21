import { Text } from '@libs/components'
import { ScreenLayout } from '@libs/utils'
import { useAtom } from 'jotai'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { applicationProgressDetails } from '../../utils/atom'
import { useIsFocused } from '@react-navigation/native'
import { useFormContext } from 'react-hook-form'
import DesktopView from './DesktopView'
import { fieldData } from './data/metaData'
import { useSave } from '../../hooks/useSave'
import { getCurrentDate } from '../../utils/dateFunction'
import { getRequiredPayload } from '../../utils/fieldFunction'

const ApplicationSubmission = () => {
  const [applicationProgressData] = useAtom(applicationProgressDetails)
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const isFocused = useIsFocused()
  const [requiredFields, setRequiredFields] = useState({})
  const { mutate: mutation } = useSave()
  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (!isFocused) return

    let newData = {}
    Object.entries(applicationProgressData.mandatoryFields).map(
      ([key, mandatoryFields]) => {
        let requiredField = []
        if (Array.isArray(mandatoryFields)) {
          mandatoryFields?.map((mandatoryFieldItem) => {
            if (!mandatoryFieldItem.isSaved) {
              requiredField.push(mandatoryFieldItem.label)
            }
          })
        } else {
          Object.entries(mandatoryFields.list).map(([listKey, listValue]) => {
            const unSavedValue = listValue.filter(
              (listItem) => !listItem.isSaved,
            )

            if (unSavedValue.length > 0) {
              unSavedValue.map((unSavedItem) => {
                requiredField.push({
                  id: `list-${listKey}`,
                  label: unSavedItem.label,
                })
              })
            }
          })
        }
        if (requiredField?.length > 0) {
          newData = { ...newData, [key]: requiredField }
        }
      },
    )
    fieldData.forEach((fieldItem) => {
      if (fieldItem?.inputType === 'signatureDate') {
        const currentDate = getCurrentDate({ type: 'string' })
        setValue(fieldItem?.fieldName, currentDate)
      } else {
        setValue(fieldItem?.fieldName, '')
      }
    })
    setRequiredFields(newData)
  }, [isFocused, applicationProgressData])

  const handlePrimary = async (data) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))

    let requiredPayload = getRequiredPayload(fieldData, data)

    let payload = { ...requiredPayload }

    await mutation.mutateAsync({
      type: 'submit',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Application_Submission',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )
  const viewProps = {
    control,
    errors,
    fieldData,
    isLoading,
    requiredFields,
    handleFormSubmit,
    handlePrimary,
  }
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationSubmission
