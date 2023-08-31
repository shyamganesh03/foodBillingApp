import { Icon } from '@r3-oaf/native-icons'
import { Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'

const FilePicker = ({ heading = '', isMandatory }) => {
  const { colors } = useTheme()
  const fileTypes = ['PNG', 'JPG', 'GIF']

  const handleFilePicker = (file) => {
    console.log('worked', { file })
  }

  return (
    <View>
      <Text variant="display5">
        {heading}{' '}
        {isMandatory ? (
          <Text variant="display5" color={colors.onAlert}>
            *
          </Text>
        ) : null}
      </Text>
      <FileUploader
        handleChange={handleFilePicker}
        name="file"
        types={fileTypes}
      >
        <View
          style={{
            borderRadius: 4,
            borderWidth: 2,
            marginTop: 2,
            borderColor: colors.fieldBorder,
            borderStyle: 'dashed',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ marginLeft: 2, marginVertical: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 4,
                  borderColor: '#D4D4D4',
                  borderWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 3,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={handleFilePicker}
              >
                <Icon
                  name="Download"
                  height={15}
                  width={15}
                  color={colors.primary}
                />
                <Text
                  variant="display4"
                  color={colors.primary}
                  style={{ marginLeft: 10 }}
                >
                  Upload Files
                </Text>
              </TouchableOpacity>
              <Text
                variant="display4"
                style={{ marginLeft: 10, marginRight: 20, alignSelf: 'center' }}
              >
                Or drag files
              </Text>
            </View>
          </View>
        </View>
      </FileUploader>
    </View>
  )
}

export default FilePicker
