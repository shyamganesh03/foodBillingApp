import React from 'react'
import { View, StyleSheet } from 'react-native'

const Row = ({ style, children, ...rest }) => (
  <View style={[styles.rowStyle, style]} {...rest}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  rowStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})

export default Row
