import React from 'react'
import { View } from 'react-native'
import { Controller } from 'react-hook-form'
import DynamicFields from '../DynamicFields'

export const FormContainer = ({ fieldData, control, errors }) => {
  console.log({ fieldData })
  return (
    <>
      {fieldData.map((fieldItem, fieldIndex) => {
        return (
          <View key={fieldIndex}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DynamicFields
                    descriptionStyle={{
                      marginBottom: 30,
                    }}
                    fieldItem={fieldItem}
                    fieldName={fieldItem.fieldName}
                    fieldType={fieldItem.type}
                    inputType={fieldItem.inputType}
                    isMandatory={fieldItem?.rules?.required}
                    label={fieldItem.label}
                    placeholder={fieldItem.placeholder}
                    selectedValue={value}
                    handleValueChanged={(value) => {
                      onChange(value)
                    }}
                    onError={errors?.[fieldItem?.fieldName] ? true : false}
                    errorMessage={errors?.[fieldItem?.fieldName]?.message}
                  />
                )
              }}
              name={fieldItem.fieldName}
              rules={fieldItem.rules}
            />
          </View>
        )
      })}
    </>
  )
}
