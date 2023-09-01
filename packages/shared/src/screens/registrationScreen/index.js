import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '../../components'
import DesktopView from './DesktopView'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from '../../utils/fields'
import { useDropDownData } from '../../hooks/useDropDownData'
import {
  getApplicationByEmailID,
  submitApplication,
  updateApplication,
} from '../../api'
import { useQuery } from '@tanstack/react-query'

const Registration = (props) => {
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropDownWidth] = useState(0)
  const [modalFields, setModalFields] = useState({
    isModelVisible: false,
    direction: 'row',
    title: '',
    items: [],
    sectionIndex: -1,
  })
  const [activeTab, setActiveTab] = useState(0)
  const [tabItems, setTabItems] = useState([])
  const [formData, setFormData] = useState(fieldData)
  const [isCTADisabled, setIsCTADisabled] = useState()
  const [containerWidth, setContainerWidth] = useState()
  const containerRef = useRef()
  const emailID = props.route.params?.emailId || 'sindhu@gmail.com'
  const isFocused = useIsFocused()

  const { data } = useQuery({
    queryKey: 'getApplicationData',
    queryFn: async () => {
      const formDataCopy = { ...formData }
      const responseData = await getApplicationByEmailID({ email: emailID })
      for (const step in formDataCopy) {
        if (formDataCopy.hasOwnProperty(step)) {
          const sections = formDataCopy[step].sections
          if (sections) {
            for (const section of sections) {
              const fields = section.fields
              if (section.type === 'model') {
                const transformedData = {}
                let newTransformedData = {}
                if (responseData[section?.fieldName]?.length > 0) {
                  for (const item of responseData[section.fieldName]) {
                    for (const key in item) {
                      if (!transformedData[key]) {
                        transformedData[key] = []
                      }
                      transformedData[key].push(item[key])
                    }
                  }
                  let maxValue = 0
                  Object.entries(transformedData).map(([key, value]) => {
                    if (value.length > maxValue) {
                      maxValue = value.length
                    }
                  })
                  const empty = []
                  newTransformedData = { ...transformedData, empty }

                  for (let initial = 0; initial <= maxValue - 1; initial++) {
                    newTransformedData['empty'].push({ title: 'empty' })
                  }
                }
                section.modelFieldValues = newTransformedData
              } else if (fields) {
                for (const field of fields) {
                  const fieldName = field?.fieldName || ''
                  if (fieldName in responseData) {
                    field.selectedValue = responseData[fieldName]
                  }
                }
              }
            }
          }
        }
      }
      setFormData(formDataCopy)
      return responseData
    },
    enabled: !!emailID,
    initialData: [],
  })

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

  const getContainerWidth = () => {
    if (containerRef.current) {
      containerRef.current.measure((_fx, _fy, _w, _h, _px, _py) => {
        setContainerWidth(_w)
      })
    }
  }

  function processFields(fields, sectionTitle, mandatoryFields) {
    for (const field of fields) {
      if (field?.mandatory && field?.selectedValue === '') {
        // Field is mandatory and has no selected value
        if (!mandatoryFields[sectionTitle]) {
          mandatoryFields[sectionTitle] = []
        }
        mandatoryFields[sectionTitle].push({ label: field?.label })
      }
    }
  }

  const getValidatedData = () => {
    const formCopy = formData
    let mandatoryFields = {}
    for (const stepKey in formCopy) {
      const step = formCopy[stepKey]

      // Iterate through sections in the step
      for (const section of step.sections) {
        if (section.fields) {
          // If section has "fields" property, process those fields
          processFields(section.fields, step.title, mandatoryFields)
        }
        if (section.modelFields) {
          // If section has "modelFields" property, process those fields
          processFields(section.modelFields, step.title, mandatoryFields)
        }
      }
    }
    const keys = Object.keys(mandatoryFields)
    if (keys.length > 0) {
      setIsCTADisabled(true)
    } else {
      setIsCTADisabled(false)
    }
    return mandatoryFields
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

  const handleSave = async (submittedData, type) => {
    let payload = { email: emailID }
    submittedData.sections.forEach((section) => {
      let fullName = ''
      if (section.fields?.length > 0) {
        section.fields?.forEach((fields) => {
          if (fields?.fieldName) {
            if (
              fields?.fieldName === 'emergencyContactFirstName' ||
              fields?.fieldName === 'emergencyContactLastName'
            ) {
              fullName = fullName + ' ' + fields?.selectedValue
              payload['emergencyContactFullName'] = fullName.trim()
            }
            if (fields?.type === 'PickList' || fields?.type === 'dropdown') {
              const hasKey = Object.keys(fields?.selectedValue)
              if (hasKey.length === 1) {
                payload[fields?.fieldName] = fields?.selectedValue.name
              } else {
                payload[fields?.fieldName] = fields?.selectedValue || ''
              }
            } else {
              payload[fields?.fieldName] = fields?.selectedValue || ''
            }
          }
        })
      } else {
        if (!!section.selectedValue) {
          const previousData = data
          previousData[section.fieldName].push(section.selectedValue)
          payload = { ...payload, ...previousData }
        }
      }
    })
    if (type === 'Submit') {
      const submitPayload = {
        firstName: formData.step1.sections[0].fields[0].selectedValue,
        lastName: formData.step1.sections[0].fields[2].selectedValue,
        phoneNumber: formData.step1.sections[1].fields[1].selectedValue,
        email: emailID,
        canTextToMobile: formData.step1.sections[1].fields[8].selectedValue,
        firstChoiceSchool: formData.step0.sections[1].fields[0].selectedValue,
      }
      await updateApplication(payload)
      await submitApplication(submitPayload)
    } else {
      await updateApplication(payload)
      if (type === 'saveAndNext') {
        setActiveTab(activeTab + 1)
      }
    }
    setModalFields({
      isModelVisible: false,
      items: [],
      title: '',
      direction: 'row',
      sectionIndex: -1,
    })
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

    if (copyFormData[step]?.sections[sectionIndex].type === 'model') {
      let newData = {}
      copyFormData[step]?.sections[sectionIndex]?.[fieldName]?.map((item) => {
        const newFields = {
          [item.fieldName]: '',
        }
        newData = { ...newData, ...newFields }
      })
      const data = {}
      Object.entries(newData).map(([key, emptyValue]) => {
        if (key === currentField.fieldName) {
          data[key] = value
        }
      })
      const currentData =
        copyFormData[step]?.sections[sectionIndex]?.selectedValue
      copyFormData[step].sections[sectionIndex].selectedValue = {
        ...currentData,
        ...data,
      }
      setFormData(copyFormData)
    } else {
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
  }

  const getCTAStatus = (tabIndex) => {
    if (
      (isCTADisabled ||
        !formData.step6.sections[0].fields[0].selectedValue ||
        !formData.step6.sections[0].fields[1].selectedValue) &&
      tabIndex === 6
    ) {
      return true
    } else return false
  }

  const viewProps = {
    activeTab,
    dropdownLeft,
    dropdownTop,
    dropdownWidth,
    formData,
    modalFields,
    containerRef,
    containerWidth,
    tabItems,
    isCTADisabled,
    handleSave,
    handleValueChanged,
    getCTAStatus,
    getValidatedData,
    getContainerWidth,
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
