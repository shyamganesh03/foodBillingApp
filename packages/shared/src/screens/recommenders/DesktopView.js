import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FormContainer } from '../../components/FormContainer'
import { Card, CheckBox } from '../../components'

const DesktopView = ({
  fields,
  control,
  errors,
  isLoading,
  waiveCheck,
  handleAddEducation,
  handleFormSubmit,
  handleWaveCheck,
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
          Recommenders
        </Text>
        <Text variant="body2" style={{ marginBottom: 20 }}>
          At least two letters of recommendation are required of all applicants.
          For recent graduates it is highly recommended that at least one letter
          is from a professional acquaintance and the other is academic related.
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
                    Delete
                  </Text>
                </TouchableOpacity>
              ) : null}

              <FormContainer
                control={control}
                errors={errors}
                fieldData={fieldItems[0]}
                formName="recommenders"
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
        <Text variant="body2" style={{ marginVertical: 20 }}>
          Under the terms of the Family Educational Rights and Privacy Act
          (FERPA), you can review letters of recommendation and accompanying
          forms after you enroll at a postsecondary institution and only if that
          institution saves the documents post-enrollment.Why should you
          consider waiving your right of access? Waiving your right lets
          colleges know that you will never try to read your recommendations.
          That in turn reassures colleges that your recommenders have provided
          support that is candid and truthful. While you are free to respond as
          you wish, if you choose not to waive your right, some recommenders may
          decline your request, and some colleges may disregard letters
          submitted on your behalf. Remember, even if you retain your right of
          access, you still won't be able to view any recommendations until
          after you have been admitted to and enrolled in a college. In other
          words, FERPA does not give you the right to inspect recommendations
          before they are sent to your colleges.After you make your selection,
          you will be able to invite your counselor and recommenders. Once you
          make the first invitation, you will not be able to change your
          response to the waiver question. To ensure that you fully understand
          the implications of your selection, we urge you not to answer the
          waiver question until you have consulted with your guidance counselor
          or another school official.For more information on FERPA, click here.
        </Text>
        <CheckBox
          label={'Waive Access to Recommendation'}
          handleCheck={(isChecked) => handleWaveCheck(isChecked)}
          checkedStatus={waiveCheck}
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
