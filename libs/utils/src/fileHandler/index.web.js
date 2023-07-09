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
