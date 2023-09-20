import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApplication, updateApplication } from '../api'
import { applicationProgressDetails, studentDetails } from '../utils/atom'
import { useAtom } from 'jotai'
import { useNavigation, useRoute } from '@react-navigation/native'

export const useSave = () => {
  const [studentDetail] = useAtom(studentDetails)
  const [applicationProgressDetail, setApplicationProgressDetail] = useAtom(
    applicationProgressDetails,
  )
  const queryClient = useQueryClient()
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  const steps = params?.steps || 0
  let applicationDetails = queryClient.getQueryData(['getApplicationData'])
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
      if (!applicationDetails) {
        applicationDetails = await getApplicationByEmailID({
          gusApplicationId: studentDetail?.gusApplicationId,
          email: studentDetail?.email,
        })
      }
      if (
        (data.type === 'create' || data.type === 'createAndNext') &&
        !applicationDetails?.email
      ) {
        let createPayload = {
          ...data?.fieldData,
          ...studentDetail,
          universityOrCollegeInfo: [],
          AAMCMCATReporting: [],
          clinicalOrHospitalExperienceDetails: [],
          researchExperience: [],
          recommenders: [],
          applicationStatus: 'In Progress',
        }
        removeNullData(createPayload)
        const response = await createApplication(createPayload)
        return response
      } else {
        let payload = data?.fieldData

        removeNullData(payload)
        if (data.type === 'submit') {
          payload = { ...payload, applicationStatus: 'Submitted' }
        }
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
          const updatedProgressDetail = { ...applicationProgressDetail }

          context.metaData.forEach((fieldItem, fieldIndex) => {
            const mandatoryFields =
              updatedProgressDetail?.mandatoryFields?.[context.sessionName]

            if (mandatoryFields) {
              mandatoryFields.forEach((mandatoryItem, mandatoryIndex) => {
                if (mandatoryItem?.fieldName === fieldItem?.fieldName) {
                  mandatoryFields[mandatoryIndex] = {
                    ...mandatoryItem,
                    isSaved: true,
                  }
                } else {
                  mandatoryFields[mandatoryIndex] = { ...mandatoryItem }
                }
              })
            }
          })

          if (context.isList) {
            const listValues = context?.fieldData?.[context.listKey] || []

            listValues.forEach((listValue, listIndex) => {
              let mandatoryFieldDetailCopy =
                updatedProgressDetail.mandatoryFields?.[context.sessionName]
                  ?.mandatoryFieldDetail || []
              mandatoryFieldDetailCopy = mandatoryFieldDetailCopy?.map(
                (mandatoryFieldDetailCopyFields) => ({
                  ...mandatoryFieldDetailCopyFields,
                  isSaved: true,
                }),
              )

              updatedProgressDetail.mandatoryFields[context.sessionName].list =
                {
                  ...updatedProgressDetail.mandatoryFields?.[
                    context.sessionName
                  ].list,
                  [listIndex]: mandatoryFieldDetailCopy,
                }
            })
          }

          setApplicationProgressDetail(updatedProgressDetail)

          if (
            context.type === 'createAndNext' ||
            context.type === 'saveAndNext'
          ) {
            navigation.setParams({ steps: Number(steps) + 1 })
          }
          if (data.type === 'submit') {
            navigation.navigate('success', {
              programName: applicationDetails['programmeName'],
            })
          }
        }
      },
    },
  )
  return { mutate }
}
