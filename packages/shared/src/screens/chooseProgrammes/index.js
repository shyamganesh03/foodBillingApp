import { Text } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useSave } from '../../hooks/useSave'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { fieldData } from './data/metaData'

const ChooseProgrammes = (props) => {
  const [programmes, setProgrammes] = useState({})
  const [isLoading, setIsLoading] = useState({
    primary: false,
    secondary: false,
  })

  const { mutate: mutation } = useSave()
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const handleSubmit = async ({ type, buttonVariant }) => {
    setIsLoading((prevValue) => ({
      ...prevValue,
      [buttonVariant]: true,
    }))
    await mutation.mutateAsync({
      type,
      fieldData: programmes,
    })
    setIsLoading((prevValue) => ({
      ...prevValue,
      [buttonVariant]: false,
    }))
  }

  useEffect(() => {
    if (!isFocused) return
    fieldData.forEach((fieldItem) => {
      setProgrammes((prevValue) => ({
        ...prevValue,
        [fieldItem.fieldName]: applicationDetails?.[fieldItem?.fieldName] || '',
      }))
    })
  }, [isFocused, applicationDetails])

  const handleValueChange = ({ fieldItem, selectedValue }) => {
    setProgrammes((prevValue) => ({
      ...prevValue,
      [fieldItem.fieldName]: selectedValue?.name || selectedValue,
    }))
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    fieldData,
    programmes,
    isLoading,
    handleValueChange,
    handleSubmit,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ChooseProgrammes
