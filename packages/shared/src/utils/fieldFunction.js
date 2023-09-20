import { canNonEmptyObject } from './fieldValidation'

export const getPayload = ({ data, applicationDetails, fieldName }) => {
  const updatedData = data?.map((updateValue, updateValueIndex) => {
    if (applicationDetails?.[fieldName]?.length > 0) {
      return applicationDetails?.[fieldName]?.map(
        (savedValue, savedValueIndex) => {
          if (updateValueIndex === savedValueIndex) {
            if (savedValue?.recordTypeId) {
              return {
                ...updateValue,
                id: savedValue?.id,
                recordTypeId: savedValue?.recordTypeId,
              }
            } else {
              return {
                ...updateValue,
                id: savedValue?.id,
              }
            }
          } else {
            return { ...updateValue }
          }
        },
      )
    } else {
      return { ...updateValue }
    }
  })

  let finalUpdatedData = []

  updatedData?.map((data) => {
    let copyData
    let mappedValues = {}

    if (Array.isArray(data)) {
      copyData = data[0]
    } else {
      copyData = data
    }
    Object.entries(copyData || {}).map(([key, filedValues]) => {
      if (key !== '0') {
        mappedValues = { ...mappedValues, [key]: filedValues }
      }
    })

    if (mappedValues) {
      const hasNonEmptyValue = canNonEmptyObject(mappedValues)
      if (hasNonEmptyValue) {
        finalUpdatedData.push(mappedValues)
      }
    }
  })

  return finalUpdatedData
}

export const updateMandatoryData = ({
  fileType,
  isSaved = true,
  applicationProgressDetail,
}) => {
  const applicationProgressDetailCopy = { ...applicationProgressDetail }

  const documentsData =
    applicationProgressDetail.mandatoryFields.Application_Document_Requirements

  const filteredDocuments = documentsData.map((item) => {
    const totalMandatoryFieldCount =
      applicationProgressDetailCopy.totalProgress.totalMandatoryFieldCount
    if (item.fileType === fileType) {
      if (isSaved && !item.isSaved) {
        const savedFieldCount =
          applicationProgressDetailCopy.totalProgress.savedFieldCount + 1
        applicationProgressDetailCopy.totalProgress.savedFieldCount =
          savedFieldCount
        applicationProgressDetailCopy.totalProgress.progress = Math.round(
          (savedFieldCount / totalMandatoryFieldCount) * 100,
        )
      }
      if (!isSaved && item.isSaved) {
        const savedFieldCount =
          applicationProgressDetailCopy.totalProgress.savedFieldCount - 1
        applicationProgressDetailCopy.totalProgress.savedFieldCount =
          savedFieldCount
        applicationProgressDetailCopy.totalProgress.progress = Math.round(
          (savedFieldCount / totalMandatoryFieldCount) * 100,
        )
      }
      return { ...item, isSaved: isSaved }
    } else {
      return item
    }
  })

  applicationProgressDetailCopy.mandatoryFields.Application_Document_Requirements =
    filteredDocuments
  return applicationProgressDetailCopy
}
