import React, { Suspense, useCallback, useState } from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { ScreenLayout } from '@libs/utils'
import { Text } from '@libs/components'
import MobileView from './MobileView'

const AddUser = () => {
  const [newEmployeeDetail, setNewEmployeeDetail] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    employeeType: "",
    employeeRole: "",
    userName: "",
    password: ""
  })
  const db = database()
  const authentication = auth()

  const handleAddEmployee = async () => {
    const employeeData = { ...newEmployeeDetail }
    delete employeeData['password']

    await db.ref(`/employee/${newEmployeeDetail?.userName}`).set(newEmployeeDetail)
    authentication.createUserWithEmailAndPassword(newEmployeeDetail?.userName, newEmployeeDetail?.password)
  }

  const handleValueChange = (value, fieldName) => {
    setNewEmployeeDetail((prev) => ({ ...prev, [fieldName]: value }))
  }


  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(MobileView, MobileView, MobileView),
    [],
  )

  const viewProps = { newEmployeeDetail, handleValueChange, handleAddEmployee }

  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default AddUser
