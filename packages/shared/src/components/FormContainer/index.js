import React from 'react'
import { View } from 'react-native'
import { Controller } from 'react-hook-form'
import DynamicFields from '../DynamicFields'

export const FormContainer = ({
  handleCountrySelection,
  fieldData,
  control,
  errors,
  formName = '',
  arrayIndex,
}) => {
  return (
    <>
      {fieldData?.map((fieldItem, fieldIndex) => {
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
                    handleCountrySelection={(selectedValue) => {
                      handleCountrySelection({
                        selectedValue,
                        fieldItem,
                        fieldIndex,
                      })
                    }}
                    handleValueChanged={(value) => {
                      onChange(value)
                    }}
                    onError={
                      formName
                        ? !!errors?.[formName]?.[arrayIndex]?.[
                            fieldItem?.fieldName
                          ]
                        : !!errors?.[fieldItem?.fieldName]
                    }
                    errorMessage={
                      formName
                        ? errors?.[formName]?.[arrayIndex]?.[
                            fieldItem?.fieldName
                          ]?.message
                        : errors?.[fieldItem?.fieldName]?.message
                    }
                  />
                )
              }}
              name={
                formName
                  ? `${formName}.${arrayIndex}.${fieldItem?.fieldName}`
                  : fieldItem?.fieldName
              }
              rules={fieldItem.rules}
            />
          </View>
        )
      })}
    </>
  )
}
