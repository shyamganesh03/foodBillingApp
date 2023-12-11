import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@food-billing/native-icons'
import { useTheme } from '@react-navigation/native'
import TextInput from '../TextInput'

const PasswordInput = (props) => {
  const { colors } = useTheme()
  const {
    hasValidate = false,
    inputFieldStyle,
    onBlur = () => { },
    onChangeText,
    onFocus = () => { },
    onPassAllValid = () => { },
    placeholder = 'Password',
    placeholderColor = '',
    validationTextColor = '',
    value = '',
    iconColor,
  } = props

  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <>
      <TextInput
        trailingIcon={
          <PasswordEyeIcon
            setSecureTextEntry={setSecureTextEntry}
            secureTextEntry={secureTextEntry}
            iconColor={iconColor}
          />
        }
        inputFieldStyle={inputFieldStyle}
        onBlur={() => {
          onBlur()
        }}
        onChangeText={onChangeText}
        onFocus={() => {
          onFocus()
        }}
        password
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || colors.placeHolder}
        secureTextEntry={secureTextEntry}
        // value={value}
        {...props}
      />
    </>
  )
}

const PasswordEyeIcon = ({
  secureTextEntry,
  setSecureTextEntry,
  iconColor,
}) => {
  const { colors } = useTheme()
  const icon = secureTextEntry ? 'Eye' : 'EyeOff'
  return (
    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon
        name={icon}
        color={iconColor || colors.primaryIconColor}
        width={20}
        height={20}
      />
    </TouchableOpacity>
  )
}

export default PasswordInput
