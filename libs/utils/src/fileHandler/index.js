import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native'

export const uploadFileToS3 = async ({ url, file }) => {
  try {
    const { data } = await RNFetchBlob.fetch(
      'PUT',
      url,
      {
        'Content-Type': 'image/png',
      },
      [
        // append field data from file path
        {
          name: 'file',
          filename: file.name,
          type: file.mime,

          // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
          // Or simply wrap the file path with RNFetchBlob.wrap().
          data: RNFetchBlob.wrap(
            Platform.OS === 'ios'
              ? file.uri.replace('file:', '')
              : file.uri.replace('file:', ''),
          ),
        },
      ],
    )

    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}
