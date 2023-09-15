import { View, Text, useWindowDimensions, Animated } from 'react-native'
import React, { useContext } from 'react'
import { spacing } from '@edvnz/theme'
import EdvnzTheme from '@edvnz/provider'
import { Icon } from '@edvnz/native-icons'
import { Layout } from '@edvnz/container'
import { useTheme } from 'react-native-paper'
import { ScreenLayout } from '@libs/utils'
import useFadeInAnimation from '../../../animations/useFadeAnimation'

const ErrorToast = ({ toast }) => {
  const windowWidth = useWindowDimensions().width
  const isDesktop = ScreenLayout?.isWeb(windowWidth)
  const fadeIn = useFadeInAnimation()
  const { colors } = useTheme()
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        opacity: fadeIn,
      }}
    >
      {isDesktop && <View style={{ maxWidth: 475, width: '100%' }} />}
      <View style={{ flex: 1 }}>
        <Layout>
          <View
            style={{
              padding: spacing.spacing5,
              backgroundColor: colors.backgroundSurface,
              flexDirection: 'row',
              borderRadius: 8,
              marginTop: 100,
            }}
          >
            <Icon name="Close" color={colors.primary} width={20} height={20} />
            <Text
              variant="body2"
              color={colors.backgroundSurface3}
              style={{ marginLeft: spacing.spacing4 }}
            >
              {toast.message}
            </Text>
          </View>
        </Layout>
      </View>
    </Animated.View>
  )
}

export default ErrorToast
