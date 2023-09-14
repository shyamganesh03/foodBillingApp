const FilePicker = ({ heading = '', key }) => {
  const { colors } = useTheme()
  const filePickerRef = useRef()
  const fileTypes = ['PNG', 'JPG', 'GIF']

  const handleFilePicker = (file) => {
    console.log('worked', { file })
  }

  return (
    // <FileUploader handleChange={handleFilePicker} name="file" types={fileTypes}>
    //   <View
    //     style={{
    //       height: 81,
    //       borderRadius: 4,
    //       borderWidth: 2,
    //       padding: 5,
    //       marginTop: 10,
    //       borderColor: colors.fieldBorder,
    //       borderStyle: 'dashed',
    //       flexDirection: 'row',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Icon name="AddFile" height={41} width={41} />
    //     <View style={{ marginLeft: 10 }}>
    //       <View style={{ flexDirection: 'row' }}>
    //         <TouchableOpacity
    //           style={{
    //             backgroundColor: colors.backgroundVariant2,
    //             borderRadius: 3,
    //             marginRight: 3,
    //             paddingHorizontal: 3,
    //           }}
    //           onPress={handleFilePicker}
    //         >
    //           <Text variant="display4">Upload Files</Text>
    //         </TouchableOpacity>
    //         <Text variant="display4">or drag and drop</Text>
    //       </View>
    //       <Text variant="display4" color={colors.primaryIconColor}>
    //         {fileTypes.map((item) => item)}
    //       </Text>
    //     </View>
    //   </View>
    // </FileUploader>
    <></>
  )
}

export default FilePicker
