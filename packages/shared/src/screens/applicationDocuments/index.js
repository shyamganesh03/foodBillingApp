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
    await uploadFile({
      ...fileData,
      applicationId: applicationDetails?.r3ApplicationId,
      gusApplicationId: studentDetail.gusApplicationId,
    })

    if (fileData?.fileType === 'CV') {
      await queryClient.refetchQueries(['getCVDocuments'])
      updatedData = updateMandatoryData({
        fileType: fileData?.fileType,
        applicationProgressDetail,
      })
    }
    if (fileData?.fileType === 'Applicant_Photo') {
      await queryClient.refetchQueries(['getApplicantPhoto'])
      updatedData = updateMandatoryData({
        fileType: fileData?.type,
        applicationProgressDetail,
      })
    }
    if (fileData?.fileType === 'Medical_Statement') {
      await queryClient.refetchQueries(['getMedicalDocuments'])
      updatedData = updateMandatoryData({
        fileType: fileData?.fileType,
        applicationProgressDetail,
      })
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
      await queryClient.refetchQueries(['getCVDocuments'])
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
      })
    }
    if (fileType === 'Applicant_Photo') {
      await queryClient.refetchQueries(['getApplicantPhoto'])
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
      })
    }
    if (fileType === 'Medical_Statement') {
      await queryClient.refetchQueries(['getMedicalDocuments'])
      updatedData = updateMandatoryData({
        fileType,
        isSaved: false,
        applicationProgressDetail,
      })
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
