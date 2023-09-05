import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import { useIsFocused } from '@react-navigation/native'
import { fieldData } from '../../utils/fields'
import { useDropDownData } from '../../hooks/useDropDownData'
import {
  deleteListItem,
  getApplicationByEmailID,
  getApplicationByID,
  getApplicationDetailsByID,
  getApplicationFileByID,
  submitApplication,
  updateApplication,
  uploadFile,
} from '../../api'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@libs/components'

const Application = (props) => {
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
  const [hasError, setHasError] = useState({
    errorMessage1: '',
    errorMessage2: '',
  })
  const containerRef = useRef()
  const { id } = props.route.params
  const paramsData = props.route.params
  const isFocused = useIsFocused()

  const { data: applicationDetails, isFetching: isApplicationFetching } =
    useQuery({
      queryKey: ['getApplicationDetails'],
      queryFn: async () => {
        const response = await getApplicationByID({
          applicationId: id,
        })
        const formDataCopy = formData
        formDataCopy.step1.sections[1].fields[0].selectedValue =
          response.First_Name__c || ''
        formDataCopy.step1.sections[1].fields[2].selectedValue =
          response.Last_Name__c || ''
        formDataCopy.step1.sections[1].fields[0].selectedValue =
          response.First_Name__c
        return response
      },
      enabled: !!id,
      initialData: [],
    })

  const { data, refetch, isFetching } = useQuery({
    queryKey: 'getApplicationData',
    queryFn: async () => {
      const formDataCopy = { ...formData }
      const responseData = await getApplicationByEmailID({
        email: paramsData?.email || applicationDetails?.Email__c,
      })

      for (const step in formDataCopy) {
        if (formDataCopy.hasOwnProperty(step)) {
          const sections = formDataCopy[step]?.sections
          let listIds = []
          if (sections) {
            for (const section of sections) {
              const fields = section?.fields
              if (section.type === 'model') {
                const transformedData = {}
                if (responseData[section.fieldName]?.length > 0) {
                  responseData[section.fieldName].forEach((item, index) => {
                    listIds.push(item?.id || index.toString())
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
                  let availableTabs = []
                  section.modelFields.map((item) => {
                    availableTabs.push(item?.name)
                  })
                  Object.entries(transformedData).map(([key, value]) => {
                    if (!availableTabs.includes(key)) {
                      delete transformedData[key]
                    }
                    if (value?.length !== maxValue) {
                      const emptyArray = Array.from(
                        { length: maxValue - 1 },
                        () => 'noData',
                      )
                      transformedData[key] = [...value, ...emptyArray]
                    }
                  })
                  let formattedTransformedData = {}
                  section.modelFields.map((item) => {
                    formattedTransformedData = {
                      ...formattedTransformedData,
                      [item?.fieldName]: transformedData[item?.fieldName],
                    }
                  })
                  section.listIDs = listIds //[...new Set(listIds)]
                  section.modelFieldValues = {
                    ...formattedTransformedData,
                    empty,
                  }
                } else {
                  section.modelFieldValues = {}
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
    enabled: !!paramsData?.email || !!applicationDetails?.Email__c,
    initialData: [],
  })

  const {
    data: documentsData,
    refetch: refetchDocument,
    isFetching: isDocumentFetching,
  } = useQuery({
    queryKey: ['getDocuments'],
    queryFn: async () => {
      // Define a function to transform data
      function transformData(entryData) {
        const nameArray = entryData.map((entry) => entry.Title || 'Nodata')
        const typeArray = entryData.map((entry) => entry.FileType || 'NoData')
        const downloadArray = entryData.map((entry) => {
          return { title: 'download' }
        })
        const empty = entryData.map(() => {
          return { title: 'empty' }
        })

        return {
          Name: nameArray,
          Type: typeArray,
          Download: downloadArray,
          empty,
        }
      }

      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: id || 'a00S000000CUiQrIAL',
      })

      // Transform the data
      const result = transformData(response.records)

      // Update formDataCopy
      const formDataCopy = { ...formData }
      formDataCopy.step5.sections[1] = {
        ...formDataCopy.step5.sections[1],
        modelFieldValues: result,
      }
      setFormData(formDataCopy)
      return response.records
    },
    initialData: [],
    enabled: isFocused && !!id,
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

  function processFields(fields, sectionTitle, mandatoryFields, type) {
    if (type === 'modal') {
      if (
        fields.selectedValue === '' &&
        fields?.modelFieldValues?.length <= 0
      ) {
        processFields(fields?.modelFields, sectionTitle, mandatoryFields)
      }
    } else {
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
  }

  const getValidatedData = () => {
    const formCopy = formData
    let mandatoryFields = {}
    for (const stepKey in formCopy) {
      const step = formCopy[stepKey]

      // Iterate through sections in the step
      for (const section of step.sections) {
        if (step.title !== 'Application Submission') {
          if (section.fields) {
            // If section has "fields" property, process those fields
            processFields(section.fields, step.title, mandatoryFields)
          }
          if (section.modelFields) {
            // If section has "modelFields" property, process those fields
            processFields(section, step.title, mandatoryFields, 'modal')
          }
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

  const handleSave = async (submittedData, type, sessionName) => {
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
    let payload = { email: paramsData?.email || applicationDetails?.Email__c }
    let modalPayload

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
              if (!!fullName) payload['emergencyContactFullName'] = fullName
            }

            // Handle PickList or dropdown fields.
            if (field.type === 'PickList' || field.type === 'dropdown') {
              if (!!field.selectedValue?.value) {
                payload[field.fieldName] = field.selectedValue?.value
              } else {
                if (!!field.selectedValue?.name || !!field.selectedValue) {
                  payload[field.fieldName] =
                    field.selectedValue?.name || field.selectedValue
                }
              }
            } else {
              if (!!field.selectedValue) {
                payload[field.fieldName] = field.selectedValue
              }
            }
          }
        })
      }
      if (
        type === 'modalSave' &&
        sessionName === section?.title &&
        section.fieldName
      ) {
        const sectionData = section.selectedValue
        let newSectionDate

        newSectionDate = {
          ...sectionData,
        }

        modalPayload = {
          email: paramsData?.email || !!applicationDetails?.Email__c,
        }
        modalPayload = {
          ...modalPayload,
          [section.fieldName]: [newSectionDate],
        }
      }
    })

    if (type === 'initial' || type === 'initialSave') {
      const initialPayload = {
        ...payload,
        firstName: paramsData?.firstName || applicationDetails?.First_Name__c,
        lastName: paramsData?.lastName || applicationDetails?.Last_Name__c,
        phoneNumber:
          paramsData?.phoneNumber ||
          applicationDetails?.Phone_Number_Emergency__c,
        email: paramsData?.email || applicationDetails?.Email__c,
        gusApplicationId: id,
        universityOrCollegeInfo: [],
        AAMCMCATReporting: [],
        clinicalOrHospitalExperienceDetails: [],
        researchExperience: [],
        recommenders: [],
      }
      let selectedSchoolValue = []
      formData.step0.sections[formData.step0.sections.length - 1].fields.map(
        (fields) => {
          if (fields.selectedValue.name) {
            return selectedSchoolValue.push(fields.selectedValue.name)
          }
          if (fields.selectedValue) {
            return selectedSchoolValue.push(fields.selectedValue)
          }
        },
      )
      const duplicateValueCheck = new Set(
        selectedSchoolValue.filter((item) => item !== undefined),
      )
      if (selectedSchoolValue.length > 1) {
        let errorMessage = {
          errorMessage1: '',
          errorMessage2: '',
        }
        if (duplicateValueCheck.size !== selectedSchoolValue.length) {
          errorMessage = {
            ...errorMessage,
            errorMessage1:
              '* Please select different schools, as some of your chosen options are the same.',
          }
        }
        const checkBox =
          formData.step0.sections[formData.step0.sections.length - 2].fields[2]
            .selectedValue
        if (!checkBox) {
          errorMessage = {
            ...errorMessage,
            errorMessage2: '* Please check the above check box to proceed',
          }
        }
        setHasError(errorMessage)
        setShowLoader(false)
        if (errorMessage.errorMessage1 || errorMessage.errorMessage2) {
          return
        }
      }
      setShowLoader(true)
      if (!data?.email) {
        await submitApplication(initialPayload)
        // refetch updated Data
        await refetch()
        setShowLoader(false)
        if (type !== 'initialSave') setActiveTab(activeTab + 1)
        return
      }
    }
    // Update the application with the payload.
    const updateResponse = await updateApplication(modalPayload || payload)
    if (updateResponse?.message[0]?.message) {
      setHasError({
        ...hasError,
        errorMessage1: `* ${updateResponse?.message[0]?.message}`,
      })
    }
    if (type === 'Submit') {
      // If it's a 'Submit' type, submit the application with the submitPayload.
      // Define a submitPayload object for 'Submit' type.
      const submitPayload = {
        firstName: paramsData?.firstName || applicationDetails?.First_Name__c,
        lastName: paramsData?.lastName || applicationDetails?.Last_Name__c,
        phoneNumber:
          paramsData?.phoneNumber ||
          applicationDetails?.Phone_Number_Emergency__c,
        email: paramsData?.email || applicationDetails?.Email__c,
        canTextToMobile:
          formData.step1.sections[1].fields[8].selectedValue || '',
        firstChoiceSchool:
          formData.step0.sections[1].fields[0].selectedValue ||
          formData.step0.sections[1].fields[0].selectedValue.name ||
          '',
      }
      await submitApplication(submitPayload)
      setShowLoader(false)
    } else {
      // Handle 'saveAndNext' and other types.
      if (type === 'saveAndNext' || type === 'initial') {
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
    setHasError({
      errorMessage1: '',
      errorMessage2: '',
    })
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
            return {
              ...acc,
              [item.fieldName]: currentSection.selectedValue?.[item.fieldName],
            }
          }
          return { ...acc, [item.fieldName]: '' }
        }, {})
        let data
        const number = parseFloat(selectedValue)
        if (
          number &&
          !currentField.fieldName?.toLowerCase().includes('date') &&
          !currentField.fieldName?.toLowerCase().includes('termapplyingfor')
        ) {
          data = {
            ...newData,
            [currentField.fieldName]: number,
          }
        } else {
          data = {
            ...newData,
            [currentField.fieldName]: selectedValue.name || selectedValue,
          }
        }

        currentSection.selectedValue = {
          ...data,
        }
      } else {
        const newFieldsArray = [...currentSection[fieldName]]
        newFieldsArray[fieldIndex] = {
          ...currentField,
          selectedValue:
            selectedValue?.value || !selectedValue.name
              ? selectedValue
              : selectedValue.name,
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

  const handleDelete = async ({ index, allData }) => {
    setShowLoader(true)
    const payload = {
      email: paramsData?.email || applicationDetails?.Email__c,
      type: allData?.fieldName,
      id: allData?.listIDs[index],
    }
    await deleteListItem(payload)
    await refetch()
    setShowLoader(false)
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

  const uploadDocs = async (fileData) => {
    setShowLoader(true)
    await uploadFile({
      ...fileData,
      applicationId: data?.r3ApplicationId,
    })
    await refetchDocument()
    setShowLoader(false)
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
    showLoader:
      showLoader || isFetching || isDocumentFetching || isApplicationFetching,
    tabItems,
    getContainerWidth,
    getCTAStatus,
    getDropdownData,
    getValidatedData,
    handleSave,
    handleValueChanged,
    handleDelete,
    uploadDocs,
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

export default Application
