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
          One Dream, Three Schools, One Free Application
        </Text>
        <Text variant="body2" style={{ marginBottom: 20 }}>
          GUS Medical Universities, along with its sister schools Medical
          University of the Americas and St. Matthew’s University, offer the
          unprecedented opportunity to apply to up to three top Caribbean
          medical schools at once! By submitting just one set of documents and
          participating in one interview, you can receive admissions decisions
          from any or all of the three medical schools. And there is no
          application fee! Tell us to which of the three medical schools you
          would like to apply, and in what order.
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
