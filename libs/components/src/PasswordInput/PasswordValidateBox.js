import React, { useContext } from 'react'
import { View } from 'react-native'
import { Icon } from '@app-hero/native-icons'
import { spacing } from '@libs/theme'
import Text from '../Text/Text'
import { useTheme } from '@react-navigation/native'

const PasswordValidateBox = ({
  errorLabel,
  data,
  isFocused,
  validationTextColor,
}) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.validatorBox, { color: colors.backgroundSurface2 }]}>
      {errorLabel.length > 0 && <ErrorLabelContainer errorLabel={errorLabel} />}
      {data?.map((v, index) => (
        <View
          style={[
            styles.validatorLabelContainer,
            {
              marginBottom: index + 1 !== v?.length ? 10 : 0,
            },
          ]}
          key={index.toString()}
        >
          <RenderIcon data={v} isFocused={isFocused} />
          <Text
            variant="display3"
            color={
              !v?.checkStatus && !isFocused
                ? colors.onAlert
                : validationTextColor || colors.neutral
            }
            style={{ marginLeft: spacing.spacing3 }}
          >
            {v.checkLabel}
          </Text>
        </View>
      ))}
    </View>
  )
}

const ErrorLabelContainer = ({ errorLabel }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: spacing.spacing3,
      }}
    >
      <Icon
        color={colors.onAlert}
        height={13.33}
        name="Exclamation"
        width={13.33}
      />
      <Text
        color={colors.onAlert}
        style={{
          marginLeft: 3.33,
        }}
        variant="display3"
      >
        {errorLabel}
      </Text>
    </View>
  )
}

const RenderIcon = (props) => {
  const { data, isFocused } = props
  const { colors } = useTheme()
  if (!data?.checkStatus && !isFocused) {
    return (
      <View
        style={[
          styles.validateErrorTickContainer,
          { backgroundColor: colors.onAlert },
        ]}
      >
        <Icon name="Close" color={colors.white} width={14} height={14} />
      </View>
    )
  }
  if (data?.checkStatus) {
    return (
      <View
        style={[
          styles.validateTickContainer,
          { backgroundColor: colors.success },
        ]}
      >
        <Icon name="Check" color={colors.white} width={14} height={14} />
      </View>
    )
  }
  return (
    <View
      style={[
        styles.inValidateTickContainer,
        { borderColor: colors.fieldBorder },
      ]}
    />
  )
}

const styles = {
  validatorBox: {
    paddingVertical: spacing.spacing4,
    paddingHorizontal: spacing.spacing5,
    width: '100%',
    borderRadius: 8,
    marginBottom: spacing.spacing3,
  },
  validatorLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validateTickContainer: {
    padding: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validateErrorTickContainer: {
    padding: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inValidateTickContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    width: 14,
    height: 14,
    borderRadius: 50,
  },
}

export default PasswordValidateBox
