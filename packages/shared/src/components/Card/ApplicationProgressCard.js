import { View } from 'react-native'
import React from 'react'
import { Icon } from '@r3-oaf/native-icons'
import { useTheme } from '@react-navigation/native'
import { Text } from '@libs/components'

const ApplicationProgressCard = ({ categoryData = [], currentActiveIndex }) => {
  return (
    <View style={{ paddingVertical: 30 }}>
      {categoryData.map((item, index) => (
        <Label
          title={item?.title}
          status={item?.status}
          currentActiveIndex={currentActiveIndex}
          index={index}
          isLastIndex={categoryData?.length === index + 1}
        />
      ))}
    </View>
  )
}

const renderIcon = (status, currentActiveIndex, index, colors) => {
  if (currentActiveIndex === index) {
    return (
      <View
        style={{
          height: 15,
          width: 15,
          backgroundColor: colors.white,
          borderRadius: 7.5,
        }}
      />
    )
  }
  if (currentActiveIndex !== index && status !== 'completed') {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: colors.white,
          borderRadius: 5,
          // opacity: 0.5,
        }}
      />
    )
  }
  if (status === 'completed') {
    return <Icon name="Check" height={20} width={20} color={colors.white} />
  }
}

const getLabelMargin = (status, currentActiveIndex, index, colors) => {
  if (currentActiveIndex === index) {
    return 7
  }
  if (currentActiveIndex !== index && status !== 'completed') {
    return 4
  }
  if (status === 'completed') {
    return 7
  }
}

const Label = ({ title, status, currentActiveIndex, index, isLastIndex }) => {
  const { colors } = useTheme()
  const isActive = currentActiveIndex === index
  return (
    <View
      style={{
        flexDirection: 'column',
      }}
      key={index}
    >
      {!isLastIndex ? (
        <View
          style={{
            width: '100%',
            height: status === 'completed' ? 68 : 70,
            marginLeft: getLabelMargin(status, currentActiveIndex, index),
            borderColor: colors.white,
            borderLeftWidth: 1,
            top: status === 'completed' ? 25 : 22,
            position: 'absolute',
          }}
        />
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}
      >
        <View style={{ width: 25 }}>
          {renderIcon(status, currentActiveIndex, index, colors)}
        </View>
        <Text
          variant={'body2'}
          color={colors.white}
          style={{ opacity: isActive ? 1.0 : 0.5, marginLeft: 10 }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

export default ApplicationProgressCard
