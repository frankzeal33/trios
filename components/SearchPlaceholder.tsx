import { View, Text, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons'
import { Fontisto } from '@expo/vector-icons'

const SearchPlaceholder = ({containerStyle, placeholder}: {containerStyle?: string, placeholder?: string}) => {

  return (
    <View className={`my-3 flex-row items-center gap-1 w-full ${containerStyle}`}>
      <View className={`flex-1 bg-gray-tab gap-3 w-full h-12 px-4 rounded-full focus:border-purple items-center justify-center flex-row`}>
        <TouchableOpacity>
          <Octicons name="search" size={19} color="#000" />
        </TouchableOpacity>
        <Pressable className={`bg-dark-light flex-1 font-pregular text-base justify-center`}>
          <Text className='text-black/80'>{placeholder ? placeholder : "Search..."}</Text>
        </Pressable>
        <TouchableOpacity activeOpacity={0.8}>
          <Fontisto name="equalizer" size={16} color="black"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchPlaceholder