import { images } from "@/constants";
import React from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface BarcodeSectionProps {
  value: string;
  size?: number;
}

export default function QRCodeSection({
  value,
  size = 100,
}: BarcodeSectionProps) {
  return (
    <View className="items-center">
      <View
        className="bg-white p-3 rounded-xl"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <QRCode
          value={value}
          size={size}
          color="#1a1a1a"
          backgroundColor="#ffffff"
        //   logo={images.logo}
        //   logoSize={16}
        //   logoBorderRadius={8}
        />
      </View>
      <Text className="text-[13px] text-[#1a1a1a] tracking-[4px] mt-2 font-medium">
        {value}
      </Text>
    </View>
  );
}