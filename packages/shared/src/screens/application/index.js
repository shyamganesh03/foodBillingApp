import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import DesktopView from './DesktopView'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Text } from '@libs/components'
import { useAtom } from 'jotai'
import { applicationProgressDetails } from '../../utils/atom'
import { useDocuments } from '../../hooks/useDocuments'
import {
  documentsFiltered,
  updateMandatoryData,
} from '../../utils/fieldFunction'
import { canNonEmptyObject } from '../../utils/fieldValidation'
import { Platform } from 'react-native'
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail'
import { useGetGusApplication } from '../../hooks/useGetGusApplication'

const Application = (props) => {
  const { setParams } = useParams()
  const [canFetchApplicationData, setCanApplicationData] = useState(true)
  const paramsData = props.route.params
  const [steps, setSteps] = useState(paramsData?.steps || 1)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute()

  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )

  const { data: gusApplicationDetails, isFetching: isApplicationFetching } =
    useGetGusApplication({
      enabled: isFocused && !!paramsData?.id,
      queryKey: 'getApplicationDetails',
      applicationId: paramsData?.id,
      email: paramsData?.email,
      firstName: paramsData?.firstName,
      lastName: paramsData?.lastName,
      testCase: paramsData?.testCase,
    })

  const {
    data: r3ApplicationDetails,
    refetch,
    isFetching: isR3ApplicationDetails,
  } = useGetApplicationDetail({
    queryKey: 'getApplicationData',
    gusApplicationId: paramsData?.id,
    email: gusApplicationDetails?.Email__c || paramsData?.email,
    enabled: canFetchApplicationData && !!gusApplicationDetails?.Email__c,
  })

  const { data: cvDocument, isFetching: isCVDocumentFetching } = useDocuments({
    queryKey: 'getCVDocuments',
    type: 'CV',
    enabled: isFocused && !!r3ApplicationDetails?.PK,
  })

  const { data: applicantPhoto, isFetching: isApplicantPhotoFetching } =
    useDocuments({
      queryKey: 'getApplicantPhoto',
      type: 'Applicant_Photo',
      enabled: isFocused && !!r3ApplicationDetails?.PK,
    })

  const { data: medicalDocuments, isFetching: isMedicalDocumentFetching } =
    useDocuments({
      queryKey: 'getMedicalDocuments',
      type: 'Medical_Statement',
      enabled: isFocused && !!r3ApplicationDetails?.PK,
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

    if (gusApplicationDetails?.statusCode == 500) {
      setSteps('')
      return handleNavigation({ type: 'invalidID' })
    }
  }, [isFocused, gusApplicationDetails])

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
    if (!isFocused) return

    const programName = r3ApplicationDetails?.programmeName || ''
    const applicationStatus = r3ApplicationDetails?.applicationStatus || ''

    if (r3ApplicationDetails?.PK) {
      setCanApplicationData(false)
    }
    if (applicationStatus === 'Submitted' && !!programName) {
      setSteps('')
      handleNavigation({ type: 'success', paramData: programName })
    }
  }, [r3ApplicationDetails, isFocused])

  useEffect(() => {
    if (!isFocused) return
    const steps = route.params?.steps || 1
    setParams({ steps: steps })
    setSteps(steps)
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
