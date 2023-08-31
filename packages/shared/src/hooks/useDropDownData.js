import { useQuery } from '@tanstack/react-query'
import { getDropdownData } from '../api'

export const useDropDownData = ({ dropDownName }) => {
  const gerDropDownData = async () => {
    const dropdownData = await getDropdownData({ apiName: dropDownName })
    const newData = dropdownData?.map((item) => {
      return { name: item }
    })
    return newData
  }
  const { data: dropdownValue } = useQuery({
    queryKey: [dropDownName],
    queryFn: gerDropDownData,
    enabled: !!dropDownName,
    initialData: [],
  })

  return { dropdownValue }
}
