import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import DesktopView from './DesktopView'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { fieldData } from '../../utils/fields'
import { useDropDownData } from '../../hooks/useDropDownData'
import {
  useFormValueChanged,
  useModalValueChanged,
} from '../../hooks/useHandleValueChanged'
import {
  deleteDocument,
  deleteListItem,
  getApplicationByEmailID,
  getApplicationByID,
  getApplicationDetailsByID,
  getApplicationFileByID,
  getDropdownValue,
  uploadFile,
} from '../../api'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@libs/components'
import { getCurrentDate } from '../../utils/dateFunction'
import { useAtom } from 'jotai'
import { studentDetails } from '../../utils/atom'

const Application = (props) => {
  const { setParams } = useParams()
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropDownWidth] = useState(0)
  const [isFileSuccess, setIsFileSuccess] = useState(false)
  const [modalFields, setModalFields] = useState({
    readModeTitle: 'Your Submitted Documents',
    isModalVisible: false,
    direction: 'row',
    title: '',
    items: [],
    sectionIndex: -1,
    error: '',
  })
  const [activeTab, setActiveTab] = useState(0)
  const [tabItems, setTabItems] = useState([])
  const [formData, setFormData] = useState(fieldData)
  const [showLoader, setShowLoader] = useState(false)
  const [isCTADisabled, setIsCTADisabled] = useState()
  const [containerWidth, setContainerWidth] = useState()
  const [isEditMode, setIsEditMode] = useState(true)
  const [validationError, setValidationError] = useState('')
  const containerRef = useRef()
  const paramsData = props.route.params
  const [steps, setSteps] = useState(paramsData?.steps || 0)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute()
  const [, setStudentDetail] = useAtom(studentDetails)

  useEffect(() => {
    if (isEditMode) return

    const programName = formData.step1.sections[0].fields[0]?.selectedValue
    if (!isEditMode && !!programName) {
      navigation.navigate('success', {
        programName: programName,
      })
    }
  }, [isEditMode, formData])

  useEffect(() => {
    if (!isFocused) return
    const steps = route.params?.steps ?? 0
    setSteps(steps)
    setParams({ steps: steps })
  }, [isFocused, route])

  const { data: applicationDetails, isFetching: isApplicationFetching } =
    useQuery({
      queryKey: ['getApplicationDetails'],
      queryFn: async () => {
        const response = await getApplicationByID({
          applicationId: paramsData?.id,
        })
        if (response?.statusCode === 500) {
          setValidationError('* Invalid Application id')
        }
        const formDataCopy = formData
        setStudentDetail({
          gusApplicationId: '',
          email: response.Email__c || paramsData?.email,
          firstName: response.First_Name__c || paramsData?.firstName,
          lastName: response.Last_Name__c || paramsData?.lastName,
        })
        formDataCopy.step1.sections[1].fields[0].selectedValue =
          response.First_Name__c || ''
        formDataCopy.step1.sections[1].fields[2].selectedValue =
          response.Last_Name__c || ''
        formDataCopy.step1.sections[1].fields[0].selectedValue =
          response.First_Name__c
        formDataCopy.step1.sections[0].fields[0].selectedValue =
          response.R3_Picklist__c
        formDataCopy.step6.sections[0].fields[1].selectedValue = getCurrentDate(
          { type: 'string' },
        )

        return response
      },
      enabled: !!paramsData?.id && isFocused,
      initialData: [],
    })

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['getApplicationData'],
    queryFn: async () => {
      const formDataCopy = { ...formData }
      const dropdown = await getDropdownValue({ apiName: 'mailingCountryCode' })
      const responseData = await getApplicationByEmailID({
        email: paramsData?.email || applicationDetails?.Email__c,
      })

      setStudentDetail({
        gusApplicationId: '',
        email: responseData.email || paramsData?.email,
        firstName: responseData.firstName || paramsData?.firstName,
        lastName: responseData.lastName || paramsData?.lastName,
      })
      formDataCopy.step6.sections[0].fields[1].selectedValue = getCurrentDate({
        type: 'string',
      })
      if (responseData.applicationStatus === 'Submitted') {
        setIsEditMode(false)
      }

      for (const step in formDataCopy) {
        if (formDataCopy.hasOwnProperty(step)) {
          const sections = formDataCopy[step]?.sections

          if (sections) {
            for (const section of sections) {
              const fields = section?.fields
              let listIds = []
              if (section.type === 'modal') {
                const transformedData = {}
                if (responseData[section.fieldName]?.length > 0) {
                  responseData[section.fieldName].forEach((item, index) => {
                    listIds.push(item?.id || '')
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
                  section.modalFields.map((item) => {
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
                  section.modalFields.map((item) => {
                    formattedTransformedData = {
                      ...formattedTransformedData,
                      [item?.fieldName]: transformedData[item?.fieldName],
                    }
                  })
                  section.listIDs = listIds
                  section.modalFieldValues = {
                    ...formattedTransformedData,
                    empty,
                  }
                } else {
                  section.modalFieldValues = {}
                }
              } else if (fields) {
                fields.forEach((field) => {
                  const fieldName = field?.fieldName || ''
                  if (fieldName in responseData) {
                    if (fieldName === 'mailingCountryCode') {
                      const selectedData = dropdown?.filter(
                        (item) => item?.Value === responseData[fieldName],
                      )
                      if (selectedData) {
                        field.selectedValue = {
                          name: selectedData[0]?.Label,
                          value: selectedData[0]?.Value,
                        }
                        field.isSave = true
                      } else {
                        field.isSave = false
                      }
                    } else {
                      if (responseData[fieldName]) {
                        field.selectedValue = responseData[fieldName]
                        field.isSave = true
                      } else {
                        field.isSave = false
                      }
                    }
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
    enabled:
      (!!paramsData?.email || !!applicationDetails?.Email__c) && isFocused,
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
          empty,
        }
      }

      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: data?.r3ApplicationId,
      })

      let listIds = []
      response.records?.map((item) => {
        listIds.push(item?.Id || '')
      })
      let result
      if (response.records) {
        // Transform the data
        result = transformData(response.records)
      } else {
        result = {}
      }

      // Update formDataCopy
      const formDataCopy = { ...formData }
      formDataCopy.step5.sections[1] = {
        ...formDataCopy.step5.sections[1],
        listIDs: listIds,
        modalFieldValues: result,
      }
      setFormData(formDataCopy)
      return response.records
    },
    initialData: [],
    enabled: isFocused && !!data?.r3ApplicationId && activeTab === 5,
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
        fields?.modalFieldValues?.length <= 0
      ) {
        processFields(fields?.modalFields, sectionTitle, mandatoryFields)
      }
    } else {
      for (const field of fields) {
        if (
          (field?.mandatory &&
            field?.selectedValue === '' &&
            field?.fieldName !== 'signatureDate') ||
          (field?.selectedValue !== '' && !field.isSave && field?.mandatory)
        ) {
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
          if (section.modalFields) {
            // If section has "modalFields" property, process those fields
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
      const tabsTitle = Object.keys(formData)
      const tabs = tabsTitle.map((item) => {
        return { title: formData[item]?.title }
      })

      setTabItems(tabs)
    })()
  }, [isFocused, formData])

  useEffect(() => {
    setValidationError('')
  }, [isFocused, modalFields, activeTab])

  const getDropdownData = (fieldValue) => {
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

  const handleSave = async (submittedData, type, sessionName, tabIndex) => {
    // let response
    // const isDataValid = useValidation({
    //   step: `step${activeTab}`,
    //   modalFields,
    //   setModalFields,
    //   formData,
    //   validationError,
    //   type,
    //   submittedData,
    //   setFormData,
    //   setValidationError,
    //   sessionName,
    // })
    // if (activeTab === 6 && isCTADisabled) {
    //   if (type === 'TabSaveAndNext' || type === 'initialTab') {
    //     setActiveTab(tabIndex)
    //   }
    //   // Handle 'saveAndNext' and other types.
    //   if (type === 'saveAndNext' || type === 'initial') {
    //     setActiveTab(activeTab + 1)
    //   }
    //   return
    // }
    // if (!isDataValid && activeTab !== 6) {
    //   return
    // }
    // setShowLoader(true)
    // // Reset modalFields.
    // setModalFields({
    //   isModalVisible: false,
    //   items: [],
    //   title: '',
    //   direction: 'row',
    //   sectionIndex: -1,
    //   error: '',
    // })

    // if (type === 'initial' || type === 'initialSave' || type === 'initialTab') {
    //   const initialPayload = {
    //     firstName: paramsData?.firstName || applicationDetails?.First_Name__c,
    //     lastName: paramsData?.lastName || applicationDetails?.Last_Name__c,
    //     phoneNumber:
    //       paramsData?.phoneNumber ||
    //       applicationDetails?.Phone_Number_Emergency__c,
    //     email: paramsData?.email || applicationDetails?.Email__c,
    //     gusApplicationId: paramsData?.id,
    //     universityOrCollegeInfo: [],
    //     AAMCMCATReporting: [],
    //     clinicalOrHospitalExperienceDetails: [],
    //     researchExperience: [],
    //     recommenders: [],
    //     firstChoiceSchool: submittedData.sections[1].fields[0]?.selectedValue,
    //     secondChoiceSchool: submittedData.sections[1].fields[1]?.selectedValue,
    //     thirdChoiceSchool: submittedData.sections[1].fields[2]?.selectedValue,
    //     isCommonApplication: submittedData.sections[0].fields[2]?.selectedValue,
    //     applicationStatus: 'In Progress',
    //   }
    //   response = await useInitialForm({
    //     userData: data,
    //     initialPayload,
    //     formData,
    //   })
    //   if (response?.message?.[0]?.message) {
    //     setValidationError(`* ${response?.message?.[0]?.message}`)
    //     setShowLoader(false)
    //     return
    //   }
    // }

    // if (type === 'Submit') {
    //   const updateResponse = await useFormSave({
    //     submittedData,
    //     email: paramsData?.email || applicationDetails?.Email__c,
    //     applicationStatus: 'Submitted',
    //   })
    //   if (updateResponse?.message[0]?.message) {
    //     setValidationError(`* ${updateResponse?.message[0]?.message}`)
    //     setShowLoader(false)
    //     return
    //   }
    //   setShowLoader(false)
    //   return navigation.navigate('success', {
    //     programName: formData.step1.sections[0].fields[0]?.selectedValue || '',
    //   })
    // }
    // if (type === 'modalSave') {
    //   response = await useModalSave({
    //     email: paramsData?.email || applicationDetails?.Email__c,
    //     submittedData,
    //     sessionName,
    //   })
    //   if (response?.message[0]?.message) {
    //     setValidationError(`* ${response?.message[0]?.message}`)
    //     setShowLoader(false)
    //     return
    //   }
    //   // refetch updated Data
    //   await refetch()
    //   const sections = submittedData.sections
    //   let sectionIndex = -1
    //   for (let i = 0; i < sections.length; i++) {
    //     if (sections[i].title === sessionName) {
    //       sectionIndex = i // Update the index if the title matches
    //       break // Exit the loop when the first match is found
    //     }
    //   }

    //   const currentSection =
    //     formData[`step${activeTab}`]?.sections[sectionIndex]
    //   currentSection.selectedValue = ''
    //   currentSection?.modalFields?.map((fieldValues) => {
    //     fieldValues.selectedValue = ''
    //     fieldValues.error = {}
    //   })
    //   const updatedFieldData = {
    //     ...formData,
    //     [`step${activeTab}`]: {
    //       ...formData[`step${activeTab}`],
    //       sections: [
    //         ...formData[`step${activeTab}`]?.sections.slice(0, sectionIndex),
    //         { ...currentSection },
    //         ...formData[`step${activeTab}`]?.sections.slice(sectionIndex + 1),
    //       ],
    //     },
    //   }
    //   setFormData(updatedFieldData)

    //   // Reset modalFields.
    //   setModalFields({
    //     isModalVisible: false,
    //     items: [],
    //     title: '',
    //     direction: 'row',
    //     sectionIndex: -1,
    //     error: '',
    //   })
    //   setShowLoader(false)
    //   return
    // }

    // // Update the application with the payload.
    // response = await useFormSave({
    //   submittedData,
    //   email: paramsData?.email || applicationDetails?.Email__c,
    // })

    // if (response?.message[0]?.message) {
    //   setValidationError(`* ${response?.message[0]?.message}`)
    //   setShowLoader(false)

    //   return
    // }

    // if (type === 'TabSaveAndNext' || type === 'initialTab') {
    //   setActiveTab(tabIndex)
    // }

    // // Handle 'saveAndNext' and other types.
    // if (type === 'saveAndNext' || type === 'initial') {
    //   setActiveTab(activeTab + 1)
    // }

    // // refetch updated Data
    // await refetch()
    // set loader false
    setShowLoader(false)
  }

  const handleDelete = async ({ index, allData }) => {
    setShowLoader(true)
    if (allData?.hasAttachments) {
      await deleteDocument({ id: allData?.listIDs[index] })
      await refetchDocument()
    } else {
      const payload = {
        email: paramsData?.email || applicationDetails?.Email__c,
        type: allData?.fieldName,
        id: allData?.listIDs[index],
      }
      await deleteListItem(payload)
      await refetch()
    }

    setShowLoader(false)
  }

  const getCTAStatus = (tabIndex) => {
    if (
      (isCTADisabled ||
        !formData?.step6?.sections[0]?.fields[0]?.selectedValue ||
        !formData?.step6?.sections[0]?.fields[1]?.selectedValue) &&
      tabIndex === 6
    ) {
      return true
    } else return false
  }

  const uploadDocs = async (fileData) => {
    await uploadFile({
      ...fileData,
      applicationId: data?.r3ApplicationId,
    })
    await refetchDocument()
    setIsFileSuccess(true)
  }

  const handleValueChanged = ({
    type,
    selectedValue,
    step,
    fieldIndex,
    sectionIndex,
  }) => {
    setValidationError('')
    if (type === 'cancel') {
      const currentSection = formData[step]?.sections[sectionIndex]
      currentSection.selectedValue = ''
      currentSection?.modalFields?.map((fieldValues) => {
        fieldValues.selectedValue = ''
        fieldValues.error = {}
      })
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
    let newData
    if (type === 'form') {
      newData = useFormValueChanged({
        formData,
        selectedValue,
        step,
        fieldIndex,
        sectionIndex,
      })
    } else {
      newData = useModalValueChanged({
        formData,
        selectedValue,
        step,
        fieldIndex,
        sectionIndex,
      })
    }
    setFormData(newData)
  }

  const viewProps = {
    steps,
    isFileSuccess,
    activeTab,
    containerRef,
    containerWidth,
    isEditMode,
    dropdownLeft,
    dropdownTop,
    dropdownWidth,
    formData,
    validationError,
    isCTADisabled,
    modalFields,
    showLoader:
      showLoader || isFetching || isDocumentFetching || isApplicationFetching,
    tabItems: isEditMode ? tabItems : tabItems.slice(0, tabItems.length - 1),
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
    setIsFileSuccess,
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
