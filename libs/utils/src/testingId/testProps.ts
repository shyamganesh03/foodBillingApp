const testProps = (
  id: string,
): { testID: string; accessibilityLabel: string; nativeID: string } => {
  return { testID: id, accessibilityLabel: id, nativeID: id }
}

export default testProps
