import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

type PickerItem = { label: string; value: string | number };

type formProps = {
  title: string; 
  value: string | number;
  placeholder?: any; 
  handleChangeText: (item: PickerItem) => void;
  labelStyle?: string;
  data: Array<object>;
  inputBg?: string;
  otherStyles?: string;
  [props:string]: any;
}


const Picker = ({ title, value, placeholder, data, inputBg, handleChangeText, labelStyle, otherStyles, ...props}: formProps) => {
  
    return (
    <View className={`space-y-2 w-full mt-4 ${otherStyles}`}>
        <Text className={`text-base font-psregular pb-2`}>{title}</Text>
        <Dropdown
          style={styles.dropdownCustom}
          placeholderStyle={styles.placeholderCustom}
          selectedTextStyle={styles.selectedTextCustom}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder || "Select here"}
          value={value}
          onChange={handleChangeText}
          renderRightIcon={() => (
            <Ionicons name="chevron-down-circle-sharp" size={24} color="#C3C3C3" />
          )}
          containerStyle={styles.boxContainerCustom}
        />
    </View>
  )
}

export default Picker

const styles = StyleSheet.create({
  dropdownCustom: {
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center"
  },

  placeholderCustom: {
    fontSize: 14,
    color: "#ccc",
    flex: 1,
  },

  selectedTextCustom: {
    fontSize: 14,
    flex: 1,
  },
  boxContainerCustom: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black"
  }
});