import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import {
  getApplicationByEmailID,
  getApplicationFileByID,
  uploadFile,
} from '../api'
import { useState } from 'react'

export const useFileUpload = () => {
  const [studentDetail] = useAtom(studentDetails)

  const [progressStatus, setHasProgressStatus] = useState({
    isCompleted: false,
    error: false,
    documentType: '',
  })

  const queryClient = useQueryClient()
  let applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const mutate = useMutation(
    async (data) => {
      if (!applicationDetails) {
        applicationDetails = await getApplicationByEmailID({
          gusApplicationId: studentDetail?.gusApplicationId,
          email: studentDetail?.email,
        })
      }
      const response = await uploadFile({
        ...data.fileData,
        applicationId: applicationDetails?.r3ApplicationId,
        gusApplicationId: studentDetail.gusApplicationId,
      })

      return response || []
    },
    {
      onError: (data) => {
        console.log('err: ', data)
      },
      onSuccess: async (data, context) => {
        if (data?.statusCode === 500) {
          setHasProgressStatus({
            isCompleted: true,
            error: true,
            documentType: context?.fileData?.fileType,
          })
          return toast.show(data.message, {
            type: 'danger',
          })
        }
        if (data?.statusCode === 400) {
          setHasProgressStatus({
            isCompleted: true,
            error: true,
            documentType: context?.fileData?.fileType,
          })
          return toast.show(data.message, {
            type: 'danger',
          })
        }

        let queryKey
        const responseData = await getApplicationFileByID({
          Id: studentDetail?.gusApplicationId,
          type: context?.fileData?.fileType,
        })

        if (context?.fileData?.fileType === 'CV') {
          queryKey = 'getCVDocuments'
        }
        if (context?.fileData?.fileType === 'Applicant_Photo') {
          queryKey = 'getApplicantPhoto'
        }
        if (context?.fileData?.fileType === 'Medical_Statement') {
          queryKey = 'getMedicalDocuments'
        }

        queryClient.setQueryData([queryKey], () => {
          return [...responseData]
        })

        setHasProgressStatus({
          isCompleted: true,
          error: false,
          documentType: context?.fileData?.fileType,
        })
      },
    },
  )

  return { mutate, progressStatus }
}
