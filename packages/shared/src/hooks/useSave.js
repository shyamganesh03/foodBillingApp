import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApplication, updateApplication } from '../api'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { useNavigation, useRoute } from '@react-navigation/native'

export const useSave = () => {
  const [studentDetail] = useAtom(studentDetails)
  const queryClient = useQueryClient()
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  const steps = params?.steps || 0
  const applicationDetails = queryClient.getQueryData(['getApplicationData'])
  const gusApplicationData = queryClient.getQueryData(['getApplicationDetails'])
  const mutate = useMutation(
    async (data) => {
      if (
        (data.type === 'create' || data.type === 'createAndNext') &&
        !applicationDetails?.email
      ) {
        const createPayload = {
          ...data?.fieldData,
          ...studentDetail,
        }
        const response = await createApplication(createPayload)
        return response
      } else {
        const response = await updateApplication({
          ...data?.fieldData,
          ...studentDetail,
        })
        return response
      }
    },
    {
      onError: (data) => {
        console.log('fail:', data)
      },
      onSuccess: (data, context) => {
        if (data?.statusCode === 500) {
          toast.show(data.message[0].message, {
            type: 'danger',
          })
        } else {
          if (
            context.type === 'createAndNext' ||
            context.type === 'saveAndNext'
          ) {
            navigation.setParams({ steps: steps + 1 })
          }
        }
      },
    },
  )
  return { mutate }
}
