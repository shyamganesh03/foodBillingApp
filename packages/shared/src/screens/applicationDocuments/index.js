import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'
import { useQueryClient } from '@tanstack/react-query'
import { deleteDocument, uploadFile } from '../../api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { applicationProgressDetails, studentDetails } from '../../utils/atom'
import { useAtom } from 'jotai'
import { updateMandatoryData } from '../../utils/fieldFunction'

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

  const uploadDocs = async (fileData) => {
    let updatedData
    setFileData(fileData)
    const response = await uploadFile({
      ...fileData,
      applicationId: applicationDetails?.r3ApplicationId,
      gusApplicationId: studentDetail.gusApplicationId,
    })

    if (fileData?.fileType === 'CV') {
      updatedData = updateMandatoryData({
        fileType: fileData?.fileType,
        applicationProgressDetail,
        totalDocumentCount: 1,
      })
      await queryClient.refetchQueries({ queryKey: ['getCVDocuments'] })
    }
    if (fileData?.fileType === 'Applicant_Photo') {
      updatedData = updateMandatoryData({
        fileType: fileData?.type,
        applicationProgressDetail,
        totalDocumentCount: 1,
      })
      await queryClient.refetchQueries({ queryKey: ['getApplicantPhoto'] })
    }
    if (fileData?.fileType === 'Medical_Statement') {
      updatedData = updateMandatoryData({
        fileType: fileData?.fileType,
        applicationProgressDetail,
        totalDocumentCount: medicalStatementDocs?.length === 0 ? 1 : 0,
      })
      await queryClient.refetchQueries({ queryKey: ['getMedicalDocuments'] })
    }

    setApplicationProgressDetail(updatedData)
    setFileData({})
  }

  const handleDelete = async ({ id, fileType }) => {
    let updatedData
    await deleteDocument({
      id,
      fileType,
      gusApplicationId: studentDetail.gusApplicationId,
    })

    if (fileType === 'CV') {
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
        totalDocumentCount: 1,
      })
      await queryClient.refetchQueries({ queryKey: ['getCVDocuments'] })
    }
    if (fileType === 'Applicant_Photo') {
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
        totalDocumentCount: 1,
      })
      await queryClient.refetchQueries({ queryKey: ['getApplicantPhoto'] })
    }
    if (fileType === 'Medical_Statement') {
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
        totalDocumentCount: medicalStatementDocs?.length === 1 ? 1 : 0,
      })
      await queryClient.refetchQueries({ queryKey: ['getMedicalDocuments'] })
    }

    setApplicationProgressDetail(updatedData)
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
