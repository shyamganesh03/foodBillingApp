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

  const removeNullData = (dataToBeCheck) => {
    Object.entries(dataToBeCheck).map(([key, fieldValue]) => {
      if (!fieldValue) {
        delete dataToBeCheck[key]
      }
    })
  }
  const mutate = useMutation(
    async (data) => {
      if (
        (data.type === 'create' || data.type === 'createAndNext') &&
        !applicationDetails?.email
      ) {
        let createPayload = {
          ...data?.fieldData,
          ...studentDetail,
        }
        removeNullData(createPayload)
        const response = await createApplication(createPayload)
        return response
      } else {
        let payload = data?.fieldData
        console.log({ payload })
        removeNullData(payload)
        const response = await updateApplication({
          ...data?.fieldData,
          gusApplicationId: studentDetail?.gusApplicationId,
          email: studentDetail?.email,
        })
        return response
      }
    },
    {
      onError: (data) => {
        console.log('fail:', data)
      },
      onSuccess: async (data, context) => {
        if (data?.statusCode === 500) {
          toast.show(data.message[0].message, {
            type: 'danger',
          })
        } else {
          await queryClient.refetchQueries(['getApplicationData'])
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
