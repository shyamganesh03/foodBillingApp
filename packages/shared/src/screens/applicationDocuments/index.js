import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import { Text } from '@libs/components'
import DesktopView from './DesktopView'
import { useQuery } from '@tanstack/react-query'

const ApplicationDocuments = () => {
  const queryClient = useQueryClient()

  const applicationDetails = queryClient.getQueryData(['getApplicationData'])

  const {
    data: documentsData,
    refetch: refetchDocument,
    isFetching: isDocumentFetching,
  } = useQuery({
    queryKey: ['getDocuments'],
    queryFn: async () => {
      // Assuming response contains the 'data' property with the array of data
      const response = await getApplicationFileByID({
        Id: data?.r3ApplicationId,
      })

      return response.records
    },
    initialData: [],
    enabled: isFocused && !!data?.r3ApplicationId && activeTab === 5,
  })
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, DesktopView, DesktopView),
    [],
  )

  const viewProps = {}
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ApplicationDocuments
