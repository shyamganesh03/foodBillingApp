import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '../../components'
import DesktopView from './DesktopView'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from '../../utils/fields'
import { useDropDownData } from '../../hooks/useDropDownData'

const Registration = () => {
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropDownWidth] = useState(0)
  const [modalFields, setModalFields] = useState({
    isModelVisible: false,
    direction: 'row',
    title: '',
    items: [],
  })
  const [activeTab, setActiveTab] = useState(0)
  const [tabItems, setTabItems] = useState([])
  const [formData, setFormData] = useState(fieldData)
  const isFocused = useIsFocused()

  const toggleDropdown = (visible, ref) => {
    if (visible) {
      return
    }
    if (!visible) {
      ref?.current?.measure((_fx, _fy, _w, _h, _px, py) => {
        setDropdownTop(py + 38)
        setDropdownLeft(_px)
        setDropDownWidth(_w)
      })
    }
  }

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      const tabsTitle = Object.keys(fieldData)
      const tabs = tabsTitle.map((item) => {
        return { title: fieldData[item]?.title }
      })
      setTabItems(tabs)
    })()
  }, [isFocused])

  const getDropdownData = (fieldValue) => {
    const values = fieldValue?.pickListValues || fieldValue?.dropdownValues
    if (values.length > 0) {
      return values
    } else {
      const { dropdownValue } = useDropDownData({
        dropDownName: fieldValue?.name,
      })
      return dropdownValue
    }
  }

  const handleValueChanged = ({
    type,
    selectedValue,
    step,
    fieldIndex,
    sectionIndex,
    fieldName = 'fields',
  }) => {
    const value =
      type === 'PickList' || type === 'dropdown'
        ? selectedValue.name
        : selectedValue
    const copyFormData = formData
    const currentField =
      copyFormData[step]?.sections[sectionIndex]?.[fieldName]?.[fieldIndex]
    const newCurrentField = { ...currentField, selectedValue: value }
    const newFieldsArray =
      copyFormData[step]?.sections[sectionIndex]?.[fieldName]
    newFieldsArray[fieldIndex] = newCurrentField
    const newSections = copyFormData[step]?.sections
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      [fieldName]: newFieldsArray,
    }
    const newStepData = { ...copyFormData[step], sections: newSections }
    const updatedFieldData = { ...copyFormData, [step]: newStepData }
    setFormData(updatedFieldData)
  }

  const viewProps = {
    activeTab,
    dropdownLeft,
    dropdownTop,
    dropdownWidth,
    formData,
    modalFields,
    tabItems,
    handleValueChanged,
    getDropdownData,
    setActiveTab,
    setModalFields,
    toggleDropdown,
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Registration
