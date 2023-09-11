import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { CheckBox, DateInput, DropDown, ModelComponent } from '../../components'
import { useTheme } from '@react-navigation/native'
import { universityLogo } from '@oap/assets'
import { FilePicker, Button, Text, TextInput } from '@libs/components'
import { Loader } from '../../components'
import { Icon } from '@r3-oaf/native-icons'

const DesktopView = ({
  setIsFileSuccess,
  activeTab,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  modalFields,
  showLoader,
  hasError,
  isFileSuccess,
  isEditMode,
  isCTADisabled,
  uploadDocs,
  formData,
  handleSave,
  getValidatedData,
  getContainerWidth,
  containerWidth,
  handleValueChanged,
  handleDelete,
  containerRef,
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
            handleSave={handleSave}
            formData={formData}
          />
          <View style={{ flex: 1 }}>
            <FormFields
              setIsFileSuccess={setIsFileSuccess}
              isSuccess={isFileSuccess}
              activeTab={activeTab}
              modalFields={modalFields}
              fieldData={formData}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              dropdownWidth={dropdownWidth}
              uploadDocs={uploadDocs}
              hasError={hasError}
              handleDelete={handleDelete}
              handleValueChanged={handleValueChanged}
              setModalFields={setModalFields}
              getDropdownData={getDropdownData}
              getValidatedData={getValidatedData}
              containerWidth={containerWidth}
              toggleDropdown={toggleDropdown}
              containerRef={containerRef}
              getContainerWidth={getContainerWidth}
              isEditMode={isEditMode}
              colors={colors}
            />
            {isEditMode ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                }}
              >
                <Button
                  label={isEditMode ? 'Save' : 'Close'}
                  buttonStyle={{ flex: 0.4 }}
                  labelColors={colors.white}
                  onPress={() => {
                    handleSave(
                      formData[`step${activeTab}`],
                      activeTab === 0 ? 'initialSave' : 'save',
                    )
                  }}
                />
                <Button
                  label={
                    activeTab !== tabItems.length - 1
                      ? 'Save and Next'
                      : 'Submit'
                  }
                  buttonStyle={{ flex: 0.4 }}
                  labelColors={colors.white}
                  buttonColor={
                    activeTab !== tabItems.length - 1
                      ? colors.primary
                      : '#45C65A'
                  }
                  onPress={() => {
                    handleSave(
                      formData[`step${activeTab}`],
                      activeTab === 0
                        ? 'initial'
                        : activeTab !== tabItems.length - 1
                        ? 'saveAndNext'
                        : 'Submit',
                    )
                  }}
                  disable={getCTAStatus(activeTab)}
                />
              </View>
            ) : null}
          </View>
        </View>
        <Loader showLoader={showLoader} />
        <ModelComponent
          data={modalFields}
          handleCloseModel={(properties) => {
            handleValueChanged(properties)
            setModalFields({
              isModelVisible: false,
              items: [],
              title: '',
              direction: 'row',
              sectionIndex: -1,
            })
          }}
          isEditMode={isEditMode}
          step={`step${activeTab}`}
          getDropdownData={getDropdownData}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          dropdownWidth={dropdownWidth}
          toggleDropdown={toggleDropdown}
          handleValueChanged={handleValueChanged}
          handleSave={() =>
            handleSave(
              formData[`step${activeTab}`],
              'modalSave',
              modalFields?.title,
            )
          }
        />
      </View>
    </ScrollView>
  )
}

const FormFields = ({
  setIsFileSuccess,
  isSuccess,
  modalFields,
  activeTab,
  hasError,
  colors,
  fieldData,
  isEditMode,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  handleValueChanged,
  handleDelete,
  containerWidth,
  containerRef,
  getContainerWidth,
  getValidatedData,
  getDropdownData,
  setModalFields,
  toggleDropdown,
  uploadDocs,
}) => {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      {!isEditMode && activeTab === 1 ? (
        <Text
          variant="body2"
          style={{ marginVertical: 20, paddingLeft: 12 }}
          color={colors.onNeutral}
        >
          Your Completed and Submitted Application
        </Text>
      ) : null}
      {Object.entries(fieldData)?.map(([step, session]) => {
        return renderFields({
          setIsFileSuccess,
          isSuccess,
          modalFields,
          isEditMode,
          activeTab,
          colors,
          session,
          step,
          containerRef,
          dropdownLeft,
          dropdownTop,
          dropdownWidth,
          handleDelete,
          containerWidth,
          handleValueChanged,
          getContainerWidth,
          getValidatedData,
          getDropdownData,
          setModalFields,
          toggleDropdown,
          uploadDocs,
        })
      })}
      {hasError.errorMessage1 ? (
        <Text
          variant="body2"
          style={{ marginTop: 20, paddingLeft: 12 }}
          color={colors.onAlert}
        >
          {hasError.errorMessage1}
        </Text>
      ) : null}
      {hasError.errorMessage2 ? (
        <Text
          variant="body2"
          style={{ marginTop: 10, paddingLeft: 12 }}
          color={colors.onAlert}
        >
          {hasError.errorMessage2}
        </Text>
      ) : null}
    </View>
  )
}

const renderFields = ({
  setIsFileSuccess,
  isSuccess,
  modalFields,
  isEditMode,
  activeTab,
  colors,
  session,
  containerRef,
  step,
  dropdownLeft,
  containerWidth,
  dropdownTop,
  dropdownWidth,
  handleValueChanged,
  handleDelete,
  getContainerWidth,
  getValidatedData,
  getDropdownData,
  setModalFields,
  toggleDropdown,
  uploadDocs,
}) => {
  const stepValue = parseInt(step.replace('step', ''))
  if (stepValue === activeTab) {
    if (activeTab === 6) {
      return (
        <ApplicationReviewContainer
          getValidatedData={getValidatedData}
          data={session?.sections}
          isEditMode={isEditMode}
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
          step={step}
          isEditMode={isEditMode}
          modalFields={modalFields}
          setModalFields={setModalFields}
          handleDelete={handleDelete}
        />
      ) : (
        <View
          style={[
            {
              padding: 12,
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
          <View
            ref={containerRef}
            style={{ flexDirection: item?.type === 'model' ? 'row' : 'column' }}
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
                isEditMode={isEditMode}
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
                          {fieldItem.mandatory && isEditMode ? (
                            <Text variant="display5" color={colors.onAlert}>
                              *{' '}
                            </Text>
                          ) : null}
                          <Text variant="display4">{fieldItem.label}</Text>
                        </View>
                        <DropDown
                          toggleDropdown={toggleDropdown}
                          dropdownWidth={dropdownWidth}
                          isEditMode={isEditMode}
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
                        isEditMode={isEditMode}
                        style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                        textInputWidth={isCenter === -1 ? '100%' : ''}
                        value={fieldItem.selectedValue}
                        error={fieldItem.error || ''}
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
                        isEditMode={isEditMode}
                        style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                        isMandatory={fieldItem.mandatory}
                        dob={
                          fieldItem.label.toLowerCase().includes('birthdate')
                            ? fieldItem.selectedValue
                            : ''
                        }
                        value={fieldItem.selectedValue}
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
                        isEditMode={isEditMode}
                        handleCheck={(isChecked) =>
                          handleValueChanged({
                            selectedValue: isChecked,
                            type: fieldItem.type,
                            step,
                            fieldIndex,
                            sectionIndex,
                          })
                        }
                        handleWidth={getContainerWidth}
                        labelStyle={{ width: containerWidth }}
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
                  if (fieldItem?.type === 'attachDocument' && isEditMode) {
                    return (
                      <FilePicker
                        heading={fieldItem.label}
                        uploadFile={uploadDocs}
                        isSuccess={isSuccess}
                        setIsFileSuccess={setIsFileSuccess}
                      />
                    )
                  }
                })}
              </View>
            )}
          </View>
        </View>
      )
    })
  }
}

const ModelContainer = ({
  modalFields,
  uploadDocs = () => {},
  step,
  data,
  index,
  setModalFields,
  handleDelete,
  isEditMode,
}) => {
  const { colors } = useTheme()
  const [tabs, setTabs] = useState([])
  const [listItems, setListItems] = useState({})

  useEffect(() => {
    if (data?.modelFieldValues) {
      const keys = Object.keys(data?.modelFieldValues)
      if (keys.length > 1) {
        let tabsData = []
        data?.modelFields?.map((item) => {
          tabsData.push(item.label)
        })
        let listItem = {}
        Object.entries(data?.modelFieldValues).map(([key, value]) => {
          const emptyArrayLength = data?.modelFieldValues['empty']?.length
          if (value?.length > emptyArrayLength) {
            listItem = {
              ...listItem,
              [key]: value.slice(0, emptyArrayLength),
            }
          } else {
            listItem = {
              ...listItem,
              [key]: value,
            }
          }
        })
        setListItems(listItem)
        tabsData.push('delete')

        setTabs(tabsData)
      } else {
        setTabs([])
        setListItems({})
      }
    }
  }, [data?.modelFieldValues])

  const getTitle = () => {
    if (!isEditMode && data?.hasAttachments) {
      return modalFields?.readModeTitle || data?.title
    } else {
      return data?.title
    }
  }

  return (
    <View
      style={[
        {
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
          padding: 12,
        }}
      >
        <Text variant="heading4">{getTitle()}</Text>
        {data.buttonText && isEditMode ? (
          <Button
            label={data.buttonText}
            onPress={() =>
              setModalFields({
                ...modalFields,
                isModelVisible: true,
                items: data?.modelFields,
                title: data?.title,
                direction: data?.modelDirection || 'row',
                sectionIndex: index,
              })
            }
            labelColors={colors.white}
          />
        ) : null}
      </View>
      {data?.description ? (
        <Text
          variant="body2"
          style={{ marginBottom: 10, marginTop: 30, paddingHorizontal: 12 }}
        >
          {data?.description?.label}
        </Text>
      ) : null}
      {tabs?.length > 0 ? (
        <ModalTabSection
          tabs={tabs}
          data={listItems}
          allData={data}
          handleDelete={handleDelete}
          isEditMode={isEditMode}
        />
      ) : null}
    </View>
  )
}

const ModalTabSection = ({ tabs, data, handleDelete, allData, isEditMode }) => {
  const { colors } = useTheme()
  return (
    <ScrollView
      style={{ flexDirection: 'row' }}
      horizontal
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {tabs?.map((item, index) => {
            return (
              <Tab
                item={{ title: item }}
                isModal
                index={index}
                totalLength={tabs.length}
                style={{
                  display:
                    !isEditMode && index === tabs.length - 1 ? 'none' : '',
                }}
                transparent={item === 'delete'}
              />
            )
          })}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {Object.entries(data).map(([key, value]) => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  width: 188,
                  display: !isEditMode && key === 'empty' ? 'none' : '',
                }}
              >
                {value?.map((item, index) => {
                  if (item?.title === 'empty') {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 8,
                          borderColor: '#D4D4D4',
                          borderWidth: 1,
                        }}
                      >
                        <Button
                          label="Delete"
                          appearance="outline"
                          buttonStyle={{ height: 20, padding: 15 }}
                          onPress={() => {
                            handleDelete({ index, data, value, key, allData })
                          }}
                        />
                      </View>
                    )
                  }
                  if (item?.title === 'download') {
                    return (
                      <DownLoadLinkContainer
                        index={index}
                        title={item?.title}
                        value={value}
                      />
                    )
                  }
                  return (
                    <View
                      style={{
                        borderColor: '#D4D4D4',
                        borderWidth: 1,
                        marginBottom: index === value.length - 1 ? 10 : 0,
                        padding: 8,
                        minHeight: 50,
                        width: 188,
                      }}
                    >
                      <Text
                        variant="body3"
                        color={item === 'noData' ? 'transparent' : ''}
                      >
                        {item}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const DownLoadLinkContainer = ({ index, title, value }) => {
  const [onHover, setOnHover] = useState(false)
  return (
    <TouchableOpacity
      style={{
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRightWidth: 1,
        marginBottom: index === value.length - 1 ? 10 : 0,
        padding: 8,
        minHeight: 50,
        width: 188,
      }}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      disabled
    >
      <Text
        variant="body3"
        style={{ textDecoration: onHover ? 'underline' : 'none' }}
        color={onHover ? '#135F90' : '#3558D6'}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const ApplicationReviewContainer = ({
  isEditMode,
  getValidatedData,
  data,
  handleValueChanged,
  step,
}) => {
  const validatedData = getValidatedData()
  const keys = Object.keys(validatedData)
  if (keys.length > 0) {
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
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Icon name="FileEdit" color="rgb(115,115,115)" />
                <Text variant="body1" style={{ marginLeft: 10 }}>
                  {key}
                </Text>
              </View>
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
                    isEditMode={isEditMode}
                    isMandatory={fieldItem.mandatory}
                    style={{ marginRight: 20 }}
                    textInputWidth={145}
                    value={fieldItem.selectedValue}
                    error={fieldItem.error || ''}
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
                    isEditMode={isEditMode}
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
  isEditMode,
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
        maxWidth: isEditMode ? '' : '80%',
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
              isEditMode={isEditMode}
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
                {field.mandatory && isEditMode ? (
                  <Text variant="display5" color={colors.onAlert}>
                    *{' '}
                  </Text>
                ) : null}
                <Text variant="display4">{field.label}</Text>
              </View>
              <DropDown
                toggleDropdown={toggleDropdown}
                isEditMode={isEditMode}
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

const TabSection = ({
  tabItems,
  activeTab,
  setActiveTab,
  handleSave,
  formData,
}) => {
  return (
    <View style={styles.tabContainer}>
      {tabItems?.map((item, index) => (
        <Tab
          item={item}
          index={index}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleSave={handleSave}
          formData={formData}
        />
      ))}
    </View>
  )
}

const Tab = ({
  formData,
  handleSave,
  style,
  item,
  index,
  activeTab,
  setActiveTab,
  transparent,
  isModal,
  totalLength,
}) => {
  const isActive = activeTab === index

  const getTabStyle = () => {
    if (isModal) {
      return styles.modalTab
    } else {
      if (isActive) {
        return styles.activeTab
      } else {
        return styles.unActiveTab
      }
    }
  }

  const getColor = () => {
    if (isModal) {
      if (index === totalLength || transparent) {
        return 'transparent'
      }
      return '#5A5A5A'
    } else {
      if (isActive) {
        return '#3558D6'
      } else {
        return 'rgb(75,75,75)'
      }
    }
  }
  return (
    <TouchableOpacity
      key={index}
      style={[getTabStyle(), style]}
      onPress={() => {
        if (!isModal) {
          setActiveTab(index)
          handleSave(
            formData[`step${activeTab}`],
            activeTab === 0 ? 'initialSave' : 'save',
          )
        }
      }}
    >
      <Text
        variant="body2"
        color={getColor()}
        style={
          !isModal && {
            textDecoration: isActive ? 'underline' : 'none',
          }
        }
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
    borderWidth: 1,
    width: 191,
  },
  unActiveTab: {
    padding: 12,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    width: 191,
  },
  header: {
    padding: 12,
  },
  modalTab: {
    borderColor: '#D4D4D4',
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    width: 188,
  },
})

export default DesktopView
