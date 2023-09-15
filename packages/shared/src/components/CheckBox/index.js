import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'
import { spacing } from '@libs/theme'
import { Text } from '@libs/components'

const CheckBox = ({
  isEditMode,
  checkedStatus,
  field,
  handleWidth = () => {},
  handleCheck,
  itemIndex,
  label,
  labelColor,
  labelStyle,
  style = {},
  value,
}) => {
  const [isChecked, setIsChecked] = useState()

  useEffect(() => {
    if (checkedStatus) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [checkedStatus])

  useEffect(() => {
    handleWidth()
  }, [])

  const { colors } = useTheme()
  return (
    <View style={[styles(colors).checkBoxContainer, style]} key={itemIndex}>
      <TouchableOpacity
        onPress={() => {
          setIsChecked(!isChecked)
          handleCheck(!isChecked, field, label, value)
        }}
        style={[
          styles(colors).checkBox,
          {
            backgroundColor: isChecked ? colors.primary : '#FFFFFF',
          },
        ]}
        // disabled={!isEditMode}
      >
        {isChecked && <Icon name="Check" color={colors.white} />}
      </TouchableOpacity>
      <Text
        variant="display4"
        color={labelColor}
        style={[styles(colors).labelStyle, labelStyle]}
      >
        {label}
      </Text>
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    checkBox: {
      width: 20,
      height: 20,
      backgroundColor: props.white,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: props.fieldBorder,
      borderRadius: 4,
      alignItems: 'center',
      marginRight: 20,
    },
    checkBoxContainer: {
      flexDirection: 'row',
      paddingVertical: spacing.spacing3,
      marginBottom: 20,
    },
    labelStyle: {
      // marginLeft: 2,
    },
  })
export default CheckBox
