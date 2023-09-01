import { TextInput as Input, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Row from '../Row'
import { StyleSheet } from 'react-native'
import Text from '../Text'

const TextInput = (props) => {
  const { colors } = useTheme()
  const {
    trailingIcon,
    inputFieldStyle,
    isMandatory,
    hasFullWidth = false,
    inputRef,
    onBlur = () => {},
    onChangeText = () => {},
    onFocus = () => {},
    password,
    placeholder = '',
    required,
    secureTextEntry,
    textInputWidth,
    label = '',
    value,
    style,
    editable = true,
  } = props

  const handleInputOnFocus = async () => {
    onFocus()
  }
  const handleInputOutFocus = async () => {
    onBlur()
  }

  return (
    <View style={[{ marginBottom: 10 }, style]}>
      <View style={{ flexDirection: 'row' }}>
        {isMandatory ? (
          <Text variant="display5" color={colors.onAlert}>
            *{' '}
          </Text>
        ) : null}
        <Text variant="display4">{label}</Text>
      </View>
      <Row
        style={[
          styles.inputRow,
          {
            backgroundColor: editable ? 'transparent' : colors.background,
            width: textInputWidth || 325,
          },
          hasFullWidth
            ? {
                height: 32,
                width: '100%',
              }
            : {},
        ]}
      >
        <Input
          autoCorrect={false}
          onChangeText={(text) => onChangeText(text)}
          onFocus={handleInputOnFocus}
          onBlur={handleInputOutFocus}
          placeholder={placeholder}
          placeholderTextColor={colors.placeHolder}
          ref={inputRef}
          required={required}
          secureTextEntry={secureTextEntry}
          style={[styles.inputField, inputFieldStyle]}
          value={value}
          editable={editable}
        />
        {trailingIcon && (
          <View style={{ justifyContent: 'center', flex: 1 }}>
            {trailingIcon}
          </View>
        )}
      </Row>
    </View>
  )
}

export const styles = StyleSheet.create({
  inputRow: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    height: 32,
  },

  inputField: {
    flex: 1,
    // outlineStyle: 'none',
  },
})

export default TextInput
