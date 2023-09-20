export const getPayload = ({ data, applicationDetails, fieldName }) => {
  const updatedData = data?.map((updateValue, updateValueIndex) => {
    const savedValues = applicationDetails?.[fieldName] || []
    const savedValue = savedValues[updateValueIndex] || {}

    let finalUpdateData = { ...updateValue }

    if (savedValue.id) {
      finalUpdateData.id = savedValue.id
    }
    if (savedValue.recordTypeId) {
      finalUpdateData.recordTypeId = savedValue.recordTypeId
    }
    for (const key in finalUpdateData) {
      if (Array.isArray(finalUpdateData[key])) {
        delete finalUpdateData[key]
      }
    }
    return finalUpdateData
  })

  const finalUpdatedData = updatedData.filter((item) =>
    Object.values(item).some((value) => !!value),
  )

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
