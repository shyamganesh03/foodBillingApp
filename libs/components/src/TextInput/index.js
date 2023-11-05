import { TextInput as Input, View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Row from '../Row'
import Text from '../Text'
import { typography } from '@libs/theme'

function TextInput(props) {
  const { colors } = useTheme()
  const {
    trailingIcon,
    inputFieldStyle = {},
    isMandatory = false,
    hasFullWidth = false,
    inputRef,
    onBlur = () => {},
    onChangeText = () => {},
    onFocus = () => {},
    placeholder = '',
    required = false,
    secureTextEntry = false,
    textInputWidth = 280,
    label = '',
    value,
    style,
    error,
    key,
    onError,
    errorMessage,
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
        <Text variant="body1">{label}</Text>
        {/* {isMandatory ? (
          <Text variant="body1" color={colors.onAlert}>
            {' '}
            *
          </Text>
        ) : null} */}
      </View>
      <Row
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.background,
            width: textInputWidth,
            borderColor: !!errorMessage ? colors.onAlert : '#E0E0E0',
          },
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
        />
        {trailingIcon ? (
          <View style={{ justifyContent: 'center' }}>{trailingIcon}</View>
        ) : null}
      </Row>

      {!!onError ? (
        <Text
          variant="body1"
          color={colors.onAlert}
          style={{ marginTop: 4, fontSize: 12 }}
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  )
}

export const styles = StyleSheet.create({
  inputRow: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  disableStyle: {},

  inputField: {
    flex: 1,
    // outlineStyle: 'none',
  },
})

export default TextInput
