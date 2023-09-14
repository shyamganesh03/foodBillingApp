import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { DynamicFields } from '../../components'
import { fieldData } from './data/metaData'

const DesktopView = ({
  school,
  activeTab,
  tabItems,
  handleValueChange,
  handleSave,
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
        {fieldData?.sections?.map((sectionItem, sectionIndex) => {
          return (
            <View key={sectionIndex}>
              <Text variant="heading2" style={{ marginBottom: 20 }}>
                {sectionItem?.title}
              </Text>
              {sectionItem.fields.map((fieldItem, fieldIndex) => {
                return (
                  <DynamicFields
                    error={fieldItem?.error}
                    fieldType={fieldItem?.type}
                    isMandatory={fieldItem?.mandatory}
                    label={fieldItem?.label}
                    selectedValue={school[fieldItem.fieldName]}
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
                  />
                )
              })}
            </View>
          )
        })}
        <View style={{ flexDirection: 'row' }}>
          <Button
            label="Save"
            buttonStyle={{ marginRight: 30 }}
            labelColors={colors.white}
            onPress={() => {
              handleSave({ type: 'create', fieldData: school })
            }}
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            buttonColor={colors.primary}
            onPress={() => {
              handleSave({ fieldData, type: 'initial', fieldData: school })
            }}
            // disable={getCTAStatus(activeTab)}
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
