import AsyncStorage from '@react-native-async-storage/async-storage'

export function deleteItemAsync(key) {
  return AsyncStorage.removeItem(key)
}

export function getItemAsync(key) {
  return AsyncStorage.getItem(key)
}

export function setItemAsync(key, data) {
  return AsyncStorage.setItem(key, data)
}
