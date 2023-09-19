import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout, useParams } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDocument, getApplicationFileByID, uploadFile } from '../../api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { studentDetails } from '../../utils/atom'
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

  useEffect(() => {
    if (!isFocused) return

    if (!applicationDetails) {
      queryClient.refetchQueries(['getApplicationData'])
    }
  }, [isFocused, applicationDetails])

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

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const uploadDocs = async (fileData) => {
    setFileData(fileData)
    await uploadFile({
      ...fileData,
      applicationId: applicationDetails?.r3ApplicationId,
      gusApplicationId: studentDetail.gusApplicationId,
    })

    if (fileData?.type === 'CV') {
      await refetchCVDocumentsDocument()
    }
    if (fileData?.type === 'Applicant_Photo') {
      await refetchApplicantPhotoDocs()
    }
    if (fileData?.type === 'Medical_Statement') {
      await refetchMedicalStatementDocs()
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
    navigation.setParams({ steps: Number(steps) + 1 })
  }

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
