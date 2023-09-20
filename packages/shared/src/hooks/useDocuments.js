import { useAtom } from 'jotai'
import { getApplicationFileByID } from '../api'
import { studentDetails } from '../utils/atom'
import { useQuery } from '@tanstack/react-query'

export const useDocuments = ({ queryKey, type, enabled }) => {
  const [studentDetail] = useAtom(studentDetails)

  const getDocuments = async () => {
    const response = await getApplicationFileByID({
      Id: studentDetail?.gusApplicationId,
      type: type,
    })
    return response
  }
  const { data, refetch, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: getDocuments(),
    enabled: enabled,
    initialData: [],
  })
  return { data, refetch, isFetching }
}
