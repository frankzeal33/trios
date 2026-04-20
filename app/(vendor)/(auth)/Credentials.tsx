import AppleButton from '@/components/AppleButton'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import FormFieldSheet from '@/components/FormFieldSheet'
import GoogleButton from '@/components/GoogleButton'
import { images } from '@/constants'
import { AntDesign, FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useRef, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { OtpInput } from "react-native-otp-entry";
import CountDown from '@/components/CountDown'
import Header from '@/components/Header'
import TextArea from '@/components/TextArea'
import Pdf from 'react-native-pdf';
import * as DocumentPicker from 'expo-document-picker';

type IDType = {
  mimeType: string;
  name:  string;
  size: number;
  uri:  string;
}

const Credentials = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isFocused, setIsFocused] = useState(false);
  const [otp, setOtp] = useState('');
  const [key, setKey] = useState(0); // Unique key to force remount
  const [form, setForm] = useState({
    business_name: '',
    business_description: '',
    cac: '',
    business_location: ''
  })
  const [OTPError, setOTPError] = useState("")
  const bottomSheetReviewModalRef = useRef<BottomSheetModal>(null);
  const [resendLoading, setResendLoading] = useState(false)
  const [resend, setResend] = useState(false)
  const [validateModal, setValidateModal] = useState(false)
    const [IDFile, setIDFile] = useState<IDType | null>(null)

  const handlePresentReviewModalPress = useCallback(() => {
    bottomSheetReviewModalRef.current?.present();
  }, []);

  const handleCloseReviewModalPress = useCallback(() => {
    bottomSheetReviewModalRef.current?.dismiss()
  }, []);

      const openPicker = async () => {
      
        // const MAX_FILE_SIZE = 5000000;
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
    
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
            copyToCacheDirectory: true,
            multiple: false,
          });
    
          if (result.canceled) return;
    
          const file: any = result.assets[0];
    
          if (file.size > MAX_FILE_SIZE) {
            Alert.alert('File too large', 'Please select a file smaller than 5 MB.');
            return;
          }
    
          console.log("file", file)
    
          if (!result.canceled) {
            setIDFile(file) 
            console.log('Picked document:', file);
          }  
          
        } catch (err) {
          console.error('Error picking document:', err);
        }
    };

  const verify = () => {
    handlePresentReviewModalPress()
  }

  const dashboard = () => {
    handleCloseReviewModalPress()
    router.push("/(vendor)/(protected)/(tabs)/Home")
  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Header title="vendor Credentials" showGoBack={true} onpress={() => router.back()}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-2">
                  <View className="w-full justify-center">
                    <FormField title="Business name" value={form.business_name} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, business_name: e })} otherStyles="mt-4" />
                    <TextArea title="Business description" value={form.business_description} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, business_description: e })} otherStyles="mt-4"/>
                    <View className="w-full justify-center mt-4">
                      <Text className='text-base font-pregular pb-2'>Upload NIN</Text>
                      {!IDFile ? (
                          <View className='min-h-40 w-full rounded-lg'>
                            <TouchableOpacity activeOpacity={0.8} className='border border-dashed flex-1 bg-gray border-black rounded-3xl' onPress={openPicker}>
                              <View className='items-center justify-center gap-1 my-auto'>
                                <View className={`flex items-center justify-center size-12 rounded-full bg-orangeLight `}>
                                    <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF6600" />
                                </View>
                                <View>
                                    <Text className='text-base text-center font-psbold'>Tap to add</Text>
                                    <Text className="font-pregular text-center text-sm">PNG/JPEG/PDF</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                      ) : IDFile?.mimeType === "application/pdf" ? (
                          <View className='h-40 w-full relative'>
                            <TouchableOpacity activeOpacity={0.8} className='w-full h-full border flex-1 border-black rounded-lg overflow-hidden' onPress={openPicker}>
                                <View className="absolute items-center justify-center"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: [{ translateX: -0.5 * 48 }, { translateY: -0.5 * 48 }],
                                        zIndex: 50
                                    }}>
                                    <View className={`flex items-center justify-center size-12 rounded-full bg-blue-100`}>
                                        <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF5F00" />
                                    </View>
                                </View>
                                <Pdf
                                  source={{ uri: IDFile.uri }}
                                  style={{ flex: 1, width: "100%", height: "100%" }}
                                  page={1}
                                  scale={1.0}
                                  horizontal={false}
                                />
                            </TouchableOpacity>
                          </View>
                      ) : (
                          <View className='h-40 w-full relative'>
                            <TouchableOpacity activeOpacity={0.8} className='w-full h-full border flex-1 border-black rounded-lg overflow-hidden' onPress={openPicker}>
                                <View className="absolute items-center justify-center"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: [{ translateX: -0.5 * 48 }, { translateY: -0.5 * 48 }],
                                        zIndex: 50
                                    }}>
                                    <View className={`flex items-center justify-center size-12 rounded-full bg-blue-100 `}>
                                      <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF5F00" />
                                    </View>
                                </View>
                                <Image
                                  source={{ uri: IDFile?.uri }}
                                  className='w-full h-full'
                                  resizeMode="cover"
                                />
                            </TouchableOpacity>
                          </View>
                          
                      )}
                      <Text className="font-pmedium text-sm mt-2 text-gray-500" numberOfLines={2}>{!IDFile ? "Less than 5MB and must be clear" : IDFile?.name}</Text>
                    </View>
                    <View className="w-full justify-center mt-4">
                      <Text className='text-base font-pregular pb-2'>Upload CAC</Text>
                      {!IDFile ? (
                          <View className='min-h-40 w-full rounded-lg'>
                            <TouchableOpacity activeOpacity={0.8} className='border border-dashed flex-1 bg-gray border-black rounded-3xl' onPress={openPicker}>
                              <View className='items-center justify-center gap-1 my-auto'>
                                <View className={`flex items-center justify-center size-12 rounded-full bg-orangeLight `}>
                                    <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF6600" />
                                </View>
                                <View>
                                    <Text className='text-base text-center font-psbold'>Tap to add</Text>
                                    <Text className="font-pregular text-center text-sm">PNG/JPEG/PDF</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                      ) : IDFile?.mimeType === "application/pdf" ? (
                          <View className='h-40 w-full relative'>
                            <TouchableOpacity activeOpacity={0.8} className='w-full h-full border flex-1 border-gray-200 rounded-lg overflow-hidden' onPress={openPicker}>
                                <View className="absolute items-center justify-center"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: [{ translateX: -0.5 * 48 }, { translateY: -0.5 * 48 }],
                                        zIndex: 50
                                    }}>
                                    <View className={`flex items-center justify-center size-12 rounded-full bg-blue-100 `}>
                                        <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF5F00" />
                                    </View>
                                </View>
                                <Pdf
                                  source={{ uri: IDFile.uri }}
                                  style={{ flex: 1, width: "100%", height: "100%" }}
                                  page={1}
                                  scale={1.0}
                                  horizontal={false}
                                />
                            </TouchableOpacity>
                          </View>
                      ) : (
                          <View className='h-40 w-full relative'>
                            <TouchableOpacity activeOpacity={0.8} className='w-full h-full border flex-1 border-gray-200 rounded-lg overflow-hidden' onPress={openPicker}>
                                <View className="absolute items-center justify-center"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: [{ translateX: -0.5 * 48 }, { translateY: -0.5 * 48 }],
                                        zIndex: 50
                                    }}>
                                    <View className={`flex items-center justify-center size-12 rounded-full bg-blue-100 `}>
                                      <MaterialCommunityIcons name="cloud-upload-outline" size={26} color="#FF5F00" />
                                    </View>
                                </View>
                                <Image
                                  source={{ uri: IDFile?.uri }}
                                  className='w-full h-full'
                                  resizeMode="cover"
                                />
                            </TouchableOpacity>
                          </View>
                          
                      )}
                      <Text className="font-pmedium text-sm mt-2 text-gray-500" numberOfLines={2}>{!IDFile ? "Less than 5MB and must be clear" : IDFile?.name}</Text>
                    </View>
                    <FormField title="CAC registered number" value={form.cac} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, cac: e })} otherStyles="mt-4" />
                    <FormField title="Business location" value={form.business_location} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, business_location: e })} otherStyles="mt-4" />
                  </View>
                  <CustomButton title="Verify" handlePress={verify} containerStyles="w-full mt-8" textStyles='text-white'/>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <CustomButtomSheet ref={bottomSheetReviewModalRef} enablePenDown={false}>
          <View className='my-2'>
            <Text className="text-xl font-psbold text-center">Your document is under review</Text>
            <View className='my-6 items-center justify-center'>
              <MaterialCommunityIcons name="file-document-multiple-outline" size={50} color="black" />
            </View>
            <Text className="font-mmedium mb-2"> Your document is being processed for review, you will be notified on your document shortly.</Text>
            <Text className="font-mmedium mb-8">
              <Text className='text-orange'>Please note,</Text> all your events will be pending during review.
            </Text>
            <CustomButton title="Okay" handlePress={dashboard} containerStyles="w-full border" textStyles='text-black' bgColor='white' />
          </View>
        </CustomButtomSheet>

      <StatusBar style="dark"/>
    </View>
  )
}

export default Credentials


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