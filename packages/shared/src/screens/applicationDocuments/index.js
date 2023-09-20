import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDocument, getApplicationFileByID, uploadFile } from '../../api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { applicationProgressDetails, studentDetails } from '../../utils/atom'
import { useAtom } from 'jotai'

const ApplicationDocuments = (props) => {
  const [fileData, setFileData] = useState()
  const queryClient = useQueryClient()
  const isFocused = useIsFocused()
  const applicationDetails = queryClient.getQueryData(['getApplicationData'])
  const [studentDetail] = useAtom(studentDetails)
  const navigation = useNavigation()
  const { params } = useParams()
  const { steps } = params
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )

  const {
    data: cvDocuments,
    refetch: refetchCVDocumentsDocument,
    isFetching: isCVDocumentFetching,
  } = useQuery({
    queryKey: ['getCVDocuments'],
    queryFn: async () => {
      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: studentDetail?.gusApplicationId,
        type: 'CV',
      })

      return response
    },
    initialData: [],
    enabled: isFocused && !!studentDetail?.gusApplicationId,
  })

  const {
    data: applicantPhotoDocs,
    refetch: refetchApplicantPhotoDocs,
    isFetching: isApplicantPhotoDocs,
  } = useQuery({
    queryKey: ['geApplicantPhotoDocs'],
    queryFn: async () => {
      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: studentDetail?.gusApplicationId,
        type: 'Applicant_Photo',
      })

      return response
    },
    initialData: [],
    enabled: isFocused && !!studentDetail?.gusApplicationId,
  })

  const {
    data: medicalStatementDocs,
    refetch: refetchMedicalStatementDocs,
    isFetching: isMedicalStatementDocs,
  } = useQuery({
    queryKey: ['getMedicalStatementDocs'],
    queryFn: async () => {
      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: studentDetail?.gusApplicationId,
        type: 'Medical_Statement',
      })

      return response
    },
    initialData: [],
    enabled: isFocused && !!studentDetail?.gusApplicationId,
  })

  useEffect(() => {
    if (!isFocused) return

    if (!applicationDetails) {
      queryClient.refetchQueries(['getApplicationData'])
    }
  }, [isFocused, applicationDetails])

  useEffect(() => {
    if (!isFocused) return

    if (cvDocuments?.length === 0) {
      updateMandatoryData({ fileType: 'CV', isSaved: false })
    } else {
      updateMandatoryData({ fileType: 'CV' })
    }
    if (applicantPhotoDocs?.length === 0) {
      updateMandatoryData({ fileType: 'Applicant_Photo', isSaved: false })
    } else {
      updateMandatoryData({ fileType: 'Applicant_Photo' })
    }
    if (medicalStatementDocs?.length === 0) {
      updateMandatoryData({ fileType: 'Medical_Statement', isSaved: false })
    } else {
      updateMandatoryData({ fileType: 'Medical_Statement' })
    }
  }, [isFocused, cvDocuments, applicantPhotoDocs, medicalStatementDocs])

  const updateMandatoryData = ({ fileType, isSaved = true }) => {
    const applicationProgressDetailCopy = { ...applicationProgressDetail }

    const documentsData =
      applicationProgressDetail.mandatoryFields
        .Application_Document_Requirements

    const filteredDocuments = documentsData.map((item) =>
      item.fileType === fileType ? { ...item, isSaved: isSaved } : item,
    )

    applicationProgressDetailCopy.mandatoryFields.Application_Document_Requirements =
      filteredDocuments

    setApplicationProgressDetail(applicationProgressDetailCopy)
  }

  const uploadDocs = async (fileData) => {
    setFileData(fileData)
    await uploadFile({
      ...fileData,
      applicationId: applicationDetails?.r3ApplicationId,
      gusApplicationId: studentDetail.gusApplicationId,
    })

    if (fileData?.type === 'CV') {
      await refetchCVDocumentsDocument()
      updateMandatoryData({ fileType })
    }
    if (fileData?.type === 'Applicant_Photo') {
      await refetchApplicantPhotoDocs()
      updateMandatoryData({ fileType })
    }
    if (fileData?.type === 'Medical_Statement') {
      await refetchMedicalStatementDocs()
      updateMandatoryData({ fileType })
    }
    setFileData({})
  }

  const handleDelete = async ({ id, fileType }) => {
    await deleteDocument({
      id,
      fileType,
      gusApplicationId: studentDetail.gusApplicationId,
    })
    setTimeout(async () => {
      if (fileType === 'CV') {
        await refetchCVDocumentsDocument()
      }
      if (fileType === 'Applicant_Photo') {
        await refetchApplicantPhotoDocs()
      }
      if (fileType === 'Medical_Statement') {
        await refetchMedicalStatementDocs()
      }
    }, 1000)
  }

  const handleNextStep = () => {
    if (
      cvDocuments?.length === 0 ||
      applicantPhotoDocs?.length === 0 ||
      medicalStatementDocs?.length === 0
    ) {
      toast.show('Please add the required documents', {
        type: 'danger',
      })
    } else {
      navigation.setParams({ steps: Number(steps) + 1 })
    }
  }

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {
    applicantPhotoDocs,
    cvDocuments,
    fileData,
    medicalStatementDocs,
    handleDelete,
    handleNextStep,
    uploadDocs,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationDocuments
