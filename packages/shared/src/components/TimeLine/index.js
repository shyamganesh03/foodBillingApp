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
import { useParams } from '@libs/utils'

const TimeLine = ({ categoryData = [] }) => {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState(1)
  const isFocused = useIsFocused()
  const { params } = useParams()
  const { steps } = params

  useEffect(() => {
    if (!isFocused) return

    setActiveTab(Number(steps) || 0)
  }, [isFocused, steps])
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 600,
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
          currentActiveIndex={activeTab}
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
      </View>
    </View>
  )
}

export default TimeLine
