import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { getApplicationFileByID, uploadFile } from '../api'
import { updateMandatoryData } from '../utils/fieldFunction'
import { useState } from 'react'

export const useFileUpload = () => {
  const [studentDetail] = useAtom(studentDetails)

  const queryClient = useQueryClient()
  let applicationDetails = queryClient.getQueryData(['getApplicationData'])
  const mutate = useMutation(
    async (data) => {
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
      },
    },
  )

  return { mutate }
}
