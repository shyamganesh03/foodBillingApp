import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Text } from '@libs/components'
import { TouchableOpacity } from 'react-native'
import { getLabelMargin } from './helpers'
import { IconContainer } from './icon-container'

const TimeLine = ({ categoryData = [] }) => {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState(0)
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
  const isActive = index === activeTab
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
            navigation.setParams({ steps: index })
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
