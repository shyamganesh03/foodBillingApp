import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { deleteDocument, getApplicationFileByID } from '../api'

export const useFileDelete = () => {
  const [studentDetail] = useAtom(studentDetails)

  const queryClient = useQueryClient()
  
  const mutate = useMutation(
    async (data) => {
      
      const response = await deleteDocument({
        id: data?.id,
        fileType: data?.fileType,
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
          type: context?.fileType,
        })

        if (context?.fileType === 'CV') {
          queryKey = 'getCVDocuments'
        }
        if (context?.fileType === 'Applicant_Photo') {
          queryKey = 'getApplicantPhoto'
        }
        if (context?.fileType === 'Medical_Statement') {
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
