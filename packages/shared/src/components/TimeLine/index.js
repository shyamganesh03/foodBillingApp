import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Text } from '@libs/components'
import { TouchableOpacity } from 'react-native'
import { getLabelMargin } from './helpers'
import { IconContainer } from './icon-container'

const TimeLine = ({ categoryData = [], setActiveTab, activeTab }) => {
  return (
    <View style={{ paddingVertical: 30 }}>
      {categoryData.map((item, index) => (
        <Label
          title={item?.title}
          status={item?.status}
          currentActiveIndex={activeTab}
          setActiveTab={setActiveTab}
          index={index}
          isLastIndex={categoryData?.length === index + 1}
        />
      ))}
    </View>
  )
}

const Label = ({
  title,
  status,
  currentActiveIndex,
  index,
  isLastIndex,
  setActiveTab,
}) => {
  const { colors } = useTheme()
  const isActive = currentActiveIndex === index
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
      }}
      key={index}
      onPress={() => setActiveTab(index)}
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
        <IconContainer
          status={status}
          currentActiveIndex={currentActiveIndex}
          index={index}
          colors={colors}
        />
        <Text
          variant={'body2'}
          color={colors.white}
          style={{ opacity: isActive ? 1.0 : 0.5, marginLeft: 10 }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default TimeLine
