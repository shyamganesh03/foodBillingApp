import { useQuery } from '@tanstack/react-query'
import { getApplicationByID } from '../api'
import { studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'

export const useGetGusApplication = ({
  enabled,
  queryKey,
  applicationId,
  email,
  firstName,
  lastName,
}) => {
  const [, setStudentDetail] = useAtom(studentDetails)
  const getGusApplicationDetail = async () => {
    const response = await getApplicationByID({
      applicationId: applicationId,
    })

    if (response?.statusCode === 500) {
      return handleNavigation({ type: 'invalidID' })
    }

    setStudentDetail({
      gusApplicationId: applicationId,
      email: response.Email__c || email,
      firstName: response.First_Name__c || firstName,
      lastName: response.Last_Name__c || lastName,
    })

    return response
  }

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getGusApplicationDetail,
    enabled: enabled,
    initialData: [],
  })

  return { data, isFetching, isLoading }
}
