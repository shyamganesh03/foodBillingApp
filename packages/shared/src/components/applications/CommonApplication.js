import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import DynamicFields from '../DynamicFields'
import { useTheme } from '@react-navigation/native'

const CommonApplication = ({ fieldData, activeTab, tabItems }) => {
  const { colors } = useTheme()
  return (
    <View>
      {fieldData?.sections?.map((sectionItem, sectionIndex) => {
        return (
          <View>
            <Text variant="heading2" style={{ marginBottom: 20 }}>
              {sectionItem?.title}
            </Text>
            {sectionItem.fields.map((fieldItem, index) => {
              return (
                <DynamicFields
                  error={fieldItem?.error}
                  fieldType={fieldItem?.type}
                  isMandatory={fieldItem?.mandatory}
                  label={fieldItem?.label}
                  selectedValue={fieldItem?.selectedValue}
                  inputType={fieldItem?.inputType}
                  fieldItem={fieldItem}
                  descriptionStyle={styles.description}
                />
              )
            })}
          </View>
        )
      })}
      <View style={{ flexDirection: 'row' }}>
        <Button
          label={'Save'}
          buttonStyle={{ marginRight: 30 }}
          labelColors={colors.white}
          onPress={() => {}}
        />
        <Button
          label={activeTab !== tabItems.length - 1 ? 'Save and Next' : 'Submit'}
          // buttonStyle={{ flex: 0.4 }}
          labelColors={colors.white}
          buttonColor={
            activeTab !== tabItems.length - 1 ? colors.primary : '#45C65A'
          }
          onPress={() => {}}
          // disable={getCTAStatus(activeTab)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 30,
  },
})

export default CommonApplication
