import { SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from "@react-navigation/native"

const LayoutContainer = ({ children }) => {
    const { colors } = useTheme()
    return (
        <SafeAreaView style={styles({ colors }).container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default LayoutContainer