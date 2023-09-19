export const getPayload = ({ data, applicationDetails, fieldName }) => {
  console.log({
    data,
    fieldName,
    app: applicationDetails?.[fieldName],
  })
  const updatedData = data?.map((updateValue, updateValueIndex) => {
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
  })
  console.log({ updatedData })
  let finalUpdatedData = []
  updatedData?.map((data) => {
    let copyData = data
    let mappedValues = {}
    Object.entries(copyData[0]).map(([key, filedValues]) => {
      if (key !== '0') {
        mappedValues = { ...mappedValues, [key]: filedValues }
      }
    })
    finalUpdatedData.push(mappedValues)
  })
  return finalUpdatedData
}
