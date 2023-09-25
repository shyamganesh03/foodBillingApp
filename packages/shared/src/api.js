import { SecureStore } from '@libs/utils'
import { r3AppUrl } from './config'

export const apiCall = async (url, options) => {
  try {
    let config = {}
    const tempConfig = await SecureStore.getItemAsync('config')

    if (!tempConfig) {
      const response = await fetch(`${r3AppUrl}/config.json`)

      const result = await response.json()

      await SecureStore.setItemAsync('config', JSON.stringify(result))
      config = result?.config
    } else {
      config = JSON.parse(tempConfig)?.config
    }
    const requestOptions = {
      method: options?.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(options?.payload),
    }
    const response = await fetch(`${config.apiUrl}/${url}`, requestOptions)

    if (!response.ok) {
      const errorData = await response.json()
      return errorData
    }

    try {
      const data = await response.json()
      if (data) {
        return data
      }
    } catch (error) {
      const errorData = await response.json()
      return errorData
    }
  } catch (error) {
    return error
  }
}

export const getDropdownValue = async (payload) =>
  apiCall(payload.apiName, {
    method: 'GET',
  })

export const getApplicationByEmailID = async (payload) => {
  return apiCall(
    `application?email=${payload.email}&id=${payload.gusApplicationId}`,
    {
      method: 'GET',
    },
  )
}

export const getApplicationByID = async (payload) =>
  apiCall(`gus/application?id=${payload.applicationId}`, {
    method: 'GET',
  })

export const updateApplication = async (payload) =>
  apiCall(`application`, {
    method: 'PATCH',
    payload,
  })

export const createApplication = async (payload) =>
  apiCall(`application`, {
    method: 'POST',
    payload,
  })

export const getApplicationFileByID = async (payload) =>
  apiCall(`application/file/${payload.Id}/${payload.type}`, {
    method: 'GET',
  })

export const uploadFile = async (payload) =>
  apiCall(`application/file`, {
    method: 'POST',
    payload,
  })

export const deleteListItem = async (payload) =>
  apiCall(`record`, {
    method: 'DELETE',
    payload,
  })

export const deleteDocument = async (payload) =>
  apiCall(`application/file`, {
    method: 'DELETE',
    payload,
  })
