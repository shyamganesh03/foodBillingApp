import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'
import { spacing } from '@libs/theme'
import Text from '../Text'

const CheckBox = ({
  filtersApplied,
  itemIndex,
  field,
  label,
  value,
  labelColor,
  labelStyle,
  handleCheck,
  programId,
  style = {},
  selectedProgrammes,
}) => {
  const [isChecked, setIsChecked] = useState()
  useEffect(() => {
    const filedName = field?.charAt(0).toUpperCase() + field?.slice(1)
    if (
      (field && filtersApplied[filedName]?.values?.includes(label)) ||
      selectedProgrammes?.includes(programId)
    ) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [filtersApplied, programId])

  const { colors } = useTheme()
  return (
    <TouchableOpacity
      onPress={() => {
        setIsChecked(!isChecked)
        handleCheck(isChecked, field, label, value)
      }}
      style={[styles(colors).checkBoxContainer, style]}
      key={itemIndex}
    >
      <View
        style={[
          styles(colors).checkBox,
          { backgroundColor: isChecked ? colors.primary : 'transparent' },
        ]}
      >
        {isChecked && <Icon name="Check" color={colors.white} />}
      </View>
      <Text
        variant="display4"
        color={labelColor}
        style={[styles(colors).labelStyle, labelStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
      borderRadius: 1,
      alignItems: 'center',
    },
    checkBoxContainer: {
      flexDirection: 'column-reverse',
      paddingVertical: spacing.spacing3,
    },
    labelStyle: {
      maxWidth: '80%',
    },
  })
export default CheckBox
