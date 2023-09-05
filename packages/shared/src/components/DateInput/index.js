import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { Icon } from '@r3-oaf/native-icons'
import Text from '../Text'
import TextInput from '../TextInput'
import { spacing } from '@libs/theme'
import { useTheme } from '@react-navigation/native'
import { Menu, TouchableRipple } from 'react-native-paper'

const DateInput = (props) => {
  const {
    label,
    placeholder,
    dob,
    value,
    data,
    onChangeText = () => {},
    error,
    title = '',
    isMandatory,
    textInputWidth,
    style,
  } = props
  const [isHovered, setIsHovered] = useState(false)
  const [yearVisible, setYearVisible] = useState(false)
  const { colors } = useTheme()
  const DropdownButton = useRef()
  const [visible, setVisible] = useState(false)
  const [dropDownWidth, setDropDownWidth] = useState(0)
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropDownLeft, setDropDownLeft] = useState(0)
  const [yearDropDownWidth, setYearDropDownWidth] = useState(0)
  const [yearDropdownTop, setYearDropdownTop] = useState(0)
  const [yearDropDownLeft, setYearDropDownLeft] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const minYear = new Date().getFullYear() - 100
  const maxYear = dob
    ? new Date().getFullYear() - 15
    : new Date().getFullYear() + 100
  const currentYear = new Date().getFullYear()
  const defaultValue =
    value || `${currentYear}-${new Date().toISOString().slice(5, 10)}`
  const [selectedYear, setSelectedYear] = useState(defaultValue.slice(0, 4))
  const [selectedMonth, setSelectedMonth] = useState(defaultValue.slice(5, 7))
  const [selectedDay, setSelectedDay] = useState(defaultValue.slice(8, 10))
  const yearDropDown = useRef()

  const yearScrollViewRef = useRef(null)
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handleMonthChange = (month) => {
    setSelectedMonth(month.month)
  }
  const yearItems = []
  for (let year = minYear; year <= maxYear; year++) {
    yearItems.push(year)
  }

  useEffect(() => {
    let inputDate = defaultValue
    if (typeof inputDate === 'string') {
      inputDate = new Date(defaultValue)
    }
    setSelectedYear(inputDate.getFullYear())
    setSelectedMonth((inputDate.getMonth() + 1).toString().padStart(2, '0'))
    setSelectedDay((inputDate.getDate() + 1).toString().padStart(2, '0'))
  }, [])

  useEffect(() => {
    if (!yearVisible) return
    const selectedYearIndex = yearItems.findIndex(
      (year) => year === selectedYear,
    )

    setTimeout(() => {
      if (selectedYearIndex !== -1) {
        const yearItemHeight = 48
        const scrollToOffset = selectedYearIndex * yearItemHeight
        yearScrollViewRef.current?.scrollTo({
          y: scrollToOffset + 200,
          animated: true,
        })
      }
    }, 400)
  }, [yearVisible])

  const toggleDropdown = () => (visible ? setVisible(false) : openDropdown())
  const toggleYearDropdown = () =>
    yearVisible ? setYearVisible(false) : openYearDropdown()

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py)
      setDropDownLeft(_px - _fx)
      setDropDownWidth(_w)
      setVisible(true)
    })
  }

  const openYearDropdown = () => {
    yearDropDown.current.measure((_fx, _fy, _w, h, _px, py) => {
      setYearDropdownTop(py + h)
      setYearDropDownLeft(_px + _fx / 5)
      setYearDropDownWidth(_w - _fx / 5)
      setYearVisible(true)
    })
  }

  const handleCurrentDate = () => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const fullDate = `${currentYear}-${
      currentMonth.toString().length > 1 ? currentMonth : '0' + currentMonth
    }-${currentDate.toString().length > 1 ? currentDate : '0' + currentDate}`
    setSelectedDate(fullDate)
    onChangeText(fullDate)
    setSelectedYear(currentYear)
    setSelectedMonth(currentMonth)
    setSelectedDay(currentDate)
    setVisible(false)
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text>{month?.find((item, index) => selectedMonth - 1 === index)}</Text>
        <TouchableOpacity
          onPress={() => toggleYearDropdown()}
          ref={yearDropDown}
        >
          <View
            style={{
              paddingLeft: 16,
              alignItems: 'center',
            }}
          >
            <TextInput
              value={selectedYear.toString()}
              style={{
                height: 24,
                paddingTop: 0,
              }}
              textInputWidth={100}
              onChangeText={(itemValue) => {
                setSelectedYear(itemValue)
              }}
              editable={false}
            />
            <Icon
              name="ArrowDown"
              color={colors.onNeutral}
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                right: spacing.spacing3,
                top: Platform.OS === 'web' ? '10%' : '20%',
                transform: [{ rotate: '180deg' }],
              }}
            />
            <Icon
              name="ArrowDown"
              color={colors.onNeutral}
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                right: spacing.spacing3,
                top: Platform.OS === 'web' ? '30%' : '20%',
              }}
            />
          </View>
        </TouchableOpacity>
        <Modal id="model" visible={yearVisible} transparent>
          <View
            style={{
              top: yearDropdownTop,
              left: yearDropDownLeft,
              width: yearDropDownWidth,
              backgroundColor: 'red',
            }}
          >
            <ScrollView
              ref={yearScrollViewRef}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              style={{
                height: 200,
              }}
            >
              <View
                style={{
                  shadowColor: 'rgba(3, 30, 125, 0.05)',
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 5,
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                }}
              >
                {yearItems?.map((_item, index) => {
                  return (
                    <Fragment key={index}>
                      <TouchableRipple
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 12,
                        }}
                        onPress={() => {
                          setSelectedYear(_item)
                          setYearVisible(false)
                        }}
                        id={_item}
                      >
                        <Text>{_item}</Text>
                        {/* <Menu.Item
                        title={_item}
                        titleStyle={{ color: colors.onNeutral }}
                      /> */}
                      </TouchableRipple>
                    </Fragment>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  }

  const renderDropdown = () => (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={{
          top: dropdownTop,
          left: dropDownLeft,
          width: dropDownWidth,
          backgroundColor: '#FFFFFF',
          paddingBottom: 10,
        }}
      >
        <Calendar
          key={selectedYear}
          enableSwipeMonths={true}
          current={`${selectedYear}-${selectedMonth}-${selectedDay}`}
          minDate={`${minYear}-01-01`}
          maxDate={`${maxYear}-12-31`}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={(day) => {
            const fullDate = `${day.year}-${
              day.month.toString().length > 1 ? day.month : '0' + day.month
            }-${day.day.toString().length > 1 ? day.day : '0' + day.day}`
            onChangeText(fullDate)
            setSelectedDate(fullDate)
            setSelectedYear(day.year)
            setSelectedMonth(day.month)
            setSelectedDay(day.day)
            setVisible(false)
          }}
          renderHeader={renderHeader}
          onMonthChange={(month) => handleMonthChange(month)}
          renderArrow={(direction) => (
            <Icon
              name="ArrowNarrowLeft"
              color={colors.onNeutral}
              width={20}
              height={20}
              style={{
                transform:
                  direction === 'left'
                    ? [{ rotate: '360deg' }]
                    : [{ rotate: '180deg' }],
              }}
            />
          )}
        />
        <TouchableOpacity
          onPress={() => handleCurrentDate()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          style={{ alignSelf: 'center' }}
        >
          <Text
            variant="display5"
            style={{
              textDecoration: isHovered ? 'underline' : 'none',
            }}
            color="#3558D6"
          >
            Today
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )

  return (
    <View>
      <TouchableOpacity
        ref={DropdownButton}
        onPress={() => {
          toggleDropdown()
        }}
        style={style}
      >
        <View style={{ flexDirection: 'row' }}>
          {isMandatory ? (
            <Text variant="display5" color={colors.onAlert}>
              *{' '}
            </Text>
          ) : null}
          <Text variant="display4">{title}</Text>
        </View>
        {renderDropdown()}
        <TextInput
          label={label}
          placeholder={placeholder}
          right={<TextInput.Affix />}
          value={value || selectedDate}
          maxLength={data?.maxLength}
          trailingIcon={
            <Icon
              name="CalenderFilled"
              height={20}
              width={20}
              color={colors.placeHolder}
            />
          }
          error={error}
          onFocus={() => {
            props?.onFocus?.()
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default DateInput
