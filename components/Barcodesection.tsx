import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";
import JsBarcode from "jsbarcode";

interface BarcodeSectionProps {
  value: string;
  width?: number;
  height?: number;
  lineColor?: string;
  backgroundColor?: string;
}

interface Bar {
  x: number;
  w: number;
}

export default function BarcodeSection({
  value,
  width = 280,
  height = 70,
  lineColor = "#1a1a1a",
  backgroundColor = "#ffffff",
}: BarcodeSectionProps) {
  const bars = useMemo<Bar[] | null>(() => {
    try {
      // Pass a plain object — JsBarcode fills it with `encodings`
      const data: any = {};
      JsBarcode(data, value, {
        format: "CODE128",
        width: 1,
        height,
        displayValue: false,
      });

      // data.encodings is an array of encoding objects, each with a `data` binary string
      const binaryString: string = data.encodings
        .map((e: any) => e.data)
        .join("");

      if (!binaryString) return null;

      const barW = width / binaryString.length;
      const result: Bar[] = [];
      let i = 0;

      while (i < binaryString.length) {
        const bit = binaryString[i];
        let count = 1;
        while (
          i + count < binaryString.length &&
          binaryString[i + count] === bit
        )
          count++;
        if (bit === "1") {
          result.push({ x: i * barW, w: count * barW });
        }
        i += count;
      }

      return result;
    } catch (e) {
      console.error("Barcode encode error:", e);
      return null;
    }
  }, [value, width, height]);

  if (!bars) {
    return (
      <View className="items-center">
        <Text className="text-red-500 text-xs">Could not generate barcode</Text>
      </View>
    );
  }

  return (
    <View className="items-center">
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
        {bars.map((bar, idx) => (
          <Rect
            key={idx}
            x={bar.x}
            y={0}
            width={bar.w}
            height={height}
            fill={lineColor}
          />
        ))}
      </Svg>
      <Text className="text-[13px] text-[#1a1a1a] tracking-[4px] mt-2 font-medium">
        {value}
      </Text>
    </View>
  );
}