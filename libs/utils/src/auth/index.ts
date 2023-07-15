import { Auth } from 'aws-amplify'

export const forgotPasswordAsync = async (userName: string) => {
  try {
    const res = await Auth.forgotPassword(userName)
    return res
  } catch (error) {
    console.log(error)
    return error as Error
  }
}

export const resetPasswordAsync = async (
  username: string,
  code: string,
  new_password: string,
) => {
  try {
    const res = await Auth.forgotPasswordSubmit(username, code, new_password)
    if (res) {
      return res
    }
  } catch (error) {
    console.log(error)
    return error as Error
  }
}

export const changePasswordAsync = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const res = await Auth.changePassword(user, currentPassword, newPassword)
    return res
  } catch (error) {
    console.log(error)
    return error as Error
  }
}

export const completeNewPasswordAsync = async (
  user: string,
  newPassword: string,
) => {
  try {
    const res = await Auth.completeNewPassword(user, newPassword)
    return res
  } catch (error) {
    console.log(error)
    return error as Error
  }
}
