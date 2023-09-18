import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, Modal, TouchableOpacity, View } from 'react-native'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'
import { Text } from '@libs/components'
import { countryCodes } from '@libs/utils'
import { styles } from './styles'

function DropDown(props) {
  const {
    onError,
    errorMessage,
    dialCode,
    disable,
    items = [],
    itemIndex,
    onPress = () => {},
    hideLabel,
    position,
    hasFullWidth = false,
    isOutLine,
    isCountryCode = false,
    toggleDropdown,
    selectedItem,
    style,
    dropdownWidth,
  } = props

  const DropdownButton = useRef()
  const isFocused = useIsFocused()
  const [showDropDown, setShowDropDown] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const dropDownAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let dropdownHeight
    if (showDropDown) {
      if (items.length > 4) {
        dropdownHeight = 200
      } else {
        dropdownHeight = 150
      }
      Animated.timing(dropDownAnim, {
        toValue: dropdownHeight,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }, [showDropDown])

  const handleDropDownClose = () => {
    Animated.timing(dropDownAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShowDropDown(false)
    })
  }

  const { colors } = useTheme()

  const getDropDownStyle = () => {
    if (!hideLabel && !isOutLine) {
      return styles.dropDownContainer
    }
    if (isOutLine) {
      return styles.dropDownOutLineContainer
    }
    return ''
  }

  useEffect(() => {
    if (!isFocused) return
    if (isCountryCode) {
      const selectedCountryCode = countryCodes.filter(
        (item) => item.dial_code === dialCode,
      )
      const selectedCountry = {
        name:
          selectedCountryCode?.length > 0
            ? `${selectedCountryCode[0].flag} ${selectedCountryCode[0].dial_code}`
            : `${items[0].flag}   ${items[0].dial_code}`,
      }
      setSelectedOption(selectedCountry)
    } else if (selectedItem) {
      setSelectedOption(selectedItem)
    } else {
      setSelectedOption({ name: 'Select an option' })
    }
  }, [isFocused, selectedItem])

  return (
    <View
      ref={DropdownButton}
      style={[
        { position: 'relative' },
        {
          width: hasFullWidth ? '100%' : 325,
          height: onError ? '' : 32,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={
          !disable
            ? () => {
                setShowDropDown(!showDropDown)
                toggleDropdown(showDropDown, DropdownButton)
              }
            : null
        }
        style={[
          getDropDownStyle(),
          {
            opacity: disable ? 0.8 : 1,
          },
          isCountryCode
            ? {
                borderRadius: 0,
                backgroundColor: colors.backgroundVariant,
                borderWidth: 0,
              }
            : {},
          { borderColor: onError ? colors.onAlert : '#E0E0E0' },
        ]}
        disabled={disable}
      >
        {selectedOption?.image && (
          <Image
            source={selectedOption?.image}
            style={{
              height: hideLabel ? 40 : 11,
              width: hideLabel ? 40 : 20,
              borderRadius: hideLabel ? 20 : 0,
            }}
          />
        )}
        {!hideLabel && (
          <Text
            variant="body2"
            color={colors.onNeutral}
            style={{ marginRight: 6, marginLeft: isCountryCode ? 0 : 6 }}
          >
            {selectedOption?.name || selectedOption}
          </Text>
        )}
        {!hideLabel && (
          <Icon
            name="ArrowDown"
            height={16}
            width={16}
            style={{ opacity: disable ? 0.5 : 1 }}
          />
        )}
      </TouchableOpacity>

      {showDropDown ? (
        <Modal
          transparent
          visible={showDropDown}
          onBackdropPress={() => handleDropDownClose()}
          onRequestClose={() => {
            handleDropDownClose()
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleDropDownClose()}
          >
            <Animated.ScrollView
              style={{
                height: dropDownAnim,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={[
                  styles.dropDownList,
                  position,
                  { width: dropdownWidth || '' },
                ]}
              >
                {items?.map((item, index) => (
                  <DropDownItem
                    itemIndex={itemIndex}
                    item={item}
                    index={index}
                    isCountryCode={isCountryCode}
                    setSelectedOption={setSelectedOption}
                    handleDropDownClose={handleDropDownClose}
                    onPress={onPress}
                  />
                ))}
              </View>
            </Animated.ScrollView>
          </TouchableOpacity>
        </Modal>
      ) : null}
      {onError ? (
        <Text
          variant="body1"
          color={colors.onAlert}
          style={{ marginTop: 4, fontSize: 12 }}
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  )
}

function DropDownItem({
  item,
  index,
  isCountryCode,
  setSelectedOption,
  onPress,
  handleDropDownClose,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { colors } = useTheme()

  const handleOptionSelected = (selectedOption) => {
    if (isCountryCode) {
      const selectedCountry = {
        name: `${selectedOption.flag} ${selectedOption.dial_code}`,
      }
      setSelectedOption(selectedCountry)
      onPress(selectedCountry)
    } else {
      setSelectedOption(selectedOption)
      onPress(selectedOption?.name || selectedOption)
    }

    handleDropDownClose()
  }

  return (
    <TouchableOpacity
      key={index}
      style={[
        [
          styles.dropDownListContainer,
          { paddingVertical: isCountryCode ? 0 : '' },
        ],
        { backgroundColor: isHovered ? colors.primaryVariant1 : '' },
      ]}
      onPress={() => handleOptionSelected(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <View
        style={[
          styles.item,
          {
            borderBottomWidth: isCountryCode ? 1 : 0,
            borderColor: colors.placeHolder,
            marginVertical: 10,
          },
        ]}
      >
        {isCountryCode ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flex: 1,
              maxWidth: '50%',
              paddingVertical: 10,
            }}
          >
            <Text variant="body2" color={colors.onNeutral}>
              {item.flag}
            </Text>
            <Text variant="body2" color={colors.onNeutral}>
              {item.dial_code}
            </Text>
          </View>
        ) : (
          <Text variant="body2" color={colors.onNeutral}>
            {item.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default DropDown
