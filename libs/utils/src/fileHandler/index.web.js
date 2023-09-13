export const uploadFileToS3 = async ({ url, file }) => {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      header: {
        'Content-Type': 'image/png',
      },
    }).then((res) => res.json())
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getBase64 = async (f) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(f)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
