import React from 'react'
import { useWindowDimensions } from 'react-native'

// Constants for screen minimum width
const desktopWidth = 768
const tabletWidth = 375

// Returns the appropriate component for the given screen width
export const getScreenTypeLayout = ({
  width,
  desktopComponent: Desktop,
  tabletComponent: Tablet,
  mobileComponent: Mobile,
}) => {
  if (width >= desktopWidth) {
    return Desktop
  }
  if (width >= tabletWidth) {
    return Tablet
  }
  return Mobile
}

// Constants for screen types
export const ScreenTypes = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
}

// Returns the screen type for the given screen width
export const getScreenType = (width) => {
  if (width >= desktopWidth) {
    return ScreenTypes.desktop
  }
  if (width >= tabletWidth) {
    return ScreenTypes.tablet
  }
  return ScreenTypes.mobile
}

// Returns true if the screen type is desktop, false otherwise
export const isWeb = (width) => getScreenType(width) === ScreenTypes.desktop

// Higher-order component that renders different components based on screen width
export const withLayoutView = (
  DesktopComponent,
  TabletComponent,
  MobileComponent,
) => {
  function LayoutView(props) {
    const { width } = useWindowDimensions()
    const ScreenComponent = getScreenTypeLayout({
      width,
      desktopComponent: DesktopComponent,
      tabletComponent: TabletComponent,
      mobileComponent: MobileComponent,
    })
    if (ScreenComponent) {
      return <ScreenComponent {...props} />
    }
    return null
  }

  return LayoutView
}
