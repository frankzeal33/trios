import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import displayCurrency from '@/utils/displayCurrency';
import moment from 'moment';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications';
import WhiteButton from './WhiteButton';
import { Ionicons } from '@expo/vector-icons';

const BookingCard = ({item, handlePress, index}: {item: any; handlePress: () => void, index: number}) => {
  
    const toast = useToast();

    const copyLocation = async (location: string) => {
      if(location){
        const copyCode = await Clipboard.setStringAsync(location);
  
        toast.show("Location Copied", {
            type: "success",
        });
      } 
    }

    return (
    <View className="w-full bg-gray-tab rounded-lg px-3 py-3 my-4">
        <View className="w-full">
            <View className='gap-2'>
                <View  className="items-start gap-2">
                <View className="w-full flex-row gap-2 justify-between items-center">
                    <View className={`flex items-center justify-center size-8 rounded-full bg-white`}>
                        <Ionicons name="ticket" size={16} color={"#FF5F00"} />
                    </View>
                    <View className='flex-row items-center gap-2'>
                        <WhiteButton title="View Event" handlePress={handlePress} containerStyles='bg-white border-black' textStyles='text-black' icon={<MaterialCommunityIcons name="eye" size={16} color="#000" />}/>
                    </View>
                </View>
                <View className='flex-col mb-2'>
                    <Text className="font-psbold text-lg text-blue">{item?.title}</Text>
                </View>
                </View>
            </View>
        </View>

        <View className='gap-4'>
            <View className='w-full flex-row gap-4 border-b border-dashed border-[#b8b4b4] pb-4'>
                <View className='gap-1'>
                    <Pressable onPress={() => copyLocation(item?.location)} className="flex-row items-center gap-2 flex-wrap">
                        <Text className="font-psbold text-sm text-blue">{item?.location}</Text>
                        <FontAwesome6 name="copy" size={14} color="#000"/>
                    </Pressable>
                </View>
            </View>

            <View className='w-full flex-row gap-4 border-b border-dashed border-[#b8b4b4] pb-4'>
                <View className='gap-1'>
                    <Text className="font-pregular text-xs text-blue">Date</Text>
                    <Text className="font-psbold text-sm text-blue">{item?.date}</Text>
                    {/* <Text className="font-psbold text-sm text-blue capitalize">{moment(item?.createdAt).format('llll')}</Text> */}
                </View>

                <View className='gap-1 flex-1 overflow-auto'>
                    <Text className="font-pregular text-xs text-blue">Time</Text>
                    <Text className="font-psbold text-sm text-blue" numberOfLines={2}>{item?.time}</Text>
                </View>
                <View className='gap-1 flex-1 overflow-auto'>
                    <Text className="font-pregular text-xs text-blue">Hosted by</Text>
                    <Text className="font-psbold text-sm text-blue" numberOfLines={2}>{item?.host}</Text>
                </View>
            </View>
            
            <View className='w-full flex-row gap-4'>
                <View className='gap-1'>
                    <Text className="font-pregular text-xs text-blue">Ticket Qty</Text>
                    <Text className="font-psbold text-sm text-blue">{item?.quantity || "Nil"}</Text>
                </View>

                <View className='gap-1 flex-1 overflow-auto'>
                    <Text className="font-pregular text-xs text-blue">Price</Text>
                    <Text className="font-psbold text-sm text-blue">{displayCurrency(Number(item?.price))}</Text>
                </View>
            </View>

        </View>
    </View>
  )
}

export default BookingCard