import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fieldData } from './data/metaData'
import { useForm } from 'react-hook-form'
import { getDropdownValue } from '../../api'

const ContactInformation = (props) => {
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })
  const { mutate: mutation } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const { data: dropdown } = useQuery({
    queryKey: ['getMailingCountryCode'],
    queryFn: async () => {
      const dropdownResponse = await getDropdownValue({
        apiName: 'mailingCountryCode',
      })
      return dropdownResponse
    },
  })

  const {
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const handlePrimary = async (data) => {
    let payload = data
    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: true,
    }))
    const mailingCountryCode = watch('mailingCountryCode')
    if (mailingCountryCode) {
      const selectedData = dropdown?.filter(
        (item) => item?.Label === mailingCountryCode,
      )
      payload['mailingCountryCode'] = selectedData?.[0]?.Value
      payload['mailingCountry'] = selectedData?.[0]?.Label
    }

    await mutation.mutateAsync({
      type: 'create',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Contact_Information',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      primary: false,
    }))
  }

  const handleSecondary = async (data) => {
    let payload = data
    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: true,
    }))

    const mailingCountryCode = watch('mailingCountryCode')
    if (mailingCountryCode) {
      const selectedData = dropdown?.filter(
        (item) => item?.Label === mailingCountryCode,
      )
      payload['mailingCountryCode'] = selectedData?.[0]?.Value
      payload['mailingCountry'] = selectedData?.[0]?.Label
    }

    await mutation.mutateAsync({
      type: 'createAndNext',
      fieldData: payload,
      metaData: fieldData,
      sessionName: 'Contact_Information',
    })

    setIsLoading((prevValue) => ({
      ...prevValue,
      secondary: false,
    }))
  }

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      fieldData.forEach((fieldItem) => {
        if (fieldItem?.fieldName === 'mailingCountryCode') {
          const selectedData = dropdown?.filter(
            (item) =>
              item?.Value === applicationDetails?.[fieldItem?.fieldName],
          )
          setValue(fieldItem?.fieldName, selectedData?.[0]?.Label || '')
        } else {
          setValue(
            fieldItem?.fieldName,
            applicationDetails?.[fieldItem?.fieldName] || '',
          )
        }
      })
    })()
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

export default ContactInformation
