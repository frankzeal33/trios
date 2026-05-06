import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import CustomButton from './CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButtomSheet from './CustomButtomSheet';
import { useToast } from 'react-native-toast-notifications';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SetPin = ({bottomSheetModalPinRef, closePinModal, isVisible}: {bottomSheetModalPinRef: any; closePinModal: () => void, isVisible: boolean}) => {

    const toast = useToast();
    const { width, height } = Dimensions.get("window");
    const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
    const dialPadSize = width * 0.2;
    const pinLength = 4;
    const [pinCode, setPinCode] = useState<any>([]);
    const [displayPinCode, setDisplayPinCode] = useState<any>([]);
    const snapPoints = useMemo(() => ["70%", "90%"], [])

    const resetState = () => {
      setPinCode([]);
      setDisplayPinCode([]);
    };

    useEffect(() => {
      resetState();
    }, [isVisible]);

    const handleSetPin = async () => {
      if(pinCode.length === 4){
        closePinModal()
        router.push("/(vendor)/(protected)/(routes)/WithdrawalReceipt")
      }else if (pinCode.length === 0){
        toast.show("Pin fields are empty",{
          type: "error",
        });
      }else if (pinCode.length < 4){
        toast.show("Pin must be 4 numbers",{
          type: "error",
        });
      }else if (pinCode.length > 4){
        toast.show("Pin is greater than 4 numbers",{
          type: "error",
        });
      }
    }

    const SetPinDailPad = ({ onPress }: {onPress: (item: string | number) => void}) => {
        return (
          <View>
            <FlatList
              data={dialPad}
              numColumns={3}
              style={{ flexGrow: 1 }}
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{ gap: 30 }}
              contentContainerStyle={{ gap: 22 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    disabled={item === ""}
                  >
                    <View
                      style={{
                        width: dialPadSize,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item === "del" ? (
                        <MaterialCommunityIcons
                          name="backspace-outline"
                          size={dialPadSize / 3}
                          color="#000"
                        />
                      ) : item === "" ? (
                        <Ionicons
                          name="finger-print"
                          size={dialPadSize / 3}
                          color="white"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: dialPadSize / 3,
                            fontWeight: "500",
                            color: "#000",
                          }}
                        >
                          {item}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => (
                <View className='w-full justify-center my-2'>
                  <CustomButton title="Set PIN" handlePress={handleSetPin} containerStyles="w-full" textStyles='text-white' />
                </View>
              )}
            />
          </View>
        );
      };

  return (
    <CustomButtomSheet ref={bottomSheetModalPinRef} snapPoints={snapPoints} enablePenDown={false} onDismiss={closePinModal}>
        <View>
          <View className='flex-row w-full items-center justify-between gap-1'>
            <View className='w-8'/>
            <TouchableOpacity onPress={closePinModal}>
              <SimpleLineIcons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

        <Text className="text-2xl text-orange mt-4 font-psbold text-center">Set transaction PIN</Text>
        <Text className="text-xs font-pmedium mb-1 text-center">Create your 4-digit PIN for withdrawal purposes</Text>

        <View className='items-center justify-between gap-2'>
            <View className='flex-row gap-2 my-4 items-center justify-center'>
              {[...Array(pinLength).keys()].map((index) => {
                // const isSelected = !!pinCode[index];
                const isSelected = displayPinCode[index] ?? "";

                return (
                  <View key={index} className='size-10 bg-white border border-black rounded-lg items-center justify-center'>
                    <Text className='font-amedium text-2xl text-black'>{isSelected}</Text>
                  </View>
                );
              })}
            </View>
    
            <View style={{ justifyContent: 'center'}}>
              <SetPinDailPad
                  onPress={(item) => {
                    if (item === "del") {

                      if(pinCode.length > 0){
                        setPinCode((prevCode: any) => prevCode.slice(0, prevCode.length - 1));
                        setDisplayPinCode((prevCode: any) => prevCode.slice(0, prevCode.length - 1));
                      }

                    } else if (typeof item === "number") {
                      
                      if(pinCode.length < 4){
                        setPinCode((prevCode: any) => [...prevCode, item]);
                        setDisplayPinCode((prevCode: any) => [...prevCode, item]);

                        // After 500ms, replace the last entered number with "*"
                        setTimeout(() => {
                          setDisplayPinCode((prevCode: any) => {
                            const updated = [...prevCode];
                            if (updated.length > 0) {
                              updated[updated.length - 1] = "*";
                            }
                            return updated;
                          });
                        }, 50);
                      }
                        
                    }
                  }}
              />
            </View>
        </View>
        </View>
    </CustomButtomSheet>
  )
}

export default SetPin