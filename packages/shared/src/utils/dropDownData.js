import { useDropDownData } from '../hooks/useDropDownData'

export const getDropdownData = (fieldValue) => {
  const values = fieldValue?.pickListValues || fieldValue?.dropdownValues
  if (values.length > 0) {
    return values
  } else {
    const { dropdownValue } = useDropDownData({
      dropDownName: fieldValue?.lookUpName,
    })
    return dropdownValue
  }
}
