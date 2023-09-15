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
import { styles } from './styles'
import { Text } from '@libs/components'

const DropDown = (props) => {
  const {
    error,
    isEditMode,
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
    if (selectedItem) {
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
          height: error ? '' : 32,
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
          { borderColor: error ? colors.onAlert : '#E0E0E0' },
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
      {error ? (
        <Text variant="body2" color={colors.onAlert}>
          {error}
        </Text>
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
