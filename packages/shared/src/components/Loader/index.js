import { View, Text, Modal, Image } from 'react-native'
import React from 'react'
import { loader } from '@oap/assets'

const Loader = ({ showLoader }) => {
  return (
    <Modal
      visible={showLoader}
      transparent
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#000000',
          opacity: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={loader} style={{ height: 100, width: 100 }} />
      </View>
    </Modal>
  )
}

export default Loader
