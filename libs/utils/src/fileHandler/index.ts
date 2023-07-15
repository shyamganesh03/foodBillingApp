import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native'

export const uploadFileToS3 = async ({
  url,
  file,
}: {
  url: string
  file: { name: string; mime: string; uri: string }
}): Promise<any> => {
  try {
    const { data } = await RNFetchBlob.fetch(
      'PUT',
      url,
      {
        'Content-Type': 'image/png',
      },
      [
        {
          name: 'file',
          filename: file.name,
          type: file.mime,
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
