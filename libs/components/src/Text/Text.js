import { Text as TextElement, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const Text = (props) => {
  const {
    children,
    color = '',
    numberOfLines,
    style = {},
    textAlign,
    variant = '',
  } = props

  return (
    <TextElement
      style={StyleSheet.flatten([{ textAlign, color: color }, style])}
      numberOfLines={numberOfLines}
    >
      {children}
    </TextElement>
  )
}

const variants = [
  'body1',
  'body2',
  'bodyBold1',
  'bodyBold2',
  'bodyCompact2',
  'bodyCompactBold2',
  'display1',
  'display2',
  'display3',
  'display4',
  'functional1',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'utility1',
  'utility2',
  'utilityBold2',
  'utilityCompact2',
]

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(variants),
}

Text.defaultProps = {
  color: '',
  textAlign: 'left',
  variant: 'bodyCompactBold2',
}

Text.variants = variants

export default Text
