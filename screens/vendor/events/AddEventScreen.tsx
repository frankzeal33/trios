import AppleButton from '@/components/AppleButton'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { data } from '@/constants'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import TextArea from '@/components/TextArea'
import * as DocumentPicker from 'expo-document-picker';
import Picker from '@/components/Picker'
import CategoriesModal from '@/components/select-modals/CategoriesModal'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import RadioGroup from '@/components/RadioGroup'
import FlyerUploader from '@/components/vendor/Flyeruploader'
import { ImagePickerAsset } from 'expo-image-picker'
import TicketList, { Ticket } from '@/components/vendor/Ticketlist'

type IDType = {
  mimeType: string;
  name:  string;
  size: number;
  uri:  string;
}

const AddEventScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [isFocused, setIsFocused] = useState(false);
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    cac: '',
    status: 'active',
    booking_end: 'manually',
    booking_structure: 'general_ticket',
    price: '',
    tickets: [] as Ticket[],
  })
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const [flyers, setFlyers] = useState<ImagePickerAsset[]>([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [hasPickedDate, setHasPickedDate] = useState(false);

  const birthFormatted = moment(date).format("ddd D MMM, YYYY  |  hh:mm A");

  const submit = () => {
    router.push("/(vendor)/(protected)/(tabs)/Listings")
  }

  const handleShowModal = (type: string) => {
    if(type === "category"){
      setShowCategoryModal(!showCategoryModal)
    }
  }

  const handleGoodsType = (value: string) => {
    setForm({ ...form, category: value })
    setShowCategoryModal(!showCategoryModal)   
  }

  const closeGoodsModal = () => {
    setShowCategoryModal(false) 
  }

  return (
    <View className='h-full flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Header title="Add Event" showGoBack={true} onpress={() => router.back()}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full'>
              <View className='flex-1' style={{ paddingBottom: bottom }}>
                <View className="flex-1 w-full items-center my-2">
                  <View className="w-full justify-center">

                    <CategoriesModal placeholder='Select item' selectedValue={form.category} header="Select Category" title='Category' showModal={showCategoryModal} close={closeGoodsModal} handlePress={handleGoodsType} handleShowModal={() => handleShowModal('category')}/>
                    <FormField title="Title" value={form.title} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, title: e })} otherStyles="mt-4" />
                    <TextArea title="Description" value={form.description} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, description: e })} otherStyles="mt-4"/>
                    <View className='mt-4'>
                      <Text className={`text-base font-pregular mb-2`}>Booking start date and time</Text> 
                      <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.8} className='w-full h-[48px] gap-4 rounded-full flex-row justify-between px-4 items-center border'>
                        <View className="flex-1">
                          <Text className={`font-pregular ${hasPickedDate ? "text-black" : "text-[#ccc]"}`} numberOfLines={1}>{hasPickedDate ? birthFormatted : '00/00/2026 00:00 AM'}</Text>
                        </View>
                        <Ionicons name="calendar-outline" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                    <RadioGroup
                      title="Booking end setting"
                      options={data.bookingEndSetting}
                      selectedValue={form.booking_end}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          booking_end: value
                        }))
                      }
                      containerStyles="mt-4"
                    />
                    <RadioGroup
                      title="Booking status"
                      options={data.bookingStatus}
                      selectedValue={form.status}
                      onChange={(value) =>
                        setForm(prev => ({
                          ...prev,
                          status: value
                        }))
                      }
                      containerStyles="mt-4"
                      direction="row"
                    />
                    <FlyerUploader onChange={(files) => setFlyers(files)} />
                    <Picker title='Booking structure' value={form.booking_structure} placeholder="Select booking structure" handleChangeText={(e: any) => setForm({ ...form, booking_structure: e.value })} data={data.bookingStructure}/>
                    {form.booking_structure === "general_ticket" && (
                      <FormField title="Ticket Price" value={form.price} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, price: e })} otherStyles="mt-4" keyboardType="numeric" />
                    )}
                    {form.booking_structure === "different_ticket" && (
                      <TicketList
                        tickets={form.tickets}
                        onChange={(tickets) => setForm({ ...form, tickets })}
                      />
                    )}
                  </View>
                  <CustomButton title="Submit" handlePress={submit} containerStyles="w-full mt-8" textStyles='text-white'/>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <DatePicker
          modal
          open={open}
          mode="datetime"
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setHasPickedDate(true)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
          theme={'light'}
        />

      <StatusBar style="dark"/>
    </View>
  )
}

export default AddEventScreen