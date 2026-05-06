import CustomButton from '@/components/CustomButton'
import { data } from '@/constants'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import TextArea from '@/components/TextArea'
import Picker from '@/components/Picker'
import RadioGroup from '@/components/RadioGroup'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import { FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const CancelEventRegScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isFocused, setIsFocused] = useState(false);
  const [form, setForm] = useState({
    message: '',
    reason: '',
    notifyVia: '',
    happen: '',
    refund_setting: ''
  })
  const bottomSheetCancelModalRef = useRef<BottomSheetModal>(null);

  const handlePresentCancelModalPress = useCallback(() => {
    bottomSheetCancelModalRef.current?.present();
  }, []);

  const handleCloseCancelModalPress = useCallback(() => {
    bottomSheetCancelModalRef.current?.dismiss()
  }, []);

  const confirm = () => {
    handlePresentCancelModalPress()
  }

  const submit = () => {
    handleCloseCancelModalPress()
    router.push("/(vendor)/(protected)/(tabs)/Listings")
  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Header title="Cancel Event" showGoBack={true} onpress={() => router.back()}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-2">
                  <View className="w-full justify-center">
                    <Picker title='Reason for cancellation' value={form.reason} placeholder="Select reason" handleChangeText={(e: any) => setForm({ ...form, reason: e.value })} data={data.cancelEventRegReason}/>
                    <TextArea title="Message to attendees (optional)" value={form.message} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, message: e })} otherStyles="mt-4"/>
                    <RadioGroup
                      title="Refund setting"
                      options={data.refundSetting}
                      selectedValue={form.refund_setting}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          refund_setting: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    <RadioGroup
                      title="Notify attendees Via"
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
                      title="What should happen to the event page?"
                      options={data.happenAfterCancel}
                      selectedValue={form.happen}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          happen: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    
                  </View>
                  <CustomButton title="Submit" handlePress={confirm} containerStyles="w-full mt-8" bgColor='bg-red-600' textStyles='text-white'/>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <CustomButtomSheet ref={bottomSheetCancelModalRef} enablePenDown={false}>
          <View>
            <View className='flex-row w-full items-center justify-between gap-1'>
              <View className="w-7"/>
              <TouchableOpacity onPress={handleCloseCancelModalPress}>
                <SimpleLineIcons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-2xl font-psbold text-black text-center" numberOfLines={3}>
                Cancel Event 
              </Text>

              <View className='my-2 items-center justify-center'>
                <Ionicons name="ban" size={80} color="#DB1616" />
              </View>
              <Text className="font-mmedium mb-2 text-orange">This action cannot be undone.</Text>
              <Text className="font-mmedium mb-8">
                Please wait, while we review your reasons for cancellation.
              </Text>
            </View>
            <CustomButton title="Continue" handlePress={submit} containerStyles="w-full" textStyles='text-white' />
          </View>
        </CustomButtomSheet>

      <StatusBar style="dark"/>
    </View>
  )
}

export default CancelEventRegScreen