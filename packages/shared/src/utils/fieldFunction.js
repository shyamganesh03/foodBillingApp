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

  const finalUpdatedData = updatedData?.filter((item) =>
    Object.values(item).some((value) => !!value),
  )

  return finalUpdatedData
}

export const updateMandatoryData = ({
  fileType,
  isSaved = true,
  applicationProgressDetail,
  totalDocumentCount,
}) => {
  const { mandatoryFields, totalProgress } = { ...applicationProgressDetail }
  const { Application_Document_Requirements: documentsData } = mandatoryFields

  const filteredDocuments = documentsData.map((item) => {
    const { fileType: itemFileType, isSaved: itemIsSaved } = item

    if (itemFileType === fileType) {
      const savedFieldCountDiff = totalDocumentCount
      if (isSaved && !itemIsSaved) {
        if (
          totalProgress.savedFieldCount < totalProgress.totalMandatoryFieldCount
        ) {
          totalProgress.savedFieldCount += savedFieldCountDiff
        }
      }
      if (!isSaved && itemIsSaved) {
        totalProgress.savedFieldCount -= savedFieldCountDiff
      }

      const progress = Math.round(
        (totalProgress.savedFieldCount /
          totalProgress.totalMandatoryFieldCount) *
          100,
      )
      totalProgress.progress = progress

      return { ...item, isSaved }
    } else {
      return item
    }
  })

  return {
    ...applicationProgressDetail,
    mandatoryFields: {
      ...mandatoryFields,
      Application_Document_Requirements: filteredDocuments,
    },
  }
}

export const getRequiredPayload = (fieldData, formData) => {
  let requiredPayload = {}
  fieldData?.map((fieldItem) => {
    requiredPayload = {
      ...requiredPayload,
      [fieldItem.fieldName]: formData[fieldItem.fieldName],
    }
  })
  return requiredPayload
}

export const documentsFiltered = ({ docs }) => {
  const filteredData = docs?.filter((docs) => !!docs?.documentLinkedId)
  return filteredData
}

export const addCountryCode = ({ payloadItem, data, fieldData }) => {
  let payloadData = { ...payloadItem }
  fieldData.map((fieldItem) => {
    if (fieldItem.inputType === 'phone') {
      if (data[fieldItem.fieldName]?.includes('-')) {
        payloadData[fieldItem.fieldName] = `${data[fieldItem.fieldName]}`
      } else {
        payloadData[fieldItem.fieldName] = `${
          data[fieldItem.countryCode] || '+1'
        }-${data[fieldItem.fieldName]}`
      }
    }
  })
  return payloadData
}
