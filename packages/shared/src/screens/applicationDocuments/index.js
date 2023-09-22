import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'
import { useQueryClient } from '@tanstack/react-query'
import { deleteDocument, uploadFile } from '../../api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { applicationProgressDetails, studentDetails } from '../../utils/atom'
import { useAtom } from 'jotai'
import {
  documentsFiltered,
  updateMandatoryData,
} from '../../utils/fieldFunction'
import { useFileUpload } from '../../hooks/useFileUpload'
import { useFileDelete } from '../../hooks/useDeleteFile'

const ApplicationDocuments = ({
  applicantPhotoDocs,
  applicationDetails,
  cvDocuments,
  medicalStatementDocs,
}) => {
  const [fileData, setFileData] = useState()
  const queryClient = useQueryClient()
  const isFocused = useIsFocused()
  const [studentDetail] = useAtom(studentDetails)
  const navigation = useNavigation()
  const { params } = useParams()
  const { steps } = params
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )

  const { mutate: uploadDocs } = useFileUpload()
  const { mutate: deleteFile } = useFileDelete()

  const handleUploadDocs = async (fileData) => {
    let totalDocumentCount
    setFileData(fileData)
    if (
      fileData?.fileType === 'CV' ||
      fileData?.fileType === 'Applicant_Photo'
    ) {
      totalDocumentCount = 1
    } else {
      totalDocumentCount = medicalStatementDocs?.length === 0 ? 1 : 0
    }

    await uploadDocs.mutateAsync({
      fileData: fileData,
      applicationProgressDetail: applicationProgressDetail,
      totalDocumentCount: totalDocumentCount,
    })

    const updatedMandatoryDetails = updateMandatoryData({
      fileType: fileData?.fileType,
      applicationProgressDetail: applicationProgressDetail,
      totalDocumentCount: totalDocumentCount,
    })

    setApplicationProgressDetail(updatedMandatoryDetails)
    setFileData({})
  }

  const handleDelete = async ({ id, fileType }) => {
    let totalDocumentCount = 0

    const filteredCVDocs = documentsFiltered({ docs: cvDocuments })
    const filteredApplicantPhotoDocs = documentsFiltered({
      docs: applicantPhotoDocs,
    })
    const filteredMedicalStatementDocs = documentsFiltered({
      docs: medicalStatementDocs,
    })

    if (
      (fileType === 'CV' && filteredCVDocs.length > 0) ||
      (fileType === 'Applicant_Photo' && filteredApplicantPhotoDocs.length > 0)
    ) {
      totalDocumentCount = 1
    } else {
      totalDocumentCount = filteredMedicalStatementDocs?.length === 1 ? 1 : 0
    }

    await deleteFile.mutateAsync({
      id,
      fileType,
    })

    const updatedMandatoryDetails = updateMandatoryData({
      fileType,
      isSaved: false,
      applicationProgressDetail,
      totalDocumentCount: totalDocumentCount,
    })

    setApplicationProgressDetail(updatedMandatoryDetails)
  }

  const handleNextStep = () => {
    const filteredCVDocs = documentsFiltered({ docs: cvDocuments })
    const filteredApplicantPhotoDocs = documentsFiltered({
      docs: applicantPhotoDocs,
    })
    const filteredMedicalStatementDocs = documentsFiltered({
      docs: medicalStatementDocs,
    })

    if (
      filteredCVDocs?.length === 0 ||
      filteredApplicantPhotoDocs?.length === 0 ||
      filteredMedicalStatementDocs?.length === 0
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
    handleUploadDocs,
  }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationDocuments
