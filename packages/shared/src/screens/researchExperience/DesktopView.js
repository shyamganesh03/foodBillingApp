import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FormContainer } from '../../components/FormContainer'
import { Card } from '../../components'

const DesktopView = ({
  fields,
  control,
  errors,
  isLoading,
  handleAddEducation,
  handleFormSubmit,
  handlePrimary,
  handleRemove,
  handleSecondary,
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
          Research Experience
        </Text>

        {fields?.map((fieldItems, fieldsIndex) => {
          return (
            <Card>
              {fieldsIndex > 0 ? (
                <TouchableOpacity
                  onPress={() => handleRemove(fieldsIndex)}
                  style={{ alignSelf: 'flex-end' }}
                >
                  <Text variant="body2" style={{ textDecoration: 'underline' }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              ) : null}

              <FormContainer
                control={control}
                errors={errors}
                fieldData={fieldItems[0]}
                formName="researchExperience"
                arrayIndex={fieldsIndex}
              />
            </Card>
          )
        })}

        <Button
          label="Add Another Education +"
          buttonStyle={{ marginRight: 30, maxWidth: 390 }}
          labelColors={colors.white}
          onPress={() => handleAddEducation()}
        />
        <View style={{ flexDirection: 'row', marginVertical: 40 }}>
          <Button
            label="Save"
            buttonStyle={{ marginRight: 30 }}
            labelColors={colors.white}
            isLoading={isLoading.primary}
            onPress={handleFormSubmit(handlePrimary)}
          />
          <Button
            label="Save and Next"
            labelColors={colors.white}
            isLoading={isLoading.secondary}
            onPress={handleFormSubmit(handleSecondary)}
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
