import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import {
  Button,
  CheckBox,
  DateInput,
  DropDown,
  ModelComponent,
  Text,
  TextInput,
} from '../../components'
import { useTheme } from '@react-navigation/native'
import { universityLogo } from '@oap/assets'
import { FilePicker } from '@libs/components'
import { getDropdownData } from '../../api'

const DesktopView = ({
  activeTab,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  modalFields,
  isCTADisabled,
  formData,
  handleSave,
  getValidatedData,
  handleValueChanged,
  getCTAStatus,
  getDropdownData,
  setActiveTab,
  setModalFields,
  toggleDropdown,
  tabItems,
}) => {
  const { colors } = useTheme()
  return (
    <ScrollView style={styles.container}>
      <Image
        source={universityLogo}
        style={{
          height: 102,
          width: 302,
          alignSelf: 'center',
          marginBottom: 30,
        }}
        resizeMode="contain"
      />
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <TabSection
            tabItems={tabItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <View style={{ flex: 1 }}>
            <FormFields
              activeTab={activeTab}
              fieldData={formData}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              dropdownWidth={dropdownWidth}
              handleValueChanged={handleValueChanged}
              setModalFields={setModalFields}
              getDropdownData={getDropdownData}
              getValidatedData={getValidatedData}
              toggleDropdown={toggleDropdown}
              colors={colors}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
            >
              <Button
                label="Save"
                buttonStyle={{ flex: 0.4 }}
                labelColors={colors.white}
                onPress={() => {
                  handleSave(formData[`step${activeTab}`], 'save')
                }}
              />
              <Button
                label={
                  activeTab !== tabItems.length - 1 ? 'Save and Next' : 'Submit'
                }
                buttonStyle={{ flex: 0.4 }}
                labelColors={colors.white}
                buttonColor={
                  activeTab !== tabItems.length - 1 ? colors.primary : '#45C65A'
                }
                onPress={() => {
                  handleSave(
                    formData[`step${activeTab}`],
                    activeTab !== tabItems.length - 1
                      ? 'saveAndNext'
                      : 'Submit',
                  )
                }}
                disable={getCTAStatus(activeTab)} //isCTADisabled && activeTab === tabItems.length - 1
              />
            </View>
          </View>
        </View>
        <ModelComponent
          data={modalFields}
          handleCloseModel={() =>
            setModalFields({
              isModelVisible: false,
              items: [],
              title: '',
              direction: 'row',
            })
          }
          getDropdownData={getDropdownData}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          dropdownWidth={dropdownWidth}
          toggleDropdown={toggleDropdown}
          handleValueChanged={handleValueChanged}
        />
      </View>
    </ScrollView>
  )
}

const FormFields = ({
  activeTab,
  colors,
  fieldData,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  handleValueChanged,
  getValidatedData,
  getDropdownData,
  setModalFields,
  toggleDropdown,
}) => {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      {Object.entries(fieldData)?.map(([step, session]) => {
        return renderFields({
          activeTab,
          colors,
          session,
          step,
          dropdownLeft,
          dropdownTop,
          dropdownWidth,
          handleValueChanged,
          getValidatedData,
          getDropdownData,
          setModalFields,
          toggleDropdown,
        })
      })}
    </View>
  )
}

const renderFields = ({
  activeTab,
  colors,
  session,
  step,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  handleValueChanged,
  getValidatedData,
  getDropdownData,
  setModalFields,
  toggleDropdown,
}) => {
  const stepValue = parseInt(step.replace('step', ''))

  if (stepValue === activeTab) {
    if (activeTab === 6) {
      return (
        <ApplicationReviewContainer
          getValidatedData={getValidatedData}
          data={session?.sections}
          handleValueChanged={handleValueChanged}
          step={step}
        />
      )
    }
    return session?.sections?.map((item, sectionIndex) => {
      return item?.type === 'model' ? (
        <ModelContainer
          data={item}
          index={sectionIndex}
          setModalFields={setModalFields}
        />
      ) : (
        <View
          style={[
            {
              padding: 12,
              flexDirection: item?.type === 'model' ? 'row' : 'column',
            },
            stepValue !== 0
              ? {
                  borderWidth: 2,
                  borderColor: item.hasNoBorder ? 'transparent' : '#D4D4D4',
                  borderRadius: 5,
                  marginBottom: 10,
                }
              : {},
          ]}
        >
          <Text
            variant={stepValue === 0 ? 'heading3' : 'heading4'}
            style={{
              textDecoration: stepValue === 0 ? 'underline' : 'none',
              marginBottom: item?.type === 'model' ? 0 : 10,
            }}
          >
            {item?.title}
          </Text>
          {stepValue === 0 ? (
            <CommonFromContainer
              item={item}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              getDropdownData={getDropdownData}
              dropdownWidth={dropdownWidth}
              toggleDropdown={toggleDropdown}
              handleValueChanged={handleValueChanged}
              step={step}
              sectionIndex={sectionIndex}
            />
          ) : (
            <View
              style={{
                flexDirection: item?.direction || 'row',
                flex: 1,
                flexWrap: 'wrap',
              }}
            >
              {item?.fields?.map((fieldItem, fieldIndex) => {
                const isCenter = !item?.direction ? (fieldIndex + 2) % 3 : -1
                if (
                  fieldItem.type === 'PickList' ||
                  fieldItem.type === 'dropdown'
                ) {
                  return (
                    <View
                      style={{
                        marginBottom: 10,
                        marginHorizontal: isCenter === 0 ? 20 : 0,
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        {fieldItem.mandatory ? (
                          <Text variant="display5" color={colors.onAlert}>
                            *{' '}
                          </Text>
                        ) : null}
                        <Text variant="display4">{fieldItem.label}</Text>
                      </View>
                      <DropDown
                        toggleDropdown={toggleDropdown}
                        dropdownWidth={dropdownWidth}
                        items={getDropdownData(fieldItem)}
                        hasFullWidth={fieldItem.hasFullWidth}
                        position={{ top: dropdownTop, left: dropdownLeft }}
                        onPress={(selectedValue) =>
                          handleValueChanged({
                            selectedValue: selectedValue,
                            type: fieldItem.type,
                            step,
                            fieldIndex,
                            sectionIndex,
                          })
                        }
                        selectedItem={fieldItem.selectedValue}
                      />
                    </View>
                  )
                }
                if (fieldItem.type === 'textField') {
                  return (
                    <TextInput
                      label={fieldItem.label}
                      isMandatory={fieldItem.mandatory}
                      style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                      textInputWidth={isCenter === -1 ? '100%' : ''}
                      value={fieldItem.selectedValue}
                      onChangeText={(value) => {
                        handleValueChanged({
                          selectedValue: value,
                          type: fieldItem.type,
                          step,
                          fieldIndex,
                          sectionIndex,
                        })
                      }}
                    />
                  )
                }
                if (fieldItem.type === 'date') {
                  return (
                    <DateInput
                      title={fieldItem.label}
                      style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                      isMandatory={fieldItem.mandatory}
                      onChangeText={(selectedDate) =>
                        handleValueChanged({
                          selectedValue: selectedDate,
                          type: fieldItem.type,
                          step,
                          fieldIndex,
                          sectionIndex,
                        })
                      }
                    />
                  )
                }
                if (fieldItem?.type === 'checkbox') {
                  return (
                    <CheckBox
                      label={fieldItem.label}
                      handleCheck={(isChecked) =>
                        handleValueChanged({
                          selectedValue: isChecked,
                          type: fieldItem.type,
                          step,
                          fieldIndex,
                          sectionIndex,
                        })
                      }
                      checkedStatus={fieldItem.selectedValue}
                    />
                  )
                }
                if (fieldItem?.type === 'description') {
                  return (
                    <Text variant="body2" style={{ marginBottom: 10 }}>
                      {fieldItem?.label}
                    </Text>
                  )
                }
                if (fieldItem?.type === 'attachDocument') {
                  return <FilePicker heading={fieldItem.label} />
                }
              })}
            </View>
          )}
        </View>
      )
    })
  }
}

const ModelContainer = ({ data, index, setModalFields }) => {
  const { colors } = useTheme()
  return (
    <View
      style={[
        {
          padding: 12,
          flexDirection: 'column',
          borderWidth: 2,
          borderColor: data.hasNoBorder ? 'transparent' : '#D4D4D4',
          borderRadius: 5,
          marginBottom: 10,
        },
      ]}
      key={index}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading4">{data?.title}</Text>
        <Button
          label={data.buttonText}
          onPress={() =>
            setModalFields({
              isModelVisible: true,
              items: data?.modelFields,
              title: data?.title,
              direction: data?.modelDirection || 'row',
            })
          }
          labelColors={colors.white}
        />
      </View>
      {data?.description ? (
        <Text variant="body2" style={{ marginBottom: 10, marginTop: 30 }}>
          {data?.description?.label}
        </Text>
      ) : null}
    </View>
  )
}

const ApplicationReviewContainer = ({
  getValidatedData,
  data,
  handleValueChanged,
  step,
}) => {
  const validatedData = getValidatedData()
  const keys = Object.keys(validatedData)
  if (keys.length === 0) {
    return (
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
            Before submitting your application, please return to the below tabs
            to complete and save the indicated fields.
          </Text>
        </View>
        {Object.entries(validatedData).map(([key, value]) => {
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
              <Text
                variant="body1"
                style={{
                  marginBottom: 10,
                }}
              >
                {key}
              </Text>
              {value.map((item, index) => {
                return (
                  <Text key={index} variant="body2">
                    {item.label}
                  </Text>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  } else {
    return (
      <View style={{ padding: 24 }}>
        <Text variant="body1" style={{ marginBottom: 24 }}>
          CERTIFICATION STATEMENT
        </Text>
        <Text variant="body3" style={{ marginBottom: 24 }}>
          I hereby authorize Saba University School of Medicine to report
          information concerning my MCAT scores to the U.S. Department of
          Education, other regulatory bodies, and accrediting bodies.
        </Text>
        <Text variant="body3" style={{ marginBottom: 24 }}>
          The filling out and electronic submission of this form acknowledges
          that I understand that withholding any information requested in this
          application or giving false information may make me ineligible for
          admission to/or subject to dismissal from Saba University School of
          Medicine. With this in mind, I certify that the above statements are
          correct and complete.
        </Text>
        <Text variant="body3" style={{ marginBottom: 24 }}>
          No person shall be excluded from participation in, denied benefits of,
          or be subject to discrimination under any program or activity
          sponsored or conducted by Saba University School of Medicine, on any
          basis prohibited by applicable law, including but not limited to race,
          color, national origin, sex, age, or handicap.
        </Text>
        <Text variant="body3" style={{ marginBottom: 24 }}>
          Please note: Information on sex, age, ethnic origin, and citizenship
          status is collected for compliance reports in connection with the
          federal regulation pursuant to the Civil Rights Acts of 1964,
          Executive Order 11375 and Title IX of the Education Amendments and
          Part 86. 45 C.F.R., and will not be used to discriminate in admission
          to or participation in any educational programs or activities offered
          by Saba University School of Medicine.
        </Text>
        <Text variant="body3" style={{ marginBottom: 24 }}>
          {
            '[University policies and academic requirements are subject to change from time-to-time.]'
          }
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {data?.map((item, index) => {
            return item?.fields?.map((fieldItem, fieldIndex) => {
              if (fieldItem.type === 'textField') {
                return (
                  <TextInput
                    label={fieldItem.label}
                    isMandatory={fieldItem.mandatory}
                    style={{ marginRight: 20 }}
                    textInputWidth={145}
                    value={fieldItem.selectedValue}
                    onChangeText={(value) => {
                      handleValueChanged({
                        selectedValue: value,
                        type: fieldItem.type,
                        step,
                        fieldIndex,
                        sectionIndex: 0,
                      })
                    }}
                  />
                )
              }
              if (fieldItem.type === 'date') {
                return (
                  <DateInput
                    title={fieldItem.label}
                    style={{}}
                    isMandatory={fieldItem.mandatory}
                    textInputWidth={145}
                    onChangeText={(selectedDate) =>
                      handleValueChanged({
                        selectedValue: selectedDate,
                        type: fieldItem.type,
                        step,
                        fieldIndex,
                        sectionIndex: 0,
                      })
                    }
                  />
                )
              }
            })
          })}
        </View>
      </View>
    )
  }
}

const CommonFromContainer = ({
  item,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  handleValueChanged,
  getDropdownData,
  step,
  sectionIndex,
  toggleDropdown,
}) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flexDirection: item.direction || 'column',
        justifyContent: 'space-between',
      }}
    >
      {item.fields?.map((field, fieldIndex) => {
        if (field?.type === 'description') {
          return <Text variant="body2">{field?.label}</Text>
        } else if (field?.type === 'image') {
          return (
            <Image
              source={universityLogo}
              style={{ height: 102, width: 352, marginBottom: 30 }}
              resizeMode="contain"
            />
          )
        } else if (field?.type === 'checkbox') {
          return (
            <CheckBox
              label={field.label}
              handleCheck={(isChecked) =>
                handleValueChanged({
                  selectedValue: isChecked,
                  type: field.type,
                  step,
                  fieldIndex,
                  sectionIndex,
                })
              }
              checkedStatus={field.selectedValue}
            />
          )
        } else if (field?.type === 'PickList' || field?.type === 'dropdown') {
          return (
            <View>
              <View style={{ flexDirection: 'row' }}>
                {field.mandatory ? (
                  <Text variant="display5" color={colors.onAlert}>
                    *{' '}
                  </Text>
                ) : null}
                <Text variant="display4">{field.label}</Text>
              </View>
              <DropDown
                toggleDropdown={toggleDropdown}
                dropdownWidth={dropdownWidth}
                items={getDropdownData(field)}
                position={{ top: dropdownTop, left: dropdownLeft }}
                onPress={(selectedValue) =>
                  handleValueChanged({
                    selectedValue: selectedValue,
                    type: field.type,
                    step,
                    fieldIndex: fieldIndex,
                    sectionIndex,
                  })
                }
                selectedItem={field.selectedValue}
              />
            </View>
          )
        }
      })}
    </View>
  )
}

const TabSection = ({ tabItems, activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      {tabItems.map((item, index) => (
        <Tab
          item={item}
          index={index}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </View>
  )
}

const Tab = ({ item, index, activeTab, setActiveTab }) => {
  const isActive = activeTab === index
  return (
    <TouchableOpacity
      key={index}
      style={isActive ? styles.activeTab : styles.unActiveTab}
      onPress={() => setActiveTab(index)}
    >
      <Text
        variant="body2"
        color={isActive ? '#3558D6' : 'rgb(75,75,75)'}
        style={{
          textDecoration: isActive ? 'underline' : 'none',
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  formContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  form: {
    borderRadius: 4,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    flexDirection: 'row',
  },
  tabContainer: {
    flexDirection: 'column',
  },
  activeTab: {
    padding: 12,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    width: 191,
  },
  unActiveTab: {
    padding: 12,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    width: 191,
  },
  header: {
    padding: 12,
  },
})

export default DesktopView
