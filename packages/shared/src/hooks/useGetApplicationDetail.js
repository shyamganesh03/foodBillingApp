import { useAtom } from 'jotai'
import { getApplicationByEmailID } from '../api'
import { applicationProgressDetails } from '../utils/atom'
import { useQuery } from '@tanstack/react-query'

export const useGetApplicationDetail = ({
  email,
  enabled,
  gusApplicationId,
  queryKey,
}) => {
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )

  const getApplicationDetail = async () => {
    const updatedMandatoryFields = []
    const totalMandatoryFields = []
    let mandatoryDataCount = 0

    const responseData = await getApplicationByEmailID({
      gusApplicationId: gusApplicationId,
      email: email,
    })

    const updatedMandatoryFieldsCopy = {
      ...applicationProgressDetail.mandatoryFields,
    }
    const totalProgressStatusCopy = {
      ...applicationProgressDetail.totalProgress,
    }

    Object.entries(responseData).forEach(([key, responseDataItem]) => {
      const fieldKey = Object.keys(updatedMandatoryFieldsCopy).find(
        (applicationDetailKey) => {
          const applicationFieldData =
            updatedMandatoryFieldsCopy?.[applicationDetailKey]
          if (Array.isArray(applicationFieldData)) {
            return applicationFieldData.some((item) => item.fieldName === key)
          }
          return false
        },
      )

      if (fieldKey) {
        updatedMandatoryFieldsCopy[fieldKey] = updatedMandatoryFieldsCopy[
          fieldKey
        ].map((applicationFieldData, index) => {
          totalMandatoryFields.push(applicationFieldData.fieldName)

          if (applicationFieldData.fieldName === key) {
            updatedMandatoryFields.push(applicationFieldData.fieldName)
            return { ...applicationFieldData, isSaved: true }
          }

          return { ...applicationFieldData }
        })
      } else {
        const listValues = responseDataItem || []

        if (Array.isArray(listValues)) {
          listValues?.forEach((listValue, listIndex) => {
            let keyName = ''

            switch (key) {
              case 'universityOrCollegeInfo':
                keyName = 'University/College_Information'
                break
              case 'researchExperience':
                keyName = 'Research_Experience'
                break
              case 'AAMCMCATReporting':
                keyName = 'AAMC-MCAT_Reporting'
                break
              case 'clinicalOrHospitalExperienceDetails':
                keyName = 'Clinical/Hospital_Experience'
                break
              case 'recommenders':
                keyName = 'Recommenders'
                break
            }

            let mandatoryFieldDetailCopy =
              updatedMandatoryFieldsCopy?.[keyName]?.mandatoryFieldDetail || []

            if (mandatoryFieldDetailCopy.length > 0) {
              mandatoryFieldDetailCopy = mandatoryFieldDetailCopy.map(
                (mandatoryFieldDetailCopyFields, index) => {
                  totalMandatoryFields.push(
                    mandatoryFieldDetailCopyFields?.fieldName,
                  )
                  updatedMandatoryFields.push(
                    mandatoryFieldDetailCopyFields.fieldName,
                  )
                  return { ...mandatoryFieldDetailCopyFields, isSaved: true }
                },
              )

              mandatoryDataCount = 1

              updatedMandatoryFieldsCopy[keyName].list = {
                ...updatedMandatoryFieldsCopy?.[keyName]?.list,
                [listIndex]: mandatoryFieldDetailCopy,
              }
            } else {
              const keys = Object.keys(listValue)
              let finalValue = keys.map((keyName) => ({
                fieldName: keyName,
                isSaved: true,
              }))

              updatedMandatoryFieldsCopy[keyName].list = {
                ...updatedMandatoryFieldsCopy?.[keyName]?.list,
                [listIndex]: finalValue,
              }
            }
          })
        }
      }
    })

    const totalMandatoryFieldCount =
      totalProgressStatusCopy.totalMandatoryFieldCount
    const newSavedFieldCount =
      [...new Set([...updatedMandatoryFields])].length + mandatoryDataCount

    totalProgressStatusCopy.savedFieldCount = newSavedFieldCount
    totalProgressStatusCopy.progress = Math.round(
      (newSavedFieldCount / totalMandatoryFieldCount) * 100,
    )

    const updatedApplicationProgressDetail = {
      ...applicationProgressDetail,
      mandatoryFields: updatedMandatoryFieldsCopy,
      totalProgress: totalProgressStatusCopy,
    }

    setApplicationProgressDetail(updatedApplicationProgressDetail)

    console.log({ updatedApplicationProgressDetail })

    return responseData
  }

  const { data, refetch, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getApplicationDetail,
    enabled: enabled && !!email,
    initialData: [],
  })

  return { data, refetch, isLoading }
}
