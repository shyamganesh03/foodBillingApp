import { StyleSheet, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { countryCodes } from '@libs/utils'
import DropDown from '../DropDown'
import Text from '../Text'

const MobileInput = ({
  dialCode,
  error,
  isMandatory,
  label = '',
  textInputWidth = '',
  value,
  handleCountrySelection = () => {},
  onChangeText = () => {},
}) => {
  const { colors } = useTheme()
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropDownWidth] = useState(0)
  const dropDownRef = useRef()

  const toggleDropdown = () => {
    dropDownRef?.current?.measure((_fx, _fy, _w, _h, _px, py) => {
      setDropdownTop(py + 50)
      setDropdownLeft(_px)
      setDropDownWidth(_w)
    })
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text variant="body1">{label}</Text>
        {isMandatory ? (
          <Text variant="body1" color={colors.onAlert}>
            {' '}
            *
          </Text>
        ) : null}
      </View>

      <View
        style={[
          styles.inputContainer,
          {
            width: textInputWidth,
            alignItems: 'center',
            borderColor: error ? colors.onAlert : '#E0E0E0',
            padding: 5,
          },
        ]}
        ref={dropDownRef}
      >
        <DropDown
          items={countryCodes}
          toggleDropdown={toggleDropdown}
          position={{ left: dropdownLeft, top: dropdownTop }}
          style={{ maxWidth: 90 }}
          dropdownWidth={dropdownWidth}
          onPress={(selectedFilter) => handleCountrySelection(selectedFilter)}
          isCountryCode
          dialCode={dialCode}
        />
        <TextInput
          inputMode="tel"
          placeholder="Phone Number"
          placeholderTextColor={colors.placeHolder}
          style={{ flex: 1 }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
      {error ? (
        <Text variant="body1" color={colors.onAlert}>
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  inputField: {
    marginLeft: 10,
  },
})

export default MobileInput
