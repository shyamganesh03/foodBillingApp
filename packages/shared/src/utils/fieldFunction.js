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
      if (newData[0]) {
        newData.shift()
      }
      const newObjectData = { ...newData }
      newUpdatePayload?.push(newObjectData)
    })
  } else {
    data?.map((values) => {
      const newData = values
      if (newData[0]) {
        newData.shift()
      }

      let filteredData = {}
      Object.entries(newData?.[0] || newData).map(([key, newDataValues]) => {
        if (newDataValues !== undefined) {
          filteredData = {
            ...filteredData,
            [key]: newData?.[0]?.[key] || newData?.[key],
          }
        }
      })
      if (
        Object.values(filteredData).some(
          (filteredDataValue) => !!filteredDataValue,
        )
      ) {
        newUpdatePayload?.push(filteredData)
      }
    })
  }
  return newUpdatePayload
}
