import { Platform, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native'
import { Text } from '@libs/components'
import { TouchableOpacity } from 'react-native'
import { IconContainer } from './icon-container'

const TimeLine = ({ categoryData = [] }) => {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState(1)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) return

    if (Platform.OS === 'web') {
      const searchParams = new URLSearchParams(window.location.search)
      const paramValue = searchParams.get('steps')
      setActiveTab(Number(paramValue))
    }
  }, [isFocused])
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 700,
          borderColor: colors.white,
          borderLeftWidth: 1,
          top: 24,
          position: 'absolute',
          marginLeft: 7,
        }}
      />
      {categoryData.map((item, index) => (
        <Label
          title={item?.displayName}
          status={item?.status}
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
  title,
  status,
  index,
  currentSteps,
  activeTab,
  setActiveTab,
}) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const isActive = index + 1 === activeTab
  return (
    <View
      style={{
        flexDirection: 'column',
      }}
      key={index}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}
      >
        <IconContainer
          status={status}
          currentActiveIndex={currentSteps}
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
          onPress={() => {
            setActiveTab(index)
            navigation.setParams({ steps: index + 1 })
          }}
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
