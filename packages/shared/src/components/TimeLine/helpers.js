export const getLabelMargin = (status, currentActiveIndex, index, colors) => {
  if (currentActiveIndex === index) {
    return 7
  }
  if (currentActiveIndex !== index && status !== 'completed') {
    return 7
  }
  if (status === 'completed') {
    return 7
  }
}
export const getStatus = ({
  data,
  type,
  itemIndex,
  errors,
  applicationProgressDetail,
  categoryData,
}) => {
  let savedStatus = []
  let hasError = false

  if (data.screenType === 'list') {
    const listCount = Object.keys(
      applicationProgressDetail?.mandatoryFields?.[data?.sessionName]?.list ||
        {},
    ).length
    listCount > 0 ? savedStatus.push(true) : savedStatus.push(false)
  } else {
    Object.entries(
      applicationProgressDetail?.mandatoryFields?.[data?.sessionName] || {},
    )?.map(([key, fieldValues]) => {
      if (errors[fieldValues?.fieldName]?.message) {
        hasError = true
      }
      savedStatus.push(fieldValues?.isSaved)
    })
  }
  if (type === 'error') {
    return hasError
  }
  if (!savedStatus.includes(false) && itemIndex !== categoryData?.length - 1) {
    return 'completed'
  } else {
    return 'not-completed'
  }
}
