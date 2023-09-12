import { TextInput as Input, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Row from '../Row'
import { StyleSheet } from 'react-native'
import Text from '../Text'

const TextInput = (props) => {
  const { colors } = useTheme()
  const {
    isEditMode,
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
    error,
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
        {isMandatory && isEditMode ? (
          <Text variant="display5" color={colors.onAlert}>
            *{' '}
          </Text>
        ) : null}
        <Text variant="display4">{label}</Text>
      </View>
      <Row
        style={[
          isEditMode ? styles.inputRow : styles.disableStyle,
          {
            backgroundColor: editable ? 'transparent' : colors.background,
            width: textInputWidth || 325,
            borderColor: error?.hasError ? colors.onAlert : '#E0E0E0',
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
          value={value || ''}
          editable={isEditMode}
        />
        {trailingIcon && (
          <View style={{ justifyContent: 'center' }}>{trailingIcon}</View>
        )}
      </Row>
      {error?.hasError ? (
        <Text variant="body2" color={colors.onAlert}>
          {error?.message}
        </Text>
      ) : null}
    </View>
  )
}

export const styles = StyleSheet.create({
  inputRow: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    height: 32,
  },
  disableStyle: {},

  inputField: {
    flex: 1,
    // outlineStyle: 'none',
  },
})

export default TextInput
