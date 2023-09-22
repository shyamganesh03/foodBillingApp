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
import { getApplicationByEmailID, getApplicationByID } from '../../api'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@libs/components'
import { useAtom } from 'jotai'
import { applicationProgressDetails, studentDetails } from '../../utils/atom'
import { useDocuments } from '../../hooks/useDocuments'
import {
  documentsFiltered,
  updateMandatoryData,
} from '../../utils/fieldFunction'
import { canNonEmptyObject } from '../../utils/fieldValidation'
import { Platform } from 'react-native'

const Application = (props) => {
  const { setParams } = useParams()
  const [isEditMode, setIsEditMode] = useState(true)
  const paramsData = props.route.params
  const [steps, setSteps] = useState(paramsData?.steps || 0)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute()
  const [studentDetail, setStudentDetail] = useAtom(studentDetails)
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )

  const { data: gusApplicationDetails, isFetching: isApplicationFetching } =
    useQuery({
      queryKey: ['getApplicationDetails'],
      queryFn: async () => {
        const response = await getApplicationByID({
          applicationId: paramsData?.id,
        })

        if (response?.statusCode === 500) {
          return handleNavigation({ type: 'invalidID' })
        }

        setStudentDetail({
          gusApplicationId: paramsData?.id,
          email: response.Email__c || paramsData?.email,
          firstName: response.First_Name__c || paramsData?.firstName,
          lastName: response.Last_Name__c || paramsData?.lastName,
        })

        return response
      },
      enabled: !!paramsData?.id && isFocused,
      initialData: [],
    })

  const {
    data: r3ApplicationDetails,
    refetch,
    isFetching: isR3ApplicationDetails,
  } = useQuery({
    queryKey: ['getApplicationData'],
    queryFn: async () => {
      let updatedMandatoryField = []
      let totalMandatoryField = []
      let mandatoryDataCount = 0

      const responseData = await getApplicationByEmailID({
        gusApplicationId: paramsData?.id,
        email: paramsData?.email || gusApplicationDetails?.Email__c,
      })

      let updatedMandatoryFields = {
        ...applicationProgressDetail.mandatoryFields,
      }
      let totalProgressStatus = { ...applicationProgressDetail.totalProgress }

      Object.entries(responseData).forEach(([key, responseDataItem]) => {
        const fieldKey = Object.keys(updatedMandatoryFields).find(
          (applicationDetailKey) => {
            const applicationFieldData =
              updatedMandatoryFields?.[applicationDetailKey]
            if (Array.isArray(applicationFieldData)) {
              return applicationFieldData.some((item) => item.fieldName === key)
            }
            return false
          },
        )
        if (fieldKey) {
          updatedMandatoryFields[fieldKey] = updatedMandatoryFields[
            fieldKey
          ].map((applicationFieldData, index) => {
            totalMandatoryField.push(applicationFieldData.fieldName)
            if (applicationFieldData.fieldName === key) {
              updatedMandatoryField.push(applicationFieldData.fieldName)
              return {
                ...applicationFieldData,
                isSaved: true,
              }
            }
            return {
              ...applicationFieldData,
            }
          })
        } else {
          const listValues = responseDataItem || []
          if (Array.isArray(listValues)) {
            listValues?.forEach((listValue, listIndex) => {
              let keyName = ''
              if (key === 'universityOrCollegeInfo') {
                keyName = 'University/College_Information'
              }
              if (key === 'researchExperience') {
                keyName = 'Research_Experience'
              }
              if (key === 'AAMCMCATReporting') {
                keyName = 'AAMC-MCAT_Reporting'
              }
              if (key === 'clinicalOrHospitalExperienceDetails') {
                keyName = 'Clinical/Hospital_Experience'
              }
              if (key === 'recommenders') {
                keyName = 'Recommenders'
              }

              let mandatoryFieldDetailCopy =
                updatedMandatoryFields?.[keyName]?.mandatoryFieldDetail || []
              if (mandatoryFieldDetailCopy.length > 0) {
                mandatoryFieldDetailCopy = mandatoryFieldDetailCopy?.map(
                  (mandatoryFieldDetailCopyFields, index) => {
                    totalMandatoryField.push(
                      mandatoryFieldDetailCopyFields?.fieldName,
                    )
                    updatedMandatoryField.push(
                      mandatoryFieldDetailCopyFields.fieldName,
                    )
                    return { ...mandatoryFieldDetailCopyFields, isSaved: true }
                  },
                )
                if (!!updatedMandatoryFields[keyName]) {
                  mandatoryDataCount = 1
                  updatedMandatoryFields[keyName].list = {
                    ...updatedMandatoryFields?.[keyName]?.list,
                    [listIndex]: mandatoryFieldDetailCopy,
                  }
                }
              } else {
                const keys = Object.keys(listValue)
                let finalValue = []
                keys.map((keyName) => {
                  const newValue = { fieldName: keyName, isSaved: true }
                  finalValue.push(newValue)
                })
                updatedMandatoryFields[keyName].list = {
                  ...updatedMandatoryFields?.[keyName]?.list,
                  [listIndex]: finalValue,
                }
              }
            })
          }
        }
      })

      const totalMandatoryFieldCount =
        totalProgressStatus.totalMandatoryFieldCount
      const newSavedFieldCount =
        [...new Set([...updatedMandatoryField])].length + mandatoryDataCount

      totalProgressStatus.savedFieldCount = newSavedFieldCount
      totalProgressStatus.progress = Math.round(
        (newSavedFieldCount / totalMandatoryFieldCount) * 100,
      )

      const updatedApplicationProgressDetail = {
        ...applicationProgressDetail,
        mandatoryFields: updatedMandatoryFields,
        totalProgress: totalProgressStatus,
      }

      setApplicationProgressDetail(updatedApplicationProgressDetail)

      setStudentDetail({
        gusApplicationId: paramsData?.id,
        email: studentDetail.email || responseData.email || paramsData?.email,
        firstName:
          studentDetail.firstName ||
          responseData.firstName ||
          paramsData?.firstName,
        lastName:
          studentDetail.lastName ||
          responseData.lastName ||
          paramsData?.lastName,
      })

      if (responseData.applicationStatus === 'Submitted') {
        setIsEditMode(false)
      }

      return responseData
    },
    enabled:
      (!!paramsData?.email || !!gusApplicationDetails?.Email__c) &&
      isFocused &&
      !!paramsData?.id,
    initialData: [],
  })

  const { data: cvDocument, isFetching: isCVDocumentFetching } = useDocuments({
    queryKey: 'getCVDocuments',
    type: 'CV',
    enabled: isFocused && !!r3ApplicationDetails?.PK && isEditMode,
  })
  const { data: applicantPhoto, isFetching: isApplicantPhotoFetching } =
    useDocuments({
      queryKey: 'getApplicantPhoto',
      type: 'Applicant_Photo',
      enabled: isFocused && !!r3ApplicationDetails?.PK && isEditMode,
    })
  const { data: medicalDocuments, isFetching: isMedicalDocumentFetching } =
    useDocuments({
      queryKey: 'getMedicalDocuments',
      type: 'Medical_Statement',
      enabled: isFocused && !!r3ApplicationDetails?.PK && isEditMode,
    })

  let updatedData

  const handleNavigation = ({ type, paramData }) => {
    if (type === 'invalidID') {
      Platform.OS === 'web'
        ? window.location.replace('error')
        : navigation.replace('error')
    } else {
      Platform.OS === 'web'
        ? window.location.replace(`success?programName=${paramData}`)
        : navigation.replace('success', {
            programName: paramData,
          })
    }
  }

  useEffect(() => {
    if (!isFocused) return

    const hasData = canNonEmptyObject(r3ApplicationDetails || {})
    const filteredCVDocs = documentsFiltered({ docs: cvDocument })

    if (filteredCVDocs.length > 0 && hasData) {
      const totalDocumentCount = 1
      updatedData = updateMandatoryData({
        fileType: 'CV',
        isSaved: true,
        applicationProgressDetail,
        totalDocumentCount,
      })
      setApplicationProgressDetail(updatedData)
    }
  }, [isFocused, cvDocument, r3ApplicationDetails])

  useEffect(() => {
    if (!isFocused) return
    const hasData = canNonEmptyObject(r3ApplicationDetails || {})
    const filteredApplicantPhotoDocs = documentsFiltered({
      docs: applicantPhoto,
    })

    if (filteredApplicantPhotoDocs.length > 0 && hasData) {
      const totalDocumentCount = 1
      updatedData = updateMandatoryData({
        fileType: 'Applicant_Photo',
        isSaved: true,
        applicationProgressDetail: updatedData || applicationProgressDetail,
        totalDocumentCount,
      })
      setApplicationProgressDetail(updatedData)
    }
  }, [isFocused, applicantPhoto, r3ApplicationDetails])

  useEffect(() => {
    if (!isFocused) return

    const hasData = canNonEmptyObject(r3ApplicationDetails || {})

    const filteredMedicalStatementDocs = documentsFiltered({
      docs: medicalDocuments,
    })

    if (filteredMedicalStatementDocs.length > 0 && hasData) {
      const totalDocumentCount = medicalDocuments.length > 0 ? 1 : 0

      updatedData = updateMandatoryData({
        fileType: 'Medical_Statement',
        isSaved: true,
        applicationProgressDetail: updatedData || applicationProgressDetail,
        totalDocumentCount,
      })

      setApplicationProgressDetail(updatedData)
    }
  }, [isFocused, medicalDocuments, r3ApplicationDetails])

  useEffect(() => {
    if (isEditMode) return

    const programName = r3ApplicationDetails['programmeName']

    if (!isEditMode && !!programName) {
      handleNavigation({ type: 'success', paramData: programName })
    }
  }, [isEditMode, r3ApplicationDetails, isFocused])

  useEffect(() => {
    if (!isFocused) return
    const steps = route.params?.steps ?? 0
    if (!steps) {
      navigation.setParams({ steps: 1 })
    }
    setSteps(steps)
    setParams({ steps: steps })
  }, [isFocused, route])

  const viewProps = {
    applicantPhoto,
    cvDocument,
    medicalDocuments,
    r3ApplicationDetails,
    steps,
    isLoading:
      isApplicationFetching ||
      isR3ApplicationDetails ||
      isCVDocumentFetching ||
      isApplicantPhotoFetching ||
      isMedicalDocumentFetching,
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
