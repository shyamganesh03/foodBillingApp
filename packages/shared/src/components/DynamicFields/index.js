import { View } from 'react-native'
import React from 'react'
import { FilePicker, Text, TextInput } from '@libs/components'
import { getCurrentDate } from '../../utils/dateFunction'

const DynamicFields = ({
  error,
  fieldType,
  isFileSuccess,
  isMandatory,
  label,
  selectedValue,
  setIsFileSuccess,
  uploadDocs,
  inputType,
  value,
}) => {
  if (fieldType === 'textField') {
    return (
      <TextInput
        label={label}
        isMandatory={isMandatory}
        style={{}}
        value={value}
        error={error}
        onChangeText={(value) => {}}
      />
    )
  }
  if (type === 'checkbox') {
    return (
      <CheckBox
        label={label}
        handleCheck={(isChecked) => {}}
        handleWidth={getContainerWidth}
        checkedStatus={selectedValue}
      />
    )
  }
  if (type === 'attachDocument') {
    return (
      <FilePicker
        heading={label}
        uploadFile={uploadDocs}
        isSuccess={isFileSuccess}
        setIsFileSuccess={setIsFileSuccess}
      />
    )
  }
  if (type === 'description') {
    return <Text variant="body2">{label}</Text>
  }
  if (type === 'date') {
    return (
      <DateInput
        title={label}
        error={error}
        inputType={inputType}
        style={{}}
        isMandatory={isMandatory}
        dob={label.toLowerCase().includes('birthdate') ? selectedValue : ''}
        disable={inputType === 'signatureDate'}
        value={
          inputType === 'signatureDate'
            ? getCurrentDate({ type: 'string' })
            : selectedValue
        }
        onChangeText={(selectedDate) => {}}
      />
    )
  }
}

export default DynamicFields
