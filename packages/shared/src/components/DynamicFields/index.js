import { View } from 'react-native'
import React, { useState } from 'react'
import { FilePicker, MobileInput, Text, TextInput } from '@libs/components'
import CheckBox from '../CheckBox'
import DropDown from '@libs/components/src/DropDown'
import { toggleDropdown } from './helpers'
import { useTheme } from '@react-navigation/native'
import { getDropdownData } from '../../utils/dropDownData'
import DateInput from '../DateInput'

const DynamicFields = ({
  error,
  errorMessage,
  fieldItem,
  fieldName,
  fieldType,
  handleCountrySelection,
  handleValueChanged,
  inputType,
  isFileSuccess,
  isMandatory,
  label,
  onError,
  placeholder,
  selectedValue,
  setIsFileSuccess,
  uploadDocs,
}) => {
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropDownWidth] = useState(0)
  const { colors } = useTheme()

  const handleDropDown = (visible, ref) => {
    toggleDropdown(visible, ref, (dropdownAlignment) => {
      setDropdownTop(dropdownAlignment.top)
      setDropdownLeft(dropdownAlignment.left)
      setDropDownWidth(dropdownAlignment.width)
    })
  }

  if (fieldType === 'PickList' || fieldType === 'dropdown') {
    return (
      <View
        style={{
          marginBottom: 30,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            variant="body1"
            style={{
              marginBottom: 10,
            }}
          >
            {label}
          </Text>
          {isMandatory ? (
            <Text
              variant="body1"
              color={colors.onAlert}
              style={{ marginLeft: 5 }}
            >
              *{' '}
            </Text>
          ) : null}
        </View>
        <DropDown
          dropdownWidth={dropdownWidth}
          errorMessage={errorMessage}
          items={getDropdownData(fieldItem)}
          onError={onError}
          onPress={(selectedValue) => handleValueChanged(selectedValue)}
          position={{ top: dropdownTop, left: dropdownLeft }}
          selectedItem={selectedValue}
          toggleDropdown={handleDropDown}
        />
      </View>
    )
  }
  if (fieldType === 'textField') {
    return (
      <TextInput
        errorMessage={errorMessage}
        isMandatory={isMandatory}
        label={label}
        onError={onError}
        placeholder={placeholder}
        style={{ marginBottom: 30 }}
        value={selectedValue}
        onChangeText={(value) => {
          handleValueChanged(value)
        }}
      />
    )
  }
  if (fieldType === 'checkbox') {
    return (
      <CheckBox
        label={label}
        handleCheck={(isChecked) => handleValueChanged(isChecked)}
        checkedStatus={selectedValue}
      />
    )
  }
  if (fieldType === 'mobile') {
    return (
      <MobileInput
        value={selectedValue?.split('-')[1] || selectedValue}
        isMandatory={isMandatory}
        errorMessage={errorMessage}
        dialCode={selectedValue?.split('-')[0] || ''}
        label={label}
        textInputWidth={325}
        onChangeText={(value) => {
          handleValueChanged(value)
        }}
        handleCountrySelection={(selectedCountry) =>
          handleCountrySelection(selectedCountry)
        }
      />
    )
  }
  if (fieldType === 'attachDocument') {
    return (
      <FilePicker
        heading={label}
        uploadFile={uploadDocs}
        isSuccess={isFileSuccess}
        setIsFileSuccess={setIsFileSuccess}
      />
    )
  }

  if (fieldType === 'date') {
    return (
      <DateInput
        title={label}
        onError={onError}
        errorMessage={errorMessage}
        inputType={inputType}
        style={{}}
        isMandatory={isMandatory}
        dob={label.toLowerCase().includes('birthdate') ? selectedValue : ''}
        disable={inputType === 'signatureDate'}
        value={selectedValue}
        onChangeText={(selectedDate) => handleValueChanged(selectedDate)}
      />
    )
  }
}

export default DynamicFields
