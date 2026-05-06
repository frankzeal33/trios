import { Modal, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from 'expo-status-bar';
import { data } from '@/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type dataProps = {
    label : string;
    value: string;
}[]

const CategoriesModal = ({placeholder, header, showModal, close, selectedValue, title, handlePress, handleShowModal}: {placeholder: string; header: string; showModal: boolean; close: () => void; selectedValue: string; title: string; handlePress: (value: string) => void, handleShowModal: () => void}) => {

    const { top, bottom } = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<dataProps>([])

    useEffect(() => {
        setItems(data.categories)
    }, [items])

  return (
    <View className='flex-1 items-center justify-center'>
        <Modal animationType='slide' transparent={false} statusBarTranslucent visible={showModal} onRequestClose={handleShowModal}>
            <View className='flex-1'>
                <View className='px-4' style={{ paddingTop: top, paddingBottom: bottom }}>
                    <View className='flex-row items-center justify-between gap-2 py-2'>
                        <Text className='font-psbold text-lg'>{header}</Text>
                        <TouchableOpacity onPress={() => close()}>
                            <Ionicons name="close" size={28} color="#000" />
                        </TouchableOpacity>
                    </View>
                    {
                        loading ? (
                            <ActivityIndicator size="large" color="#003366"/>
                        ) : (
                            <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}: {item: {label: string; value: string}; index: number}) => (
                                    <TouchableOpacity key={index} onPress={() => handlePress(item.value)} className='my-3 w-full'>
                                        <Text className='text-lg font-pmedium'>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View className='h-[70vh]'>
                                        <View className="w-full items-center mx-auto justify-center my-6 mt-16 max-w-60 flex-1">
                                            <View className='flex items-center justify-center size-16 rounded-full bg-orangeLight'>
                                                <Entypo name="list" size={32} color="#FF6600"/>
                                            </View>
                                            <Text className="text-2xl text-center mt-4 font-pbold">Nothing to see here for now</Text>
                                            <Text className="text-sm text-center mt-1 font-plight">There is no list yet</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        )
                    }
                </View>
            </View>
            <StatusBar style='dark'/>
        </Modal>
        <View className=' mt-4'>
            <Text className={`text-base font-pregular pb-2 text-blue`}>{title}</Text>
            <TouchableOpacity className='border bg-white border-black w-full h-[46px] px-4 rounded-full items-center gap-1 flex-row' onPress={handleShowModal}>
                <Text className='flex-1 text-[#ccc] font-pregular text-base' numberOfLines={1}>{selectedValue ? selectedValue : placeholder}</Text>
                <Ionicons name="chevron-down-circle-sharp" size={24} color="#C3C3C3" />
            </TouchableOpacity>
        </View> 
    </View>
  )
}

export default CategoriesModal