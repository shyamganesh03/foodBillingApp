export const getPayload = ({ data, applicationDetails, fieldName }) => {
  const updatedData = data
    ?.map((value, dataIndex) => {
      const unMatchingField = applicationDetails?.[fieldName]?.find(
        (fieldValue) => {
          const keyNames = Object.keys(fieldValue)
          return keyNames.every((key) => value[key] !== fieldValue[key])
        },
      )
      const key = Object.entries(value)
        ?.map(([key, dataValue]) => {
          if (dataValue) {
            return key
          }
        })
        ?.filter((keyName) => keyName !== undefined)
      if (
        (unMatchingField || !applicationDetails?.[fieldName]?.length) &&
        key?.length === 0
      ) {
        return value
      }
    })
    .filter((updatedValues) => updatedValues !== undefined)

  let newUpdatePayload = []
  if (updatedData?.length > 0) {
    updatedData?.map((data) => {
      const newData = data
      newData.shift()
      const newObjectData = { ...newData }
      newUpdatePayload.push(newObjectData)
    })
  } else {
    data.map((values) => {
      const newData = values
      newData.shift()
      const newObjectData = { ...newData }
      newUpdatePayload.push(newObjectData)
    })
  }
  return newUpdatePayload
}