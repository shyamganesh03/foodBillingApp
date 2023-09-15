import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const useFadeInAnimation = (duration = 300) => {
  // check if the current screen is focused
  const isFocused = useIsFocused()
  // fadeIn is used to control the opacity of the View animation.
  const fadeIn = useRef(new Animated.Value(0)).current

  // create an animation that updates the fadeIn value to 0 over a duration of 300 milliseconds using the native driver
  const openAnim = Animated.timing(fadeIn, {
    toValue: 1, // specifies that the animation should end with a final value of 1 for fadeIn
    duration, // specifies the duration of the animation in milliseconds.
    useNativeDriver: true, // this allows the animation to run on the device's native UI thread for better performance
  })

  // start the openAnim animation when the component is focused
  useEffect(() => {
    if (!isFocused) return
    openAnim.start()
  }, [isFocused])

  return fadeIn
}

export default useFadeInAnimation
