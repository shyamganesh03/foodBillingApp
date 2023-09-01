import { View, Modal } from 'react-native'
import React from 'react'
import Text from '../Text'
import DropDown from '../DropDown'
import TextInput from '../TextInput'
import DateInput from '../DateInput'
import { useTheme } from '@react-navigation/native'
import Divider from '../Divider'
import Button from '../Button'

const ModelComponent = ({
  data,
  handleCloseModel = () => {},
  handleValueChanged,
  getDropdownData,
  dropdownLeft,
  dropdownTop,
  dropdownWidth,
  toggleDropdown,
}) => {
  const { colors } = useTheme()
  return (
    <Modal
      visible={data.isModelVisible}
      transparent
      onBackdropPress={() => handleCloseModel()}
      onRequestClose={() => {
        handleCloseModel()
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(107,106,106, 0.6)',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
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
            {data?.items?.map((fieldItem, fieldIndex) => {
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
                      position={{ top: dropdownTop, left: dropdownLeft }}
                      onPress={(selectedValue) =>
                        handleValueChanged({
                          selectedValue: selectedValue,
                          type: fieldItem.type,
                          fieldName: 'modelFields',
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
                    hasFullWidth={data?.direction !== 'row'}
                    style={{ marginHorizontal: isCenter === 0 ? 20 : 0 }}
                    onChangeText={(value) => {
                      handleValueChanged({
                        selectedValue: value,
                        type: fieldItem.type,
                        fieldName: 'modelFields',
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
                        fieldName: 'modelFields',
                        step,
                        fieldIndex,
                        sectionIndex,
                      })
                    }
                  />
                )
              }
            })}
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: 16,
              paddingHorizontal: 16,
            }}
          >
            <Button
              label="cancel"
              appearance="outline"
              onPress={() => handleCloseModel()}
            />
            <Button
              label="save"
              buttonStyle={{ marginLeft: 10 }}
              onPress={() => handleCloseModel()}
              labelColors={colors.white}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModelComponent
