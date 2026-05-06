import { View, Text, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native'
import Header from '@/components/Header'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import NgnBankModal from '@/components/select-modals/NgnBankModal'
import { useCallback, useRef, useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Ionicons } from '@expo/vector-icons'
import SetPin from '@/components/SetPin'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export default function WithdrawalScreen() {

    const { top, bottom } = useSafeAreaInsets()
     const [form, setForm] = useState({
      recipientBankName: "",
      recipientAccountNumber: "",
      recipientBankCode: "",
      amount: "",
      narration: ""
    })
    const [showModal, setShowModal] = useState(false)
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const bottomSheetModalPinRef = useRef<BottomSheetModal>(null);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGettingName, setIsGettingName] = useState(false)
    const [accountName, setAccountName] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const handlePress = (bank: {code: string; logo: string; name: string}) => {
        setForm({ ...form, recipientBankName: bank?.name, recipientBankCode: bank?.code, recipientAccountNumber: "" })
        setShowModal(!showModal)
        setAccountName(null)   
    }

    const closeModal = () => {
        setShowModal(false) 
    }

    const submit = async () => {
        handlePresentModalPinPress()
    }

     // setPin  callbacks
    const handlePresentModalPinPress = useCallback(() => {
      setPinModalVisible(true)
      bottomSheetModalPinRef.current?.present();
    }, []);

    const closePinModal = useCallback(() => {
      setPinModalVisible(false)
      bottomSheetModalPinRef.current?.dismiss()
    }, []);

  return (
    <View className='flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <Header title="Withdrawal" showGoBack={true} onpress={() => router.back()}/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}}>
                <View className='rounded-xl w-full my-4'>
                    <View className="flex-row gap-2 mb-2">
                        <View className="flex-1 rounded-2xl bg-orange px-3 py-6 justify-center">
                            <View className="flex-row items-center gap-2 flex-1">
                                <Ionicons name="wallet-outline" size={20} color="rgba(255,255,255,0.75)" style={{ marginTop: 2 }} />
                                <View className='flex-1'>
                                    <View className="flex-row items-center gap-1 flex-wrap">
                                        <Text className="text-white font-pmedium text-[10px]">Available for withdrawal</Text>
                                        <Text className="text-white font-pregular text-[8px]">(95% Total Revenue)</Text>
                                    </View>
                                    <Text className="text-white font-psbold text-xl mt-0.5">
                                        ₦11,922,690.00
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <NgnBankModal placeholder='Select Bank' selectedValue={form.recipientBankName} header="Select Bank" title='Select Bank' showModal={showModal} close={closeModal} handlePress={handlePress} handleShowModal={() => handleShowModal()} />
                    <FormField title='Account Number' value={form.recipientAccountNumber} placeholder="Account No." handleChangeText={(e: any) => {setForm({ ...form, recipientAccountNumber: e }); setAccountName(null)}} keyboardType='number-pad' otherStyles='mt-4' maxLength={10}/>
                    <FormField title="Amount to withdraw" value={form.amount} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, amount: e })} otherStyles="mt-4" keyboardType="numeric" />
                    <FormField title="Narration (optional)" value={form.narration} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, narration: e })} otherStyles="mt-4" />
                    <View className='w-full flex-row items-center gap-2 mt-10'>
                        <Checkbox value={isChecked} onValueChange={setChecked} color='#FF5F00' style={styles.checkbox}/>
                        <View className="flex-1">
                            <Text className="text-sm font-pmedium">
                                Please confirm all details before you proceed.
                            </Text>
                        </View>
                    </View>
                    <CustomButton title="Continue" handlePress={submit} containerStyles="w-full mt-3" textStyles='text-white'/>
                </View>

                <SetPin bottomSheetModalPinRef={bottomSheetModalPinRef} closePinModal={closePinModal} isVisible={pinModalVisible}/>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 2,
    borderColor: '#fff',
    borderWidth: 1,
    width: 18,
    height: 18
  },
});