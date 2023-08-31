import { Icon } from '@app-hero/native-icons'
import { Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'

const FilePicker = ({ heading = '', children }) => {
  const { colors } = useTheme()
  const fileTypes = ['PNG', 'JPG', 'GIF']

  const handleFilePicker = (file) => {
    console.log('worked', { file })
  }

  return (
    <View>
      <Text variant="display4">
        {heading}{' '}
        <Text variant="display4" color={colors.onAlert}>
          *
        </Text>
      </Text>
      <FileUploader
        handleChange={handleFilePicker}
        name="file"
        types={fileTypes}
      >
        {children}
      </FileUploader>
    </View>
  )
}

export default FilePicker
