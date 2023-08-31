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

const DesktopView = ({
  activeTab,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  modalFields,
  fieldData,
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
              fieldData={fieldData}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              dropdownWidth={dropdownWidth}
              setModalFields={setModalFields}
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
              />
              <Button
                label={
                  activeTab !== tabItems.length - 1 ? 'Save and Next' : 'Submit'
                }
                buttonStyle={{ flex: 0.4 }}
                labelColors={colors.white}
                onPress={() =>
                  activeTab !== tabItems.length - 1
                    ? setActiveTab(activeTab + 1)
                    : {}
                }
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
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          dropdownWidth={dropdownWidth}
          toggleDropdown={toggleDropdown}
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
  setModalFields,
  toggleDropdown,
}) => {
  const stepValue = parseInt(step.replace('step', ''))

  if (stepValue === activeTab) {
    return session?.sections?.map((item, index) => {
      return (
        <View
          style={[
            {
              padding: 12,
              flexDirection: item?.type === 'model' ? 'row' : 'column',
            },
            stepValue !== 0
              ? {
                  borderWidth: 2,
                  borderColor: '#D4D4D4',
                  borderRadius: 5,
                  marginBottom: 10,
                }
              : {},
          ]}
        >
          <Text
            variant={stepValue === 0 ? 'heading3' : 'heading4'}
            style={{ textDecoration: stepValue === 0 ? 'underline' : 'none' }}
          >
            {item?.title}
          </Text>
          {stepValue === 0 ? (
            <CommonFromContainer
              item={item}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              dropdownWidth={dropdownWidth}
              toggleDropdown={toggleDropdown}
            />
          ) : (
            <View
              style={{
                flexDirection: item?.fields?.length > 1 ? 'row' : 'column',
                flex: 1,
                flexWrap: 'wrap',
              }}
            >
              {item?.fields?.map((fieldItem, fieldIndex) => {
                const isCenter = (fieldIndex + 2) % 3
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
                        items={
                          fieldItem.pickListValues || fieldItem.dropdownValues
                        }
                        position={{ top: dropdownTop, left: dropdownLeft }}
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
                    />
                  )
                }
                if (fieldItem.type === 'date') {
                  return (
                    <DateInput
                      title={fieldItem.label}
                      style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                      isMandatory={fieldItem.mandatory}
                    />
                  )
                }
                if (fieldItem?.type === 'checkbox') {
                  return <CheckBox label={fieldItem.label} />
                }
                if (fieldItem?.type === 'attachFile') {
                }
              })}
            </View>
          )}
          {item?.type === 'model' ? (
            <Button
              label={item.buttonText}
              onPress={() =>
                setModalFields({
                  isModelVisible: true,
                  items: item?.modelFields,
                  title: item?.title,
                  direction: item?.direction || 'row',
                })
              }
              labelColors={colors.white}
            />
          ) : null}
        </View>
      )
    })
  }
}

const CommonFromContainer = ({
  item,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  toggleDropdown,
}) => {
  const { colors } = useTheme()
  return item.fields?.map((field, fieldIndex) => {
    if (field?.type === 'description') {
      return (
        <Text variant="body2" style={{ maxWidth: '80%' }}>
          {field?.label}
        </Text>
      )
    } else if (field?.type === 'image') {
      return (
        <Image
          source={universityLogo}
          style={{ height: 102, width: 302 }}
          resizeMode="contain"
        />
      )
    } else if (field?.type === 'checkbox') {
      return <CheckBox label={field.label} />
    } else {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {field.dropdown.map((dropdownField, dropdownIndex) => {
            return (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  {dropdownField.mandatory ? (
                    <Text variant="display5" color={colors.onAlert}>
                      *{' '}
                    </Text>
                  ) : null}
                  <Text variant="display4">{dropdownField.label}</Text>
                </View>
                <DropDown
                  toggleDropdown={toggleDropdown}
                  dropdownWidth={dropdownWidth}
                  items={dropdownField.pickListValues}
                  position={{ top: dropdownTop, left: dropdownLeft }}
                />
              </View>
            )
          })}
        </View>
      )
    }
  })
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
      disabled={index > 3}
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
