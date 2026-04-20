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
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { OtpInput } from "react-native-otp-entry";
import CountDown from '@/components/CountDown'
import Header from '@/components/Header'

const Index = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isFocused, setIsFocused] = useState(false);
  const [otp, setOtp] = useState('');
  const [key, setKey] = useState(0); // Unique key to force remount
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

  const googleSubmit = () => {

  }

  const appleSubmit = () => {

  }

  const emailSubmit = () => {
    handlePresentOTPModalPress()
  }

  const resendOTP = () => {
    handlePresentOTPModalPress()
  }

  const verify = () => {
    handleCloseOTPModalPress()
    router.push("/(vendor)/(auth)/Credentials")
  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Header title="Profile Details" showGoBack={true} onpress={() => router.back()}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-4">
                    <View className="w-full justify-center">
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
                  <CustomButton title="Continue" handlePress={emailSubmit} containerStyles="w-full mt-8" textStyles='text-white'/>
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

      <StatusBar style="dark"/>
    </View>
  )
}

export default Index


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