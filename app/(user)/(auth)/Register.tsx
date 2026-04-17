import AppleButton from '@/components/AppleButton'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import GoogleButton from '@/components/GoogleButton'
import { images } from '@/constants'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Register = () => {
    const { top, bottom } = useSafeAreaInsets()
    const [isFocused, setIsFocused] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    country: '',
    password: '',
    state: '',
    city: ''
  })

  const googleSubmit = () => {

  }

  const appleSubmit = () => {

  }

  const emailSubmit = () => {

  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableOpacity onPress={() => router.back()} className='my-3'><Octicons name="chevron-left" size={28} color="black" /></TouchableOpacity>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-3">
                  <Text className="text-2xl font-psbold text-orange">Create an Account</Text>
                  
                    <View className="w-full justify-center">
                        <FormField title="Enter full name" value={form.lastname} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, lastname: e })} otherStyles="mt-4" />
                        <FormField title="Enter email" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-4" keyboardType="email-address"/>

                        <View className='mt-4'>
                            <Text className={`text-base font-pregular pb-2 text-blue`}>Enter phone number</Text>
                            <View className='flex-row items-center w-full justify-between gap-2'>    
                                <View className={`border flex-1 ${isFocused ? 'border-purple' : 'border-black'} h-[46px] px-4 rounded-full items-center flex-row gap-1`}>
                                    <TextInput className={`text-black font-pregular text-base h-full`} value="+234" placeholder="+000" placeholderTextColor="#ccc" editable={false}/>
                                    <TextInput className={`flex-1 text-black font-pregular text-base h-full pl-1`} value={form.phoneNumber} placeholder="8178676486" placeholderTextColor="#ccc" onChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} keyboardType="phone-pad" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
                                </View>
                            </View>
                        </View>

                        <FormField title="Create password" value={form.password} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-4"/>
                        <FormField title="State" value={form.state} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, state: e })} otherStyles="mt-4" />
                        <FormField title="City (optional)" value={form.city} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, city: e })} otherStyles="mt-4" />
                    </View>
                  <CustomButton title="Register" handlePress={emailSubmit} containerStyles="w-full mt-8" textStyles='text-white'/>
                  <View className='my-4'>
                    <View className='flex-row items-center justify-center w-full gap-6'>
                      <View style={{ borderWidth: 0.5}} className='flex-1'/>
                      <Text>OR</Text>
                      <View style={{ borderWidth: 0.5}} className='flex-1'/>
                    </View>
                    <View>
                        <GoogleButton title="Continue with Google" src={images.google} handlePress={googleSubmit} containerStyles="w-full mt-4 border" />
                        <AppleButton title="Continue with Apple" src={images.apple} handlePress={appleSubmit} containerStyles="w-full mt-4" />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

      <StatusBar style="dark"/>
    </View>
  )
}

export default Register