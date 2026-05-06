import AppleButton from '@/components/AppleButton'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import GoogleButton from '@/components/GoogleButton'
import { images } from '@/constants'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {

  const [form, setForm] = useState({
    service_type: "",
    location_from: "",
    location_to: "",
    weight: "",
    goods_type: "",
    email: ""
  })

  const googleSubmit = () => {
    router.push("/(user)/(protected)/(tabs)/Home")
  }

  const appleSubmit = () => {

  }

  const emailSubmit = () => {

  }

  return (
    <SafeAreaView className='h-full flex-1 bg-white'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-4'>
              <View className='flex-1 py-6'>
                <View className="flex-1 w-full justify-center items-center my-6">
                    <View>
                        <Image source={images.logo} className='size-24' resizeMode="contain" />
                        <Text className="text-3xl mt-2 font-pebold text-center text-purple">Trios</Text>
                    </View>

                    <CustomButton title="Create Account" handlePress={() => router.push("/(user)/(auth)/Register")} containerStyles="w-full mt-8" textStyles='text-white'/>
                    <CustomButton title="Log In" handlePress={() => router.push("/(user)/(auth)/Login")} containerStyles="w-full border mt-8" bgColor='bg-white' textStyles='text-black'/>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(guest)/(tabs)/Home")}>
                        <Text className="text-xl my-8 font-psbold text-center">Tour As Guest</Text>
                    </TouchableOpacity>
                    <View>
                        <View className='flex-row items-center justify-center w-full gap-6'>
                            <View style={{ borderWidth: 0.5}} className='flex-1 bg-purple'/>
                            <Text className='font-pregular'>OR</Text>
                            <View style={{ borderWidth: 0.5}} className='flex-1 bg-purple'/>
                        </View>
                        <View>
                            <CustomButton title="Register as a Vendor" handlePress={() => router.push("/(vendor)/(auth)")} containerStyles="w-full border border-purple mt-8" bgColor='bg-white' textStyles='text-black'/>
                        </View>
                    </View>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

      <StatusBar style={"dark"} backgroundColor={"#fff"}/>
    </SafeAreaView>
  )
}

export default index