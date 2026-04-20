import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const NewForgotPassword = () => {

    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    })

  const handleSubmit = async () => {
    router.replace("/(user)/(auth)/Login")
  }
 
  return (
    <SafeAreaView className='h-full flex-1 text-white'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-4'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                      <Text className="text-2xl font-psbold text-orange">Create New Password</Text>
                      <Text className="mt-2 font-mmedium text-center px-6">Input your new password</Text>
                        <FormField title="New password" value={form.password} placeholder="Enter Your New Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-8"/>
                        <FormField title="Confirm new password" value={form.confirmPassword} placeholder="Confirm New Password" handleChangeText={(e: any) => setForm({ ...form, confirmPassword: e })} otherStyles="mt-4"/>
                      <View className='w-full justify-center my-6'>
                        <CustomButton title="Continue"handlePress={handleSubmit}  containerStyles="w-full mt-8" textStyles='text-white'/>
                      </View>
                      <View className='w-full justify-center mb-7'>
                        <CustomButton title="Cancel" handlePress={() => router.replace("/(user)/(auth)/Login")} containerStyles="w-full border border-black" bgColor='#fff'/>
                      </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
      <StatusBar style={"dark"}/>
    </SafeAreaView>
  )
}

export default NewForgotPassword


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    marginVertical: 16
  },
  pinCodeContainer: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: 45,
    height: 45,
    color: "#000",
    fontSize: 16,
    textAlign: "center"
  },
  pinCodeText: {
    color: '#111625',
    fontSize: 18,
    fontWeight: 'bold',
  },
  focusStick: {
    backgroundColor: '#FF5F00',
  },
  activePinCodeContainer: {
    borderColor: '#6A11CB',
    borderWidth: 1,
  },
  placeholderText: {
    color: '#ffffff',
  },
  filledPinCodeContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#FFAE4D',
  },
  disabledPinCodeContainer: {
    backgroundColor: '#e0e0e0',
  },
});

