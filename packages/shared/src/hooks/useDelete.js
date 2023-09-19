import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteListItem } from '../api'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { useNavigation, useRoute } from '@react-navigation/native'

export const useDelete = () => {
  const [studentDetail] = useAtom(studentDetails)
  const queryClient = useQueryClient()

  const mutate = useMutation(
    async (data) => {
      await deleteListItem({
        id: data?.id,
        type: data?.type,
        gusApplicationId: studentDetail?.gusApplicationId,
        email: studentDetail?.email,
      })
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
