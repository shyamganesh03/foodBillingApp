import { Icon } from '@r3-oaf/native-icons'
import { Button, Divider, ProgressBar, Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Modal } from 'react-native'

const FilePicker = ({
  setIsFileSuccess,
  heading = '',
  isMandatory,
  uploadFile = () => {},
  isSuccess,
  key,
}) => {
  const { colors } = useTheme()
  const [fileModalDetails, setFileModalDetails] = useState({
    isVisible: false,
    image: '',
    name: '',
    fileSize: '',
  })
  const documentRef = useRef()

  const handleDragOver = (event) => {
    event.preventDefault()
  }
  const handleDrop = async (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    setFileModalDetails({
      isVisible: true,
      image: '',
      name: file.name,
      fileSize: `${file.size} b`,
    })
    const base64Docs = await getBase64(file)
    uploadFile({
      file: base64Docs.split(',')[1],
      path: file.name,
      pathName: file.name.split('.')[0],
    })
  }

  const getBase64 = async (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleFilePicker = async (event) => {
    const file = event.target.files[0]
    setFileModalDetails({
      isVisible: true,
      image: '',
      name: file.name,
      fileSize: `${file.size} b`,
    })
    const base64Docs = await getBase64(file)
    uploadFile({
      file: base64Docs.split(',')[1],
      path: file.name,
      pathName: file.name.split('.')[0],
    })
  }

  return (
    <View key={key}>
      <Text variant="display5">
        {heading}{' '}
        {isMandatory ? (
          <Text variant="display5" color={colors.onAlert}>
            *
          </Text>
        ) : null}
      </Text>
      <form
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onSubmit={(e) => {
          handleFilePicker(e)
        }}
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
                onPress={() => {
                  documentRef.current.click()
                }}
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
        <input
          type="file"
          ref={documentRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFilePicker(e)
          }}
        />
      </form>
      <FileModal
        setShowModalDetails={setFileModalDetails}
        modalDetails={fileModalDetails}
        isSuccess={isSuccess}
        setIsFileSuccess={setIsFileSuccess}
      />
    </View>
  )
}

const FileModal = ({
  count,
  setShowModalDetails,
  modalDetails,
  isSuccess,
  setIsFileSuccess,
}) => {
  const { colors } = useTheme()
  return (
    <Modal transparent visible={modalDetails.isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(107,106,106, 0.6)',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: colors.white,
            width: '40%',
            paddingBottom: 16,
          }}
        >
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Text variant="display1">Upload Files</Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              padding: 16,
              position: 'relative',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'column' }}>
              <Text variant="body2">{modalDetails.name}</Text>
              <Text variant="body2">{modalDetails.fileSize}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isSuccess ? (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}
                >
                  <Icon
                    name="Check"
                    height={15}
                    width={15}
                    color={colors.white}
                  />
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text variant="body2">{`${
              isSuccess ? 1 : 0
            } of 1 file upload`}</Text>
            <Button
              label="Done"
              buttonStyle={{ marginLeft: 10 }}
              onPress={() => {
                setShowModalDetails({
                  ...modalDetails,
                  isVisible: false,
                })
                setIsFileSuccess(false)
              }}
              labelColors={colors.white}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FilePicker
