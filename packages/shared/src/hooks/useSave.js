import { useMutation } from '@tanstack/react-query'
import { createApplication, updateApplication } from '../api'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'

export const useSave = () => {
  const [studentDetail] = useAtom(studentDetails)

  return useMutation(
    async (data) => {
      if (data.type === 'create') {
        const createPayload = {
          ...data?.fieldData,
          ...studentDetail,
        }
        const response = await createApplication(createPayload)
        return response
      }
      if (data.type === 'update') {
        const response = await updateApplication({ ...data?.fieldData })
        return response
      }
    },
    {
      onError: () => {},
    },
  )
}
