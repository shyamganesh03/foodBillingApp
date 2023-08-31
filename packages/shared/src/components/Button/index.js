import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../Text'

const Button = (props) => {
  const { colors } = useTheme()
  const [onHover, setOnHover] = useState(false)

  const {
    appearance = 'filled',
    buttonStyle,
    buttonColor = colors.primary,
    disable,
    leftIcon,
    rightIcon,
    label,
    labelStyle,
    labelColors = colors.onNeutral,
    onPress = () => {},
    hoverColor,
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
      {leftIcon}
      <Text
        variant="display3"
        style={[
          styles.label,
          {
            color: labelColors,
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
      opacity: 0.5,
      activeOpacity: 1,
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
