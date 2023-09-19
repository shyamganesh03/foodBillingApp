export const getPayload = ({ data, applicationDetails, fieldName }) => {
  const updatedData = data
    ?.map((value, dataIndex) => {
      const unMatchingField = applicationDetails?.[fieldName]?.find(
        (fieldValue) => {
          const keyNames = Object.keys(fieldValue)
          return keyNames.every((key) => value[key] !== fieldValue[key])
        },
      )
      if (unMatchingField || !applicationDetails?.[fieldName]?.length) {
        return value
      }
    })
    .filter((updatedValues) => updatedValues !== undefined)

  let newUpdatePayload = []
  updatedData?.map((data) => {
    const newData = data
    newData.shift()
    const newObjectData = { ...newData }
    newUpdatePayload.push(newObjectData)
  })
  return newUpdatePayload
}
