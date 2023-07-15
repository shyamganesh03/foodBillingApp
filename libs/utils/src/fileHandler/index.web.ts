export const uploadFileToS3 = async ({
  url,
  file,
}: {
  url: string
  file: File
}): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'image/png',
      },
    }).then((res) => res.json())
    return response
  } catch (err) {
    console.log(err)
  }
}
