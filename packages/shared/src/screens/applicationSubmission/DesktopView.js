import { ScrollView, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@libs/components'
import { Icon } from '@r3-oaf/native-icons'
import { useTheme } from '@react-navigation/native'
import { FormContainer } from '../../components/FormContainer'

const DesktopView = ({
  control,
  errors,
  fieldData,
  isLoading,
  requiredFields,
  handleFormSubmit,
  handlePrimary,
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
        {Object.values(requiredFields).some((values) => values?.length > 0) ? (
          <View style={{ padding: 12 }}>
            <View
              style={{
                marginBottom: 10,
                backgroundColor: '#ffffdc',
                padding: 5,
                margin: 5,
                borderColor: '#f8e38e',
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Text variant="body2">
                Before submitting your application, please return to the below
                tabs to complete and save the indicated fields.
              </Text>
            </View>
            {Object.entries(requiredFields).map(([key, value]) => {
              return (
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#D4D4D4',
                    borderRadius: 5,
                    marginBottom: 10,
                    padding: 12,
                    flexDirection: 'column',
                    margin: 12,
                  }}
                >
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Icon name="FileEdit" color="rgb(115,115,115)" />
                    <Text variant="body1" style={{ marginLeft: 10 }}>
                      {key.replaceAll('_', ' ')}
                    </Text>
                  </View>
                  {value.map((item, index) => {
                    if (item?.id) {
                      return (
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            key={index}
                            variant="body2"
                            style={{ fontWeight: 600 }}
                          >
                            {item.id} :{' '}
                          </Text>
                          <Text key={index} variant="body2">
                            {item.label}
                          </Text>
                        </View>
                      )
                    }
                    return (
                      <Text key={index} variant="body2">
                        {item}
                      </Text>
                    )
                  })}
                </View>
              )
            })}
          </View>
        ) : (
          <View style={{ padding: 24 }}>
            <Text variant="body1" style={{ marginBottom: 24 }}>
              CERTIFICATION STATEMENT
            </Text>
            <Text variant="body3" style={{ marginBottom: 24 }}>
              I hereby authorize GUS Medical Universities to report information
              concerning my MCAT scores to the U.S. Department of Education,
              other regulatory bodies, and accrediting bodies.
            </Text>
            <Text variant="body3" style={{ marginBottom: 24 }}>
              The filling out and electronic submission of this form
              acknowledges that I understand that withholding any information
              requested in this application or giving false information may make
              me ineligible for admission to/or subject to dismissal from GUS
              Medical Universities. With this in mind, I certify that the above
              statements are correct and complete.
            </Text>
            <Text variant="body3" style={{ marginBottom: 24 }}>
              No person shall be excluded from participation in, denied benefits
              of, or be subject to discrimination under any program or activity
              sponsored or conducted by GUS Medical Universities, on any basis
              prohibited by applicable law, including but not limited to race,
              color, national origin, sex, age, or handicap.
            </Text>
            <Text variant="body3" style={{ marginBottom: 24 }}>
              Please note: Information on sex, age, ethnic origin, and
              citizenship status is collected for compliance reports in
              connection with the federal regulation pursuant to the Civil
              Rights Acts of 1964, Executive Order 11375 and Title IX of the
              Education Amendments and Part 86. 45 C.F.R., and will not be used
              to discriminate in admission to or participation in any
              educational programs or activities offered by GUS Medical
              Universities.
            </Text>
            <Text variant="body3" style={{ marginBottom: 24 }}>
              {
                '[University policies and academic requirements are subject to change from time-to-time.]'
              }
            </Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <FormContainer
                control={control}
                errors={errors}
                fieldData={fieldData}
              />
            </View>
            <Button
              label="Submit"
              buttonStyle={{ maxWidth: 100 }}
              labelColors={colors.white}
              isLoading={isLoading.primary}
              onPress={handleFormSubmit(handlePrimary)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default DesktopView
