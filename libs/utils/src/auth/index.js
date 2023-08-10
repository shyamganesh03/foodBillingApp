import { Auth } from 'aws-amplify'

export const forgotPasswordAsync = async (userName) => {
  try {
    const res = await Auth.forgotPassword(userName)
    console.log({ res })
  } catch (error) {
    return error
  }
}

export const resetPasswordAsync = async (username, code, newPassword) => {
  try {
    const res = await Auth.forgotPasswordSubmit(username, code, newPassword)
    console.log({ res })
  } catch (error) {
    return error
  }
}

export const changePasswordAsync = async (currentPassword, newPassword) => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const res = await Auth.changePassword(user, currentPassword, newPassword)
    console.log(res)
  } catch (error) {
    console.log({ error })
  }
}

export const completeNewPasswordAsync = async (user, newPassword) => {
  try {
    const res = await Auth.completeNewPassword(user, newPassword)
    if (res) {
      console.log(res)
    }
  } catch (error) {
    console.log({ error })
  }
}
