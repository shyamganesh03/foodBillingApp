import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteListItem } from '../api'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { useNavigation, useRoute } from '@react-navigation/native'

export const useDelete = () => {
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
      await deleteListItem({ id: data?.id })
    },
    {
      onError: (data) => {
        console.log('fail:', data)
      },
      onSuccess: async (data, context) => {
        await queryClient.refetchQueries(['getApplicationData'])
        if (data?.statusCode === 500) {
          toast.show(data.message[0].message, {
            type: 'danger',
          })
        }
      },
    },
  )
  return { mutate }
}
