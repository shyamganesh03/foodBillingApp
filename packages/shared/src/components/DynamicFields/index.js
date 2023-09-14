import { View } from 'react-native'
import React, { useState } from 'react'
import { FilePicker, Text, TextInput } from '@libs/components'
import { getCurrentDate } from '../../utils/dateFunction'
import CheckBox from '../CheckBox'
import DropDown from '../DropDown'
import { toggleDropdown } from './helpers'
import { useTheme } from '@react-navigation/native'
import { getDropdownData } from '../../utils/dropDownData'

const DynamicFields = ({
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
      console.log({ dropdownAlignment, ref })
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
          <Text variant="display4">{label}</Text>
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
          error={error}
          items={getDropdownData(fieldItem)}
          // hasFullWidth={fieldItem.hasFullWidth}
          position={{ top: dropdownTop, left: dropdownLeft }}
          onPress={(selectedValue) => {}}
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
        style={{}}
        value={selectedValue}
        error={error}
        onChangeText={(value) => {}}
      />
    )
  }
  if (fieldType === 'checkbox') {
    return (
      <CheckBox
        label={label}
        handleCheck={(isChecked) => {}}
        // handleWidth={getContainerWidth}
        checkedStatus={selectedValue}
        // style={{ marginBottom: 30 }}
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
  if (fieldType === 'description') {
    return (
      <Text variant="body2" style={descriptionStyle}>
        {label}
      </Text>
    )
  }
  if (fieldType === 'date') {
    return (
      <DateInput
        title={label}
        error={error}
        inputType={inputType}
        style={{}}
        isMandatory={isMandatory}
        dob={label.toLowerCase().includes('birthdate') ? selectedValue : ''}
        disable={inputType === 'signatureDate'}
        value={selectedValue}
        onChangeText={(selectedDate) => {}}
      />
    )
  }
}

export default DynamicFields
