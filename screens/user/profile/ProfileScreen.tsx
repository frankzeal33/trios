import ProfileHeader from '@/components/ProfileHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
import { images } from '@/constants';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import SpaceBetween from '@/components/SpaceBetween';
import { Entypo, EvilIcons, FontAwesome, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import SmallCustomButton from '@/components/SmallCustomButton';
const HEADER_HEIGHT = 60;

const ProfileScreen = () => {

  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const userProfile = true
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

   const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];

      // Check file size
      const file = new FileSystem.File(selectedImage.uri);
      const fileExists = file.exists;
      const fileSize = file.size;

      // Ensure file exists and has a size
      if (!fileExists || typeof fileSize !== 'number') {
        Alert.alert("Error", "Could not retrieve file info.");
        return;
      }

      if (fileSize > 5 * 1024 * 1024) {
        Alert.alert("File too large", "Image must be less than 5MB.");
        return;
      }

      // Check mime type or extension
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const isValidType = allowedTypes.includes(selectedImage.mimeType || '');

      // Fallback if mimeType is missing (use URI extension)
      const extension = selectedImage.uri.split('.').pop()?.toLowerCase();
      const isValidExtension = ['jpg', 'jpeg', 'png'].includes(extension || '');

      if (!isValidType && !isValidExtension) {
        Alert.alert("Invalid file type", "Only JPG, JPEG or PNG images are allowed.");
        return;
      }

      setFile(selectedImage)
      setShowModal(true)
    }
  };

  return (
    <View className='flex-1 bg-white'>
      <ProfileHeader title="Profile" scrollOffset={scrollOffset} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}>
          <View className='px-4'>
            <View className="w-full justify-center mt-4">
              <View className='items-center justify-center mb-2'>
                {!userProfile ? (
                  <View className='size-[100px] rounded-full border border-purple relative bg-purple'>
                    <Image source={images.onboardPic1} width={100} height={100} resizeMode='cover' className='overflow-hidden' style={{ width: "100%", height: "100%", borderRadius: 50 }}/>
                    <TouchableOpacity activeOpacity={0.9} className='absolute -right-1 top-2 z-50' onPress={pickImage}>
                      <View className={`flex items-center justify-center size-10 rounded-full absolute -right-2 bg-orange`}>
                        <AntDesign name="edit" size={20} color="#ffffff" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className='size-[100px] rounded-full border border-gray-200 relative'>
                    <ExpoImage source={{ uri: file?.uri || "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=faces" }} placeholder={{ blurhash }} cachePolicy="disk" contentFit="cover" style={{ width: "100%", height: "100%", borderRadius: 50 }}/>
                    <TouchableOpacity activeOpacity={0.9} className='absolute -right-1 top-2 z-50' onPress={pickImage}>
                      <View className={`flex items-center justify-center size-10 rounded-full absolute -right-2 bg-orange`}>
                        <AntDesign name="edit" size={20} color="#ffffff" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View>
                <Text className="font-psbold text-center mb-1 text-lg capitalize" numberOfLines={2}>Emmanuel .I.</Text>
                <Text className="font-pregular text-center capitalize mb-2" numberOfLines={1}>User</Text>
                <SmallCustomButton title='Become a Vendor' containerStyles='my-3 self-center'/>
              </View>
            </View>

            <View className='pb-4'>

              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Account Setting' lefticon={<Ionicons name="settings-outline" size={24} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title=' Edit Profile' lefticon={<FontAwesome name="user-o" size={22} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Change Password' lefticon={<Ionicons name="key-outline" size={22} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Help' lefticon={<Ionicons name="help-circle-outline" size={25} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Privacy Policy' lefticon={<Octicons name="shield-lock" size={20} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Interests' lefticon={<Ionicons name="flash-outline" size={24} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Terms of Service' lefticon={<Ionicons name="document-text-outline" size={22} color="black" />}/>
              <SpaceBetween onpress={() => router.push("/(user)/(protected)/(tabs)/Saved")} title='Logout' lefticon={<MaterialCommunityIcons name="logout" size={23} color="black" />}/>

              <Text className="text-lg text-gray-500 font-pregular mt-3">V 1.0.0</Text>
            </View>   

          </View>
      </Animated.ScrollView>

      <StatusBar style={"dark"}/>
    </View>
  )
}

export default ProfileScreen