import { View } from 'react-native'
import React, { useState } from 'react'
import { FilePicker, MobileInput, Text, TextInput } from '@libs/components'
import { getCurrentDate } from '../../utils/dateFunction'
import CheckBox from '../CheckBox'
import DropDown from '@libs/components/src/DropDown'
import { toggleDropdown } from './helpers'
import { useTheme } from '@react-navigation/native'
import { getDropdownData } from '../../utils/dropDownData'
import DateInput from '../DateInput'

const DynamicFields = ({
  fieldName,
  index,
  handleValueChanged,
  handleCountrySelection,
  descriptionStyle,
  fieldItem,
  error,
  fieldType,
  isFileSuccess,
  isMandatory,
  label,
  selectedValue,
  setIsFileSuccess,
  uploadDocs,
  inputType,
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
        key={index}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            variant="display4"
            style={{
              marginBottom: 10,
            }}
          >
            {label}
          </Text>
          {isMandatory ? (
            <Text
              variant="display4"
              color={colors.onAlert}
              style={{ marginLeft: 5 }}
            >
              *{' '}
            </Text>
          ) : null}
        </View>
        <DropDown
          toggleDropdown={handleDropDown}
          dropdownWidth={dropdownWidth}
          error={error ? error[fieldName] : ''}
          items={getDropdownData(fieldItem)}
          // hasFullWidth={fieldItem.hasFullWidth}
          position={{ top: dropdownTop, left: dropdownLeft }}
          onPress={(selectedValue) => handleValueChanged(selectedValue)}
          selectedItem={selectedValue}
        />
      </View>
    )
  }
  if (fieldType === 'textField') {
    return (
      <TextInput
        label={label}
        isMandatory={isMandatory}
        style={{ marginBottom: 30 }}
        value={selectedValue}
        error={error ? error[fieldName] : ''}
        onChangeText={(value) => {
          handleValueChanged(value)
        }}
        key={index}
      />
    )
  }
  if (fieldType === 'checkbox') {
    return (
      <CheckBox
        label={label}
        itemIndex={index}
        handleCheck={(isChecked) => handleValueChanged(isChecked)}
        // handleWidth={getContainerWidth}
        checkedStatus={selectedValue}
        // style={{ marginBottom: 30 }}
      />
    )
  }
  if (fieldType === 'mobile') {
    return (
      <MobileInput
        value={selectedValue}
        isMandatory={isMandatory}
        error={error ? error[fieldName] : ''}
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
        key={index}
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
        key={index}
        error={error ? error[fieldName] : ''}
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
