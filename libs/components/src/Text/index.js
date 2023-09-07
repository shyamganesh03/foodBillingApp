import { Text as TextElement, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { typography } from '@libs/theme'

const Text = (props) => {
  const {
    children,
    color,
    numberOfLines,
    style = {},
    textAlign,
    variant = '',
  } = props

  return (
    <TextElement
      style={StyleSheet.flatten([
        typography[variant],
        { textAlign, color },
        style,
      ])}
      numberOfLines={numberOfLines}
    >
      {children}
    </TextElement>
  )
}

const variants = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'bodyBold1',
  'display1',
  'display2',
  'display3',
  'display4',
  'display5',
  'body1',
  'body2',
]

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(variants),
}

Text.defaultProps = {
  color: '#424242',
  textAlign: 'left',
  variant: 'body1',
}

Text.variants = variants

export default Text