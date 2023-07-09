import * as React from 'react'

export const navigationRef = React.createRef()
export function navigate(name) {
  navigationRef.current?.navigate(name)
}

export function navigateWithParams(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function getCurrent() {
  return navigationRef.current
}

export function reset(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name }],
  })
}
