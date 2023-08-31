import React, { Fragment, useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { Menu, TouchableRipple } from 'react-native-paper'
import { Calendar } from 'react-native-calendars'
import { Icon } from '@r3-oaf/native-icons'
import Text from '../Text'
import TextInput from '../TextInput'
import { spacing } from '@libs/theme'
import { useTheme } from '@react-navigation/native'

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
    style,
  } = props
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [yearVisible, setYearVisible] = useState(false)
  const { colors } = useTheme()
  const minYear = new Date().getFullYear() - 100
  const currentYear = dob
    ? new Date().getFullYear() - 15
    : new Date().getFullYear() + 100
  const defaultValue =
    value || `${currentYear}-${new Date().toISOString().slice(5, 10)}`
  const [selectedYear, setSelectedYear] = useState(defaultValue.slice(0, 4))
  const [selectedMonth, setSelectedMonth] = useState(defaultValue.slice(5, 7))
  const [selectedDay, setSelectedDay] = useState(defaultValue.slice(8, 10))

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
  for (let year = minYear; year <= currentYear; year++) {
    yearItems.push(year)
  }
  useEffect(() => {
    if (!yearVisible) return
    const selectedYearIndex = yearItems.findIndex(
      (year) => year === selectedYear,
    )
    setTimeout(() => {
      if (selectedYearIndex !== -1) {
        const yearItemHeight = 48
        const scrollToOffset = selectedYearIndex * yearItemHeight
        yearScrollViewRef.current.scrollTo({
          y: scrollToOffset,
          animated: true,
        })
      }
    }, 400)
  }, [selectedYear, yearItems, yearVisible])

  const handleCurrentDate = () => {
    const currentYear = new Date().getFullYear()
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    onChangeText(
      `${currentYear}-${
        currentMonth.toString().length > 1 ? currentMonth : '0' + currentMonth
      }-${currentDate.toString().length > 1 ? currentDate : '0' + currentDate}`,
    ),
      setSelectedYear(currentYear),
      setSelectedMonth(currentMonth),
      setSelectedDay(currentDate),
      setIsVisible(false)
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

        <Menu
          visible={yearVisible}
          anchorPosition="bottom"
          onDismiss={() => setYearVisible(false)}
          contentStyle={{ backgroundColor: colors.white, marginLeft: 15 }}
          anchor={
            <TouchableOpacity onPress={() => setYearVisible(!yearVisible)}>
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
          }
        >
          <ScrollView
            ref={yearScrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            style={{
              height: 200,
              width: 100,
              backgroundColor: colors.white,
            }}
          >
            {yearItems?.map((_item, index) => {
              return (
                <Fragment key={index}>
                  <TouchableRipple
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setSelectedYear(_item)
                      setYearVisible(false)
                    }}
                  >
                    <Menu.Item
                      title={_item}
                      titleStyle={{ color: colors.onNeutral }}
                    />
                  </TouchableRipple>
                </Fragment>
              )
            })}
          </ScrollView>
        </Menu>
      </View>
    )
  }

  return (
    <View
      style={[
        {
          // alignSelf: 'flex-end',
          // marginBottom: 10,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        {isMandatory ? (
          <Text variant="display5" color={colors.onAlert}>
            *{' '}
          </Text>
        ) : null}
        <Text variant="display4">{title}</Text>
      </View>
      <Menu
        visible={isVisible}
        anchorPosition="bottom"
        onDismiss={() => setIsVisible(false)}
        anchor={
          <View>
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={{ height: 32, width: 325 }}
            >
              <TextInput
                label={label}
                placeholder={placeholder}
                trailingIcon={
                  <Icon
                    name="CalenderFilled"
                    height={20}
                    width={20}
                    color={colors.placeHolder}
                  />
                }
                value={value || null}
                maxLength={data?.maxLength}
                error={error}
                onFocus={() => {
                  props?.onFocus?.()
                }}
              />
            </TouchableOpacity>
          </View>
        }
        contentStyle={{ backgroundColor: colors.white }}
      >
        <Calendar
          key={selectedYear}
          enableSwipeMonths={true}
          current={`${selectedYear}-${selectedMonth}-${selectedDay}`}
          minDate={`${minYear}-01-01`}
          maxDate={`${currentYear}-12-31`}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={(day) => {
            onChangeText(
              `${day.year}-${
                day.month.toString().length > 1 ? day.month : '0' + day.month
              }-${day.day.toString().length > 1 ? day.day : '0' + day.day}`,
            ),
              setSelectedYear(day.year),
              setSelectedMonth(day.month),
              setSelectedDay(day.day),
              setIsVisible(false)
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
      </Menu>
    </View>
  )
}

export default DateInput
