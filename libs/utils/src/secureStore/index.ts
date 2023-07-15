import AsyncStorage from '@react-native-community/async-storage'

export function deleteItemAsync(key: string): Promise<void> {
  return AsyncStorage.removeItem(key)
}

export function getItemAsync(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key)
}

export function setItemAsync(key: string, data: string): Promise<void> {
  return AsyncStorage.setItem(key, data)
}
