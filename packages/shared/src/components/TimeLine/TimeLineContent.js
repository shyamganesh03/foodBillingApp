import { useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { IconContainer } from './icon-container'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '@libs/components'
import { Icon } from '@r3-oaf/native-icons'

export const TimeLineContent = ({
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
      key={index}
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
        onPress={() => {
          setActiveTab((prev) => ({ ...prev, steps: index + 1 }))
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
