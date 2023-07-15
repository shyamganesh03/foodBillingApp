import * as React from 'react'

export const navigationRef = React.createRef<any>()

export function navigate(name: string): void {
  navigationRef.current?.navigate(name)
}

export function navigateWithParams(name: string, params: any): void {
  navigationRef.current?.navigate(name, params)
}

export function getCurrent(): any {
  return navigationRef.current
}

export function reset(name: string): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name }],
  })
}
