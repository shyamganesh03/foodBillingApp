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
  const [showLoader, setShowLoader] = useState(false)
  const [isCTADisabled, setIsCTADisabled] = useState()
  const [containerWidth, setContainerWidth] = useState()
  const [hasError, setHasError] = useState()
  const containerRef = useRef()
  const paramsData = props.route.params
  const isFocused = useIsFocused()

  const { data, refetch } = useQuery({
    queryKey: 'getApplicationData',
    queryFn: async () => {
      const formDataCopy = { ...formData }
      const responseData = await getApplicationByEmailID({
        email: paramsData?.email,
      })

      for (const step in formDataCopy) {
        if (formDataCopy.hasOwnProperty(step)) {
          const sections = formDataCopy[step]?.sections
          if (sections) {
            for (const section of sections) {
              const fields = section?.fields
              if (section.type === 'model') {
                const transformedData = {}

                if (responseData[section.fieldName]?.length > 0) {
                  responseData[section.fieldName].forEach((item) => {
                    for (const key in item) {
                      if (!transformedData[key]) {
                        transformedData[key] = []
                      }
                      transformedData[key].push(item[key])
                    }
                  })

                  const maxValue = Math.max(
                    ...Object.values(transformedData).map(
                      (value) => value.length,
                    ),
                  )
                  const empty = Array.from({ length: maxValue }, () => ({
                    title: 'empty',
                  }))

                  section.modelFieldValues = { ...transformedData, empty }
                }
              } else if (fields) {
                fields.forEach((field) => {
                  const fieldName = field?.fieldName || ''
                  if (fieldName in responseData) {
                    field.selectedValue = responseData[fieldName]
                  }
                })
              }
            }
          }
        }
      }

      setFormData(formDataCopy)
      return responseData
    },
    enabled: !!paramsData?.email,
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
    // Reset modalFields.
    setModalFields({
      isModelVisible: false,
      items: [],
      title: '',
      direction: 'row',
      sectionIndex: -1,
    })

    // set loader true
    setShowLoader(true)

    // Create an initial payload object with the email field.
    let payload = { email: paramsData?.email }

    // Iterate through the sections in submittedData.
    submittedData.sections.forEach((section) => {
      // Initialize a variable to store the emergency contact full name.
      let fullName = ''

      // Check if the section has fields.
      if (section.fields?.length > 0) {
        section.fields.forEach((field) => {
          // Check if the field has a fieldName.
          if (field?.fieldName) {
            // Handle emergency contact fields.
            if (
              field.fieldName === 'emergencyContactFirstName' ||
              field.fieldName === 'emergencyContactLastName'
            ) {
              fullName = `${fullName} ${field.selectedValue || ''}`.trim()
              payload['emergencyContactFullName'] = fullName
            }

            // Handle PickList or dropdown fields.
            if (field.type === 'PickList' || field.type === 'dropdown') {
              payload[field.fieldName] =
                field.selectedValue?.name || field.selectedValue
            } else {
              payload[field.fieldName] = field.selectedValue || ''
            }
          }
        })
      } else {
        // Handle sections with selectedValue (assumed to be an array).
        if (!!section.selectedValue) {
          payload = {
            ...payload,
            [section.fieldName]: [
              ...(data[section.fieldName] || []),
              section.selectedValue,
            ],
          }
        }
      }
    })
    if (type === 'initial') {
      const initialPayload = {
        ...payload,
        email: paramsData?.email,
        firstName: paramsData?.firstName,
        lastName: paramsData?.lastName,
        countryCode: paramsData?.countryCode,
        phoneNumber: paramsData?.phoneNumber,
        country: paramsData?.country,
        programme: paramsData?.programme,
      }
      let selectedSchoolValue = []
      formData.step0.sections[formData.step0.sections.length - 1].fields.map(
        (fields) => {
          selectedSchoolValue.push(
            fields.selectedValue || fields.selectedValue.name,
          )
        },
      )
      const duplicateValueCheck = new Set(selectedSchoolValue)
      if (duplicateValueCheck.size !== selectedSchoolValue.length) {
        setHasError(true)
        setShowLoader(false)
        return
      }
      if (!data?.email) {
        await submitApplication(initialPayload)
        setShowLoader(false)
        return
      }
    }
    // Update the application with the payload.
    await updateApplication(payload)

    // If it's a 'Submit' type, submit the application with the submitPayload.
    if (type === 'Submit') {
      // Define a submitPayload object for 'Submit' type.
      const submitPayload = {
        firstName: formData.step1.sections[0].fields[0].selectedValue || '',
        lastName: formData.step1.sections[0].fields[2].selectedValue || '',
        phoneNumber: formData.step1.sections[1].fields[1].selectedValue || '',
        email: paramsData?.email,
        canTextToMobile:
          formData.step1.sections[1].fields[8].selectedValue || '',
        firstChoiceSchool:
          formData.step0.sections[1].fields[0].selectedValue || '',
      }
      await submitApplication(submitPayload)
    } else {
      // Handle 'saveAndNext' and other types.
      if (type === 'saveAndNext') {
        setActiveTab(activeTab + 1)
      }
    }
    // refetch updated Data
    refetch()

    // set loader false
    setShowLoader(false)
  }

  const handleValueChanged = ({
    type,
    selectedValue,
    step,
    fieldIndex,
    sectionIndex,
    fieldName = 'fields',
  }) => {
    setHasError(false)
    const currentSection = formData[step]?.sections[sectionIndex]
    if (type === 'cancel') {
      currentSection.selectedValue = ''
      const updatedFieldData = {
        ...formData,
        [step]: {
          ...formData[step],
          sections: [
            ...formData[step]?.sections.slice(0, sectionIndex),
            { ...currentSection },
            ...formData[step]?.sections.slice(sectionIndex + 1),
          ],
        },
      }
      setFormData(updatedFieldData)
      return ''
    }
    if (currentSection) {
      const currentField = currentSection[fieldName]?.[fieldIndex]

      if (currentSection.type === 'model') {
        const newData = currentSection[fieldName]?.reduce((acc, item) => {
          if (currentSection.selectedValue?.[item.fieldName]) {
            return { ...acc, [item.fieldName]: item.fieldName }
          }
          return { ...acc, [item.fieldName]: '' }
        }, {})
        const data = {
          ...newData,
          [currentField.fieldName]: selectedValue.name || selectedValue,
        }
        currentSection.selectedValue = {
          ...currentSection.selectedValue,
          ...data,
        }
      } else {
        const newFieldsArray = [...currentSection[fieldName]]
        newFieldsArray[fieldIndex] = {
          ...currentField,
          selectedValue: selectedValue.name || selectedValue,
        }

        currentSection[fieldName] = newFieldsArray
      }

      const updatedFieldData = {
        ...formData,
        [step]: {
          ...formData[step],
          sections: [
            ...formData[step]?.sections.slice(0, sectionIndex),
            { ...currentSection },
            ...formData[step]?.sections.slice(sectionIndex + 1),
          ],
        },
      }
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
    containerRef,
    containerWidth,
    dropdownLeft,
    dropdownTop,
    dropdownWidth,
    formData,
    hasError,
    isCTADisabled,
    modalFields,
    showLoader,
    tabItems,
    getContainerWidth,
    getCTAStatus,
    getDropdownData,
    getValidatedData,
    handleSave,
    handleValueChanged,
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
