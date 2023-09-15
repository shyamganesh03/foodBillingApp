import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { DynamicFields } from '../../components'

const DesktopView = ({
  fieldData,
  isLoading,
  handleSubmit,
  handleValueChange,
  school,
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
          One Dream, Three Schools, One Free Application
        </Text>
        <Text variant="body2" style={{ marginBottom: 20 }}>
          Saba University School of Medicine, along with its sister schools
          Medical University of the Americas and St. Matthew’s University, offer
          the unprecedented opportunity to apply to up to three top Caribbean
          medical schools at once! By submitting just one set of documents and
          participating in one interview, you can receive admissions decisions
          from any or all of the three medical schools. And there is no
          application fee! Tell us to which of the three medical schools you
          would like to apply, and in what order. And, it is just as easy (and
          free) to apply only to Saba, if that is what you prefer.
        </Text>
        {fieldData?.map((fieldItem, fieldIndex) => {
          return (
            <View key={fieldIndex}>
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
            </View>
          )
        })}
        <View style={{ flexDirection: 'row', marginVertical: 40 }}>
          <Button
            label="Save"
            buttonStyle={{ marginRight: 30 }}
            isLoading={isLoading.primary}
            labelColors={colors.white}
            onPress={() =>
              handleSubmit({ type: 'create', buttonVariant: 'primary' })
            }
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            isLoading={isLoading.secondary}
            onPress={async () =>
              handleSubmit({
                type: 'createAndNext',
                buttonVariant: 'secondary',
              })
            }
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
