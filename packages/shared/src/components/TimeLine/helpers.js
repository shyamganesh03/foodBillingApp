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
