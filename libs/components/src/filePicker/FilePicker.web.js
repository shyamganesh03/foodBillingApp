import { Icon } from '@r3-oaf/native-icons'
import { Text } from '@libs/components'
import { useIsFocused, useTheme } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'

const FilePicker = ({
  documentType,
  heading = '',
  isMandatory,
  uploadFile = () => {},
  successState,
  isMultiUpload,
  uploadedFiles,
  handleDelete,
  key,
}) => {
  const { colors } = useTheme()
  const [files, setFiles] = useState([])
  const [error, setError] = useState()
  const isFocused = useIsFocused()
  const documentRef = useRef()
  const fileTypes = ['application/pdf', 'image/png', 'application/msword']
  useEffect(() => {
    if (!isFocused) return

    if (uploadedFiles?.length > 0) {
      let files = []
      uploadedFiles?.map((file) => {
        file.documentLinkedId &&
          files.push({ documentName: file.Title, id: file.documentLinkedId })
      })
      setFiles(files)
    } else {
      setFiles([])
    }
  }, [isFocused, uploadedFiles])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = async (event) => {
    setError('')
    event.preventDefault()
    const uploadedFile = event.dataTransfer.files[0]
    let filesCopy = [...files, { documentName: uploadedFile.name }]
    setFiles(filesCopy)
    const base64Docs = await getBase64(uploadedFile)
    uploadFile({
      file: base64Docs.split(',')[1],
      path: uploadedFile.name,
      pathName: uploadedFile.name.split('.')[0],
      fileType: documentType,
    })
  }

  const getBase64 = async (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleFileDelete = async (fileData, setIsDeleteCallFetching) => {
    setIsDeleteCallFetching(true)
    await handleDelete({ id: fileData.id, fileType: documentType })
    setIsDeleteCallFetching(false)
  }

  const handleFilePicker = async (event) => {
    setError('')
    const uploadedFile = event.target.files[0]

    let filesCopy = [...files, { documentName: uploadedFile.name }]
    if (uploadedFile.size > 5e6) {
      toast.show('Please upload a file that is less than 5 MB.', {
        type: 'danger',
      })
      return
    }
    // if (!fileTypes.includes(uploadedFile.type)) {
    //   toast.show('please upload the valid file type', {
    //     type: 'danger',
    //   })
    //   return
    // }

    setFiles(filesCopy)
    const duplicateFile = filesCopy.filter(
      (file) => file.documentName === uploadedFile.name?.split('.')[0],
    )
    if (duplicateFile.length > 1 && files?.length > 1) {
      setError('DuplicateFile not allowed')
    } else {
      const base64Docs = await getBase64(uploadedFile)
      await uploadFile({
        file: base64Docs.split(',')[1],
        path: uploadedFile.name,
        pathName: uploadedFile.name.split('.')[0],
        fileType: documentType,
      })
    }
  }

  return (
    <View style={{ marginBottom: 30 }}>
      {' '}
      <Text variant="heading2" style={{ marginBottom: 10 }}>
        {heading}{' '}
        {isMandatory ? (
          <Text variant="heading2" color={colors.onAlert}>
            *
          </Text>
        ) : null}
      </Text>
      <View
        key={key}
        style={{
          borderRadius: 4,
          borderWidth: 2,
          marginTop: 2,
          borderColor: colors.fieldBorder,
          borderStyle: 'dashed',
          maxWidth: '50%',
        }}
      >
        {(files?.length === 0 && !isMultiUpload) || isMultiUpload ? (
          <form
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onSubmit={(e) => {
              handleFilePicker(e)
            }}
          >
            <View>
              <View
                style={{
                  height: 81,
                  borderRadius: 4,
                  padding: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Icon name="AddFile" height={41} width={41} />
                <View style={{ marginLeft: 10, flexWrap: 'wrap', flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text variant="display4">{`Drop ${
                      isMultiUpload ? 'files' : 'file'
                    } to attach, or `}</Text>
                    <TouchableOpacity
                      onPress={() => documentRef.current.click()}
                    >
                      <Text
                        variant="display4"
                        color={colors.onAlert}
                        style={{ textDecoration: 'underline' }}
                      >
                        browse
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text variant="display4" color={colors.primaryIconColor}>
                    doc, docx, jpg, jpeg, png, gif, pdf, svg, bmp, odt
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
        ) : null}
        <View>
          {files?.map((fileItem, index) => {
            return (
              <UploadedFileContainer
                fileItem={fileItem}
                handleFileDelete={handleFileDelete}
                successState={successState}
                showBorder={files?.length > 1 && files?.length - 1 !== index}
              />
            )
          })}
        </View>
      </View>
      {error ? (
        <Text variant="body1" color={colors.onAlert} style={{ marginTop: 5 }}>
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const UploadedFileContainer = ({
  fileItem,
  handleFileDelete,
  successState,
  showBorder,
}) => {
  const [isDeleteCallFetching, setIsDeleteCallFetching] = useState()
  const { colors } = useTheme()
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: colors.border,
          borderBottomWidth: showBorder ? 2 : 0,
          paddingVertical: 20,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon name="ImageIcon" height={18} width={18} />
          <Text variant="body2" style={{ marginHorizontal: 10 }}>
            {fileItem.documentName}
          </Text>
          {fileItem.documentName !== successState?.path ? (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 10,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Icon name="Check" height={8} width={8} color={colors.white} />
            </View>
          ) : (
            <ActivityIndicator size={10} />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            handleFileDelete(fileItem, setIsDeleteCallFetching)
          }}
        >
          {isDeleteCallFetching ? (
            <ActivityIndicator size={18} />
          ) : (
            <Icon name="DeleteIcon" height={18} width={18} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FilePicker
