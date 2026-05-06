import CustomButton from '@/components/CustomButton'
import { data } from '@/constants'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import TextArea from '@/components/TextArea'
import Picker from '@/components/Picker'
import RadioGroup from '@/components/RadioGroup'

const HoldEventRegScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isFocused, setIsFocused] = useState(false);
  const [form, setForm] = useState({
    message: '',
    reason: '',
    notifyVia: '',
    happen_during_hold: '',
    resume_setting: ''
  })

  const submit = () => {
    router.push("/(vendor)/(protected)/(tabs)/Listings")
  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Header title="Hold Registration" showGoBack={true} onpress={() => router.back()}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-2">
                  <View className="w-full justify-center">
                    <Picker title='Reason for holding' value={form.reason} placeholder="Select reason" handleChangeText={(e: any) => setForm({ ...form, reason: e.value })} data={data.holdEventRegReason}/>
                    <TextArea title="Message to attendees (optional)" value={form.message} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, message: e })} otherStyles="mt-4"/>
                    <RadioGroup
                      title="Notify attendees via"
                      options={data.notifyVia}
                      selectedValue={form.notifyVia}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          notifyVia: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    <RadioGroup
                      title="What should happen during hold?"
                      options={data.duringHold}
                      selectedValue={form.happen_during_hold}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          happen_during_hold: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    <RadioGroup
                      title="Resume setting"
                      options={data.resumeStatus}
                      selectedValue={form.resume_setting}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          resume_setting: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    
                  </View>
                  <CustomButton title="Confirm hold" handlePress={submit} containerStyles="w-full mt-8" textStyles='text-white'/>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

      <StatusBar style="dark"/>
    </View>
  )
}

export default HoldEventRegScreen