import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import DynamicFields from '../DynamicFields'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const CommonApplication = ({
  fieldData,
  activeTab,
  tabItems,
  handleValueChanged,
  handleSave,
}) => {
  const { colors } = useTheme()
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
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
                    selectedValue={fieldItem?.selectedValue}
                    inputType={fieldItem?.inputType}
                    index={fieldIndex}
                    fieldItem={fieldItem}
                    descriptionStyle={styles.description}
                    handleValueChanged={(value) => {
                      handleValueChanged({
                        selectedValue: value,
                        type: 'form',
                        step: `step${activeTab}`,
                        fieldIndex,
                        sectionIndex,
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
              handleSave(fieldData, 'initialSave')
            }}
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            buttonColor={
              activeTab !== tabItems.length - 1 ? colors.primary : '#45C65A'
            }
            onPress={() => {
              handleSave(fieldData, 'initial')
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

export default CommonApplication
