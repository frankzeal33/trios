import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { OtpInput } from 'react-native-otp-entry'
import { FontAwesome5 } from '@expo/vector-icons'
import CountDown from '@/components/CountDown'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type countryType =  {
  name: { en: string },
  dial_code: string,
  code: string,
  flag: string,
}

const ForgotPassword = () => {

  const [form, setForm] = useState({
    email: '',
    phoneNumber: ''
  })
  const [otp, setOtp] = useState('');
  const [key, setKey] = useState(0);
  const [OTPError, setOTPError] = useState("")
  const bottomSheetOTPModalRef = useRef<BottomSheetModal>(null);
  const [resendLoading, setResendLoading] = useState(false)
  const [resend, setResend] = useState(false)

  const handlePresentOTPModalPress = useCallback(() => {
    bottomSheetOTPModalRef.current?.present();
  }, []);

  const handleCloseOTPModalPress = useCallback(() => {
    bottomSheetOTPModalRef.current?.dismiss()
  }, []);

  
  const verify = () => {
    handleCloseOTPModalPress()
    router.push("/(user)/(auth)/NewForgotPassword")
  }
  
    const resendOTP = async () => {
     
    }

  const submitOTP = async () => {

    
  }
 
  return (
    <SafeAreaView className='h-full flex-1 text-white'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-4'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                      <Text className="text-2xl font-psbold text-orange">Forgot Password</Text>
                      <Text className="mt-2 font-mmedium text-center px-6">Input your registered Email address or Mobile number for OTP verifiction</Text>
                      <FormField title="Enter email address/phone number" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-8" keyboardType="email-address"/>
                      <View className='w-full justify-center my-6'>
                        <CustomButton title="Continue"handlePress={handlePresentOTPModalPress}  containerStyles="w-full mt-8" textStyles='text-white'/>
                      </View>
                      <View className='w-full justify-center mb-7'>
                        <CustomButton title="Cancel" handlePress={() => router.back()} containerStyles="w-full border border-black" bgColor='#fff'/>
                      </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <CustomButtomSheet ref={bottomSheetOTPModalRef} enablePenDown={false}>
          <View>
            <View className='my-2 items-center justify-center'>
              <Text className="text-orange text-2xl font-psbold text-center my-4">OTP Verification</Text>
              <Text className="font-mmedium text-center">
                Enter the code that was sent to your e-mail address <Text className='font-psbold'>frankzeal33@gmail.com</Text>
              </Text>
              <View className="items-center justify-center my-2">
                <OtpInput
                  key={key}
                  numberOfDigits={4}
                  onTextChange={(code) => setOtp(code)}
                  theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                    placeholderTextStyle: styles.placeholderText,
                    filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                    disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                  }}
                />
              </View>
            </View>
            <View className='flex-row justify-center items-center gap-1 my-4'>
              <CountDown
                initialSeconds={300}
                onFinish={() => setResend(true)}
              />
            </View>
            <CustomButton title="Verify" handlePress={verify} containerStyles="w-full" textStyles='text-white' />
            <View className="flex-row gap-1 items-center justify-center mt-4">
              <Text className="text-center text-sm font-pregular">Didn’t receive code?</Text>
              {resendLoading ? ( 
                <FontAwesome5 name="circle-notch" size={16} color="#FFAE4D" className='animate-spin'/>
              ) : (
                <TouchableOpacity onPress={resendOTP}>
                  <Text className="text-sm font-psbold">Tap to Resend</Text>
                </TouchableOpacity >
              )}
            </View>
          </View>
        </CustomButtomSheet>
        
      <StatusBar style={"dark"}/>
    </SafeAreaView>
  )
}

export default ForgotPassword


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

