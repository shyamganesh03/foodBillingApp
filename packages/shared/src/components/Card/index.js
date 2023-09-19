import { View, Text } from 'react-native'
import React from 'react'

const Card = ({ children, maxWidth = 390 }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        maxWidth: maxWidth,
        borderRadius: 10,
        shadowColor: 'rgba(3, 30, 125, 0.05)',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 30,
      }}
    >
      {children}
    </View>
  )
}

export default Card
