import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../Text'
import { View } from 'react-native'

const Button = (props) => {
  const { colors } = useTheme()
  const [onHover, setOnHover] = useState(false)

  const {
    appearance = 'filled',
    buttonColor = colors.buttonVariant1,
    buttonStyle,
    disable,
    hoverColor,
    isLoading,
    label,
    labelColors = colors.onNeutral,
    labelStyle,
    leftIcon,
    onPress = () => {},
    rightIcon,
  } = props

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={StyleSheet.flatten([
        styles.buttonContainer,
        {
          backgroundColor: buttonColor,
        },
        getButtonStyle(appearance, buttonColor, disable),
        buttonStyle,
      ])}
      disabled={disable}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {isLoading ? (
        <View style={{ marginRight: 5 }}>
          <ActivityIndicator color={colors.white} size={10} />
        </View>
      ) : null}
      <Text
        variant="subHeading2"
        style={[
          styles.label,
          {
            color: disable ? colors.onNeutral : labelColors,
            marginLeft: !!leftIcon ? 10 : 0,
            marginRight: !!rightIcon ? 10 : 0,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
      {rightIcon}
    </TouchableOpacity>
  )
}

const getButtonStyle = (appearance, buttonVariant, disable) => {
  const buttonStyle = []

  if (appearance === 'outline') {
    buttonStyle.push({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: buttonVariant,
    })
  }

  if (disable) {
    buttonStyle.push({
      backgroundColor: '#c9c7c5',
    })
  }

  return buttonStyle
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    height: 32,
    padding: 16,
  },

  label: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
  },
})

export default Button
