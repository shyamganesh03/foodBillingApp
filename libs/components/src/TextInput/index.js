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
    error,
    key,
  } = props

  const handleInputOnFocus = async () => {
    onFocus()
  }
  const handleInputOutFocus = async () => {
    onBlur()
  }

  return (
    <View style={[{ marginBottom: 10 }, style]} key={key}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text variant="display4">{label}</Text>
        {isMandatory ? (
          <Text variant="display5" color={colors.onAlert}>
            {' '}
            *
          </Text>
        ) : null}
      </View>
      <Row
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.background,
            width: textInputWidth || 325,
            borderColor: error ? colors.onAlert : '#E0E0E0',
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
        />
        {trailingIcon && (
          <View style={{ justifyContent: 'center' }}>{trailingIcon}</View>
        )}
      </Row>
      {error ? (
        <Text variant="body2" color={colors.onAlert}>
          {error}
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
