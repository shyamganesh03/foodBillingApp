import { View } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Text } from '@libs/components'
import { TouchableOpacity } from 'react-native'
import { getLabelMargin } from './helpers'
import { IconContainer } from './icon-container'

const TimeLine = ({ categoryData = [], activeTab }) => {
  return (
    <View style={{ paddingVertical: 30 }}>
      {categoryData.map((item, index) => (
        <Label
          title={item?.displayName}
          status={item?.status}
          currentActiveIndex={activeTab}
          index={index}
          isLastIndex={categoryData?.length === index + 1}
        />
      ))}
    </View>
  )
}

const Label = ({ title, status, currentActiveIndex, index, isLastIndex }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const isActive = currentActiveIndex === navigation.route?.params?.steps || 0
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
            height: status === 'completed' ? 50 : 52,
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
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            maxWidth: '80%',
          }}
          key={index}
          onPress={() => navigation.setParams({ steps: index })}
        >
          <Text
            variant={'body2'}
            color={colors.white}
            style={{ opacity: isActive ? 1.0 : 0.5, marginLeft: 10 }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TimeLine
