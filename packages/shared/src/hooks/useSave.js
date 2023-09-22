import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createApplication,
  getApplicationByEmailID,
  updateApplication,
} from '../api'
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
          payload = {
            signature: payload?.['signature'] || '',
            signatureDate: payload?.['signatureDate'] || '',
            applicationStatus: 'Submitted',
          }
        }
        const response = await updateApplication({
          ...payload,
          gusApplicationId: studentDetail?.gusApplicationId,
          email: studentDetail?.email,
        })
        return response
      }
    },
    {
      onError: (data) => {},
      onSuccess: async (data, context) => {
        let updatedMandatoryFieldCount = 0
        let canCalculate = false

        if (data?.statusCode === 500) {
          toast.show(data.message[0].message, {
            type: 'danger',
          })
        } else {
          const responseData = await getApplicationByEmailID({
            gusApplicationId: studentDetail?.gusApplicationId,
            email: studentDetail?.email,
          })

          queryClient.resetQueries(['getApplicationData'])

          const updatedProgressDetail = { ...applicationProgressDetail }

          context.metaData.forEach((fieldItem, fieldIndex) => {
            const mandatoryFields =
              updatedProgressDetail?.mandatoryFields?.[context.sessionName]

            if (mandatoryFields && !context.isList) {
              mandatoryFields.forEach((mandatoryItem, mandatoryIndex) => {
                canCalculate = true
                if (mandatoryItem?.fieldName === fieldItem?.fieldName) {
                  updatedMandatoryFieldCount += 1
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
            const sessionName = context.sessionName

            listValues.forEach((listValue, listIndex) => {
              let mandatoryFieldDetailCopy = []
              const isMandatoryField =
                !!updatedProgressDetail.mandatoryFields?.[sessionName]
                  ?.mandatoryFieldDetail
              if (isMandatoryField) {
                mandatoryFieldDetailCopy = (
                  updatedProgressDetail.mandatoryFields?.[sessionName]
                    ?.mandatoryFieldDetail || []
                ).map((mandatoryFieldDetailCopyFields) => ({
                  ...mandatoryFieldDetailCopyFields,
                  isSaved: true,
                }))
              } else {
                const keys = Object.keys(listValue)
                keys.map((keyName) => {
                  const newValue = { fieldName: keyName, isSaved: true }
                  mandatoryFieldDetailCopy.push(newValue)
                })
              }

              updatedProgressDetail.mandatoryFields[sessionName].list = {
                ...updatedProgressDetail.mandatoryFields?.[sessionName]?.list,
                [listIndex]: mandatoryFieldDetailCopy,
              }
            })

            const sessionList =
              updatedProgressDetail.mandatoryFields[sessionName]?.list

            if (
              sessionList &&
              Object.keys(sessionList).length > 0 &&
              updatedProgressDetail.mandatoryFields[sessionName]
                .mandatoryFieldDetail?.length > 0
            ) {
              canCalculate = true
              updatedMandatoryFieldCount += 1
            }
          }

          const totalMandatoryFieldCount =
            updatedProgressDetail.totalProgress.totalMandatoryFieldCount
          const newSavedFieldCount =
            updatedProgressDetail.totalProgress.savedFieldCount +
            updatedMandatoryFieldCount

          updatedProgressDetail.totalProgress.savedFieldCount =
            newSavedFieldCount
          if (canCalculate) {
            updatedProgressDetail.totalProgress.progress = Math.round(
              (newSavedFieldCount / totalMandatoryFieldCount) * 100,
            )
          }

          setApplicationProgressDetail(updatedProgressDetail)

          if (
            context.type === 'createAndNext' ||
            context.type === 'saveAndNext'
          ) {
            navigation.setParams({ steps: Number(steps) + 1 })
          }

          if (context.type === 'submit') {
            navigation.navigate('success', {
              programName: responseData?.['programmeName'] || '',
            })
          }
        }
      },
    },
  )
  return { mutate }
}
