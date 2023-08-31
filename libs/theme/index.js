import React from 'react'
import { DarkTheme } from './src/darkTheme'
import { LightTheme } from './src/lightTheme'
import { typography } from './src/typography'
import { spacing } from './src/spacing'

const ThemeContext = React.createContext({
  theme: LightTheme,
  setTheme: () => {},
})

export { ThemeContext, LightTheme, DarkTheme, typography, spacing }
