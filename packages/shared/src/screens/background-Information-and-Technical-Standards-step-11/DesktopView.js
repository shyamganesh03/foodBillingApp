import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { DynamicFields } from '../../components'
import { fieldData } from './data/metaData'

const DesktopView = ({
  backgroundInformation,
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
        <Text variant="heading2" style={{ marginBottom: 20 }}>
          {fieldData.title}
        </Text>
        {fieldData.fields.map((fieldItem, fieldIndex) => {
          return (
            <View key={fieldIndex}>
              <DynamicFields
                error={fieldItem?.error}
                fieldType={fieldItem?.type}
                isMandatory={fieldItem?.mandatory}
                label={fieldItem?.label}
                selectedValue={backgroundInformation[fieldItem.fieldName]}
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
            </View>
          )
        })}
        <View style={{ flexDirection: 'row', marginVertical: 40 }}>
          <Button
            label="Save"
            buttonStyle={{ marginRight: 30 }}
            labelColors={colors.white}
            onPress={() => {
              handleSave({
                type: 'create',
                fieldData: backgroundInformation,
              })
            }}
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            buttonColor={colors.primary}
            onPress={() => {
              handleSave({
                fieldData,
                type: 'initial',
                fieldData: backgroundInformation,
              })
            }}
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
