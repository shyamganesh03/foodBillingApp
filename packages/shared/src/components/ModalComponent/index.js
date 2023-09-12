import { View, Modal } from 'react-native'
import React from 'react'
import DropDown from '../DropDown'
import DateInput from '../DateInput'
import { useTheme } from '@react-navigation/native'
import { Divider, Button, Text, TextInput } from '@libs/components'

const ModalComponent = ({
  hasError,
  formData,
  isEditMode,
  data,
  handleCloseModal = () => {},
  handleSave = () => {},
  handleValueChanged,
  getDropdownData,
  step,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  toggleDropdown,
}) => {
  const { colors } = useTheme()
  return (
    <Modal
      visible={data.isModalVisible}
      transparent
      onBackdropPress={() =>
        handleCloseModal({
          type: 'cancel',
          step,
          sectionIndex: data.sectionIndex,
        })
      }
      onRequestClose={() => {
        handleCloseModal({
          type: 'cancel',
          step,
          sectionIndex: data.sectionIndex,
        })
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(107,106,106, 0.6)',
          position: 'relative',
          alignItems: 'center',
          paddingTop: '10%',
        }}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: colors.white,
            width: '74%',
            paddingBottom: 16,
          }}
        >
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Text variant="display1">{data?.title}</Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: data?.direction,
              flex: 1,
              flexWrap: 'wrap',
              padding: 16,
              position: 'relative',
            }}
          >
            {data.sectionIndex !== -1
              ? formData[step]?.sections[data.sectionIndex]?.modalFields?.map(
                  (fieldItem, fieldIndex) => {
                    const isCenter =
                      data?.direction === 'row' ? (fieldIndex + 2) % 3 : -1
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
                            error={fieldItem.error || ''}
                            dropdownWidth={dropdownWidth}
                            isEditMode={isEditMode}
                            items={getDropdownData(fieldItem)}
                            position={{ top: dropdownTop, left: dropdownLeft }}
                            onPress={(selectedValue) =>
                              handleValueChanged({
                                selectedValue: selectedValue,
                                type: fieldItem.type,
                                fieldName: 'modalFields',
                                step,
                                fieldIndex,
                                sectionIndex: data.sectionIndex,
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
                          error={fieldItem.error || ''}
                          hasFullWidth={data?.direction !== 'row'}
                          isEditMode={isEditMode}
                          style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                          value={fieldItem.selectedValue}
                          onChangeText={(value) => {
                            handleValueChanged({
                              selectedValue: value,
                              type: fieldItem.type,
                              fieldName: 'modalFields',
                              step,
                              fieldIndex,
                              sectionIndex: data.sectionIndex,
                            })
                          }}
                        />
                      )
                    }
                    if (fieldItem.type === 'date') {
                      return (
                        <DateInput
                          title={fieldItem.label}
                          value={fieldItem.selectedValue}
                          error={fieldItem.error || ''}
                          style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                          isMandatory={fieldItem.mandatory}
                          isEditMode={isEditMode}
                          isModal
                          onChangeText={(selectedDate) =>
                            handleValueChanged({
                              selectedValue: selectedDate,
                              type: fieldItem.type,
                              fieldName: 'modalFields',
                              step,
                              fieldIndex,
                              sectionIndex: data.sectionIndex,
                            })
                          }
                        />
                      )
                    }
                  },
                )
              : null}
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: data?.error ? 'space-between' : 'flex-end',
            }}
          >
            {data?.error && (
              <Text
                variant="body2"
                style={{ marginTop: 20, paddingLeft: 12 }}
                color={colors.onAlert}
              >
                {data?.error}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 16,
                paddingHorizontal: 16,
              }}
            >
              <Button
                label="Cancel"
                appearance="outline"
                onPress={() =>
                  handleCloseModal({
                    type: 'cancel',
                    step,
                    sectionIndex: data.sectionIndex,
                  })
                }
              />
              <Button
                label="Save"
                buttonStyle={{ marginLeft: 10 }}
                onPress={() => handleSave()}
                labelColors={colors.white}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalComponent
