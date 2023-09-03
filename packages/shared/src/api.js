import { apiUrl } from './config'

export const apiCall = async (url, options) => {
  try {
    const requestOptions = {
      method: options?.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'x-api-key': apiKey,
      },

      body: JSON.stringify(options?.payload),
    }
    const response = await fetch(`${apiUrl}/${url}`, requestOptions)

    if (!response.ok) {
      return response
    }

    try {
      const data = await response.json()
      if (data) {
        return data
      }
    } catch (error) {
      return response
    }
  } catch (error) {
    return error
  }
}

export const getDropdownData = async (payload) =>
  apiCall(payload.apiName, {
    method: 'GET',
  })

export const getApplicationByEmailID = async (payload) =>
  apiCall(`application/${payload.email}`, {
    method: 'GET',
  })

export const updateApplication = async (payload) =>
  apiCall(`application`, {
    method: 'PATCH',
    payload,
  })

export const submitApplication = async (payload) =>
  apiCall(`application`, {
    method: 'POST',
    payload,
  })