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
}: {
  width: number
  desktopComponent: React.ComponentType<any>
  tabletComponent: React.ComponentType<any>
  mobileComponent: React.ComponentType<any>
}): React.ComponentType<any> | null => {
  if (width >= desktopWidth) {
    return Desktop
  } else if (width >= tabletWidth) {
    return Tablet
  } else {
    return Mobile
  }
}

// Constants for screen types
export const ScreenTypes = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
} as const

// Returns the screen type for the given screen width
export const getScreenType = (width: number): keyof typeof ScreenTypes => {
  if (width >= desktopWidth) {
    return ScreenTypes.desktop
  } else if (width >= tabletWidth) {
    return ScreenTypes.tablet
  } else {
    return ScreenTypes.mobile
  }
}

// Returns true if the screen type is desktop, false otherwise
export const isWeb = (width: number): boolean => {
  return getScreenType(width) === ScreenTypes.desktop
}

// Higher-order component that renders different components based on screen width
export const withLayoutView = <P,>(
  DesktopComponent: React.ComponentType<P>,
  TabletComponent: React.ComponentType<P>,
  MobileComponent: React.ComponentType<P>,
): React.ComponentType<P> => {
  const LayoutView: React.FC<P> = (props) => {
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
