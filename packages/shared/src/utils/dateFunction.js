export const getCurrentDate = ({ type = '' }) => {
  const date = new Date()
  // Extract the year, month, and day components
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0')
  if (type === 'string') {
    return `${year}-${month}-${day}`
  }
  return new Date(`${year}-${month}-${day}`)
}
