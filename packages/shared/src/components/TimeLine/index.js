import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native'
import { Text } from '@libs/components'
import { TouchableOpacity } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { IconContainer } from './icon-container'
import { useParams } from '@libs/utils'
import { applicationProgressDetails } from '../../utils/atom'
import { useAtom } from 'jotai'
import { Icon } from '@r3-oaf/native-icons'
import { useQueryClient } from '@tanstack/react-query'

const TimeLine = ({ categoryData = [] }) => {
  const [activeTab, setActiveTab] = useState(1)
  const isFocused = useIsFocused()
  const { params } = useParams()
  const { steps } = params
  const [applicationProgressDetail] = useAtom(applicationProgressDetails)
  const queryClient = useQueryClient()
  const applicationDetails = queryClient.getQueryData(['getApplicationData'])
  const {
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      try {
        setActiveTab(Number(steps) || 0)
        if (!applicationDetails) {
          await queryClient.refetchQueries({
            queryKey: ['getApplicationData'],
          })
        }
      } catch (err) {}
    })()
  }, [isFocused, steps, applicationDetails])

  const getStatus = (data, type, itemIndex) => {
    let savedStatus = []
    let hasError = false

    if (data.screenType === 'list') {
      applicationDetails?.[data?.fieldName]?.length > 0
        ? savedStatus.push(true)
        : savedStatus.push(false)
    } else {
      Object.entries(
        applicationProgressDetail?.mandatoryFields?.[data?.sessionName] || {},
      )?.map(([key, fieldValues]) => {
        if (errors[fieldValues?.fieldName]?.message) {
          hasError = true
        }
        savedStatus.push(fieldValues?.isSaved)
      })
    }
    if (type === 'error') {
      return hasError
    }
    if (
      !savedStatus.includes(false) &&
      itemIndex !== categoryData?.length - 1
    ) {
      return 'completed'
    } else {
      return 'not-completed'
    }
  }
  return (
    <View>
      {categoryData.map((item, index) => (
        <Label
          title={item?.displayName}
          status={getStatus(item, '', index)}
          errors={getStatus(item, 'error')}
          index={index}
          isLastIndex={categoryData?.length === index + 1}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </View>
  )
}

const Label = ({
  activeTab,
  errors,
  index,
  isLastIndex,
  setActiveTab,
  status,
  title,
}) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const isActive = index + 1 === activeTab

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          position: 'relative',
          paddingTop: 10,
        }}
      >
        <IconContainer
          status={status}
          currentActiveIndex={activeTab}
          index={index}
          colors={colors}
        />
        {!isLastIndex ? (
          <View
            style={{
              width: '100%',
              height: status === 'completed' ? '50%' : '75%',
              borderColor: colors.white,
              borderLeftWidth: 1,
              position: 'absolute',
              top: status === 'completed' ? 29 : 20,
              marginLeft: 7,
            }}
          />
        ) : null}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          paddingVertical: 10,
          flexWrap: 'wrap',
          maxWidth: '80%',
        }}
        key={index}
        onPress={() => {
          setActiveTab(index + 1)
          navigation.setParams({ steps: index + 1 })
        }}
      >
        <Text
          variant={'body1'}
          color={colors.white}
          style={{ opacity: isActive ? 1.0 : 0.5, marginLeft: 10 }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {errors ? (
        <View style={{ paddingTop: 15, marginLeft: 10 }}>
          <Icon name="AlertIcon" height={10} width={10} />
        </View>
      ) : null}
    </View>
  )
}

export default TimeLine
