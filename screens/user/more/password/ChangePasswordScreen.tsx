import AppleButton from '@/components/AppleButton'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import FormFieldSheet from '@/components/FormFieldSheet'
import GoogleButton from '@/components/GoogleButton'
import { images } from '@/constants'
import { AntDesign, FontAwesome5, Octicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { OtpInput } from "react-native-otp-entry";
import CountDown from '@/components/CountDown'
import Back from '@/components/Back'

const ChangePasswordScreen = () => {
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirm_new: '',
  })


  const emailSubmit = () => {
    
  }

  return (
    <SafeAreaView className='flex-1 bg-white px-4'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Back/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1'>
                <View className="flex-1 w-full items-center my-3">
                    <Text className="text-2xl font-psbold text-orange">Change Password</Text>
                    <Text className="mt-2 font-mmedium text-center px-6">Enter your current password, then create a new one to keep your account secure.</Text>
                    <View className="w-full justify-center">
                        <FormField title="Current password" value={form.current} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, current: e })} otherStyles="mt-7"/>
                        <FormField title="New password" value={form.new} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, new: e })} otherStyles="mt-4"/>
                        <FormField title="Confirm new password" value={form.confirm_new} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, confirm_new: e })} otherStyles="mt-4"/>
                    </View>
                    <CustomButton title="Change" handlePress={emailSubmit} containerStyles="w-full mt-8" textStyles='text-white'/>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

      <StatusBar style="dark"/>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
