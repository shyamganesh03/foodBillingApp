import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { DynamicFields } from '../../components'

const DesktopView = ({
  contactInformation,
  checkCTAStatus,
  fieldData,
  handleSubmit,
  handleValueChange,
  handleCountrySelection,
  isLoading,
  validationError,
}) => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 60,
          paddingHorizontal: 40,
        }}
      >
        <Text variant="heading2" style={{ marginBottom: 20 }}>
          Contact Information
        </Text>
        {fieldData.map((fieldItem, fieldIndex) => {
          return (
            <View key={fieldIndex}>
              <DynamicFields
                error={validationError}
                fieldType={fieldItem?.type}
                isMandatory={fieldItem?.mandatory}
                fieldName={fieldItem.fieldName}
                label={fieldItem?.label}
                selectedValue={contactInformation[fieldItem.fieldName]}
                inputType={fieldItem?.inputType}
                index={fieldIndex}
                fieldItem={fieldItem}
                descriptionStyle={styles.description}
                handleValueChanged={(value) => {
                  handleValueChange({
                    fieldItem,
                    selectedValue: value,
                  })
                }}
                handleCountrySelection={(value) =>
                  handleCountrySelection({
                    fieldItem,
                    selectedValue: value,
                  })
                }
              />
            </View>
          )
        })}
        <View style={{ flexDirection: 'row', marginVertical: 40 }}>
          <Button
            label="Save"
            buttonStyle={{ marginRight: 30 }}
            labelColors={colors.white}
            isLoading={isLoading.primary}
            onPress={() => {
              handleSubmit({ type: 'save', buttonVariant: 'primary' })
            }}
            disable={checkCTAStatus()}
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            isLoading={isLoading.secondary}
            onPress={() => {
              handleSubmit({ type: 'saveAndNext', buttonVariant: 'secondary' })
            }}
            disable={checkCTAStatus()}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 30,
  },
})

export default DesktopView
