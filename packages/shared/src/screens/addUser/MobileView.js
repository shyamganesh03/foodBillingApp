import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, TextInput } from "@libs/components"
import LayoutContainer from "../../container/LayoutContainer"
import { useTheme } from "@react-navigation/native"

const MobileView = ({ newEmployeeDetail, handleValueChange = () => { }, handleAddEmployee = () => { } }) => {
  const { colors } = useTheme()
  return (
    <LayoutContainer>
      <ScrollView style={{ flex: 1, }} contentContainerStyle={{ alignItems: 'center' }}>
        <TextInput placeholder="First Name" value={newEmployeeDetail.firstName} onChangeText={(value) => handleValueChange(value, 'firstName')} />
        <TextInput placeholder="Last Name" value={newEmployeeDetail.lastName} onChangeText={(value) => handleValueChange(value, 'lastName')} />
        <TextInput placeholder="Gender" value={newEmployeeDetail.gender} onChangeText={(value) => handleValueChange(value, 'gender')} />
        <TextInput placeholder="Contact Number" value={newEmployeeDetail.contactNumber} onChangeText={(value) => handleValueChange(value, 'contactNumber')} />
        <TextInput placeholder="Employee type" value={newEmployeeDetail.employeeType} onChangeText={(value) => handleValueChange(value, 'employeeType')} />
        <TextInput placeholder="Employee Role" value={newEmployeeDetail.employeeRole} onChangeText={(value) => handleValueChange(value, 'employeeRole')} />
        <TextInput placeholder="userName / email" value={newEmployeeDetail.userName} onChangeText={(value) => handleValueChange(value, 'userName')} />
        <TextInput placeholder="Password" value={newEmployeeDetail.password} onChangeText={(value) => handleValueChange(value, 'password')} />
        <Button
          label="Add Employee"
          buttonStyle={{ marginVertical: 20, width: 220 }}
          labelColors={colors.white}
          onPress={handleAddEmployee}
        />
      </ScrollView>
    </LayoutContainer>
  )
}

export default MobileView
