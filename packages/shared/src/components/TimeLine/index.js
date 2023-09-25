import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from '@libs/utils'
import { applicationProgressDetails } from '../../utils/atom'
import { useAtom } from 'jotai'
import { getStatus } from './helpers'
import { TimeLineContent } from './TimeLineContent'
import { useIsFocused } from '@react-navigation/native'

const TimeLine = ({ categoryData = [] }) => {
  const [activeTab, setActiveTab] = useState(1)
  const { params, setParams } = useParams()
  const isFocused = useIsFocused()
  const { steps } = params
  const [applicationProgressDetail] = useAtom(applicationProgressDetails)
  const {
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      setActiveTab(Number(steps) || 1)
    })()
  }, [isFocused, steps])

  return (
    <View>
      {categoryData?.map((item, index) => (
        <TimeLineContent
          title={item?.displayName}
          status={getStatus({
            data: item,
            type: 'status',
            itemIndex: index,
            applicationProgressDetail: applicationProgressDetail,
            categoryData: categoryData,
            errors: errors,
          })}
          errors={getStatus({
            data: item,
            type: 'error',
            itemIndex: index,
            applicationProgressDetail: applicationProgressDetail,
            categoryData: categoryData,
            errors: errors,
          })}
          index={index}
          isLastIndex={categoryData?.length === index + 1}
          activeTab={activeTab}
          setActiveTab={setParams}
        />
      ))}
    </View>
  )
}

export default TimeLine
