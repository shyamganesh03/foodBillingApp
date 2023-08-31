import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  Modal,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { Icon } from '@r3-oaf/native-icons'
import Text from '../Text'
import { styles } from './styles'

const DropDown = (props) => {
  const {
    disable,
    label,
    items = [],
    itemIndex,
    onPress = () => {},
    hideLabel,
    position,
    hasFullWidth = false,
    isOutLine,
    isCountryCode = false,
    toggleDropdown,
    style,
    dropdownWidth,
    dropdownHeight = 115,
  } = props

  const DropdownButton = useRef()
  const isFocused = useIsFocused()

  const [showDropDown, setShowDropDown] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const dropDownAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (showDropDown) {
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

    const selectedItem = items?.filter(
      (filterItem) => filterItem.isSelected === true,
    )
    if (selectedItem?.length === 0)
      setSelectedOption({ label: 'Select an option' })
    // else if (label) {
    //   setSelectedOption({ label: label, isPlaceholder: true })
    // }
  }, [isFocused])

  return (
    <View
      ref={DropdownButton}
      style={[
        { position: 'relative' },
        {
          width: hasFullWidth ? '100%' : 325,
          height: 32,
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
            variant={'body2'}
            color={
              selectedOption?.isPlaceholder
                ? colors.placeHolder
                : colors.onNeutral
            }
            style={{ marginRight: 6, marginLeft: isCountryCode ? 0 : 6 }}
          >
            {selectedOption?.label}
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
            <View
              style={[
                styles.dropDownList,
                position,
                { width: dropdownWidth || '' },
              ]}
            >
              <Animated.ScrollView
                style={{
                  height: dropDownAnim,
                }}
                showsVerticalScrollIndicator={false}
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
              </Animated.ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}

const DropDownItem = ({
  item,
  index,
  isCountryCode,
  setSelectedOption,
  onPress,
  handleDropDownClose,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { colors } = useTheme()

  const handleOptionSelected = (selectedOption) => {
    if (isCountryCode) {
      const selectedCountry = {
        label: `${selectedOption.flag} ${selectedOption.dial_code}`,
      }
      setSelectedOption(selectedCountry)
      onPress(selectedCountry)
    } else {
      setSelectedOption(selectedOption)
      onPress(selectedOption)
    }

    handleDropDownClose()
  }

  return (
    <TouchableOpacity
      key={index}
      style={[
        styles.dropDownListContainer,
        { backgroundColor: isHovered ? colors.primaryVariant1 : '' },
      ]}
      onPress={() => handleOptionSelected(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <View style={styles.item}>
        <Text variant="display3" color={colors.onNeutral}>
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default DropDown
