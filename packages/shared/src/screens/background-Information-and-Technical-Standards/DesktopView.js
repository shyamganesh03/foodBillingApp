import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { fieldData } from './data/metaData'
import { FormContainer } from '../../components/FormContainer'

const DesktopView = ({
  control,
  errors,
  handleFormSubmit,
  handlePrimary,
  handleSecondary,
  isLoading,
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
          Background Information and Technical Standards
        </Text>
        <Text variant="body2" style={{ marginBottom: 20 }}>
          All candidates for admission must meet the school’s Technical
          Standards, which describe the essential abilities and characteristics
          for the study and practice of medicine, including the abilities which
          relate to observation; communication; motor function;
          intellectual-conceptual (integrative and quantitative) abilities; and
          behavioral and social skills. By submitting this application, the
          candidate affirms that he or she has read the Technical Standards,
          which are available at www.saba.edu.
        </Text>
        <FormContainer
          control={control}
          errors={errors}
          fieldData={fieldData}
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
