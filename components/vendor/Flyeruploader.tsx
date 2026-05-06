import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MAX_FLYERS = 10;

type FlyerAsset = ImagePicker.ImagePickerAsset;

interface FlyerUploaderProps {
  onChange?: (flyers: FlyerAsset[]) => void;
}

export default function FlyerUploader({ onChange }: FlyerUploaderProps) {
  const [flyers, setFlyers] = useState<FlyerAsset[]>([]);

  const updateFlyers = (next: FlyerAsset[]) => {
    setFlyers(next);
    onChange?.(next);
  };

  const openPicker = async (): Promise<void> => {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
        Alert.alert("Permission required", "Allow access to photos.");
        return;
    }

    if (flyers.length >= MAX_FLYERS) {
      Alert.alert("Limit reached", `You can only upload up to ${MAX_FLYERS} flyers.`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_FLYERS - flyers.length,
      quality: 1,
      allowsEditing: false
    });

    if (result.canceled) return;

    const incoming = result.assets.filter((a) => {
      if (a.fileSize && a.fileSize > 5 * 1024 * 1024) {
        Alert.alert(
          "File too large",
          `"${a.fileName ?? "File"}" exceeds 5MB and was skipped.`
        );
        return false;
      }
      return true;
    });

    const combined = [...flyers, ...incoming].slice(0, MAX_FLYERS);
    updateFlyers(combined);
  };

  const removeFlyer = (uri: string): void => {
    updateFlyers(flyers.filter((f) => f.uri !== uri));
  };

  const clearAll = (): void => {
    Alert.alert("Clear all flyers?", "This will remove all uploaded flyers.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear all", style: "destructive", onPress: () => updateFlyers([]) },
    ]);
  };

  const slotsLeft = MAX_FLYERS - flyers.length;
  const isFull = flyers.length >= MAX_FLYERS;

  return (
    <View className="w-full mt-4">
      {/* Header row */}
      <View className="flex-row items-center justify-between pb-2">
        <View className="flex-1">
          <Text className="text-base font-pregular">Upload Flyers</Text>
          <Text className="text-xs font-pregular text-gray-400 mt-0.5">
            PNG / JPG / JPEG · max 5MB each
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          {/* Count badge */}
          <View className="bg-gray-100 rounded-full px-3 py-1">
            <Text className="text-xs font-pmedium text-gray-500">
              {flyers.length} / {MAX_FLYERS}
            </Text>
          </View>
          {/* Clear all */}
          {flyers.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={clearAll}
              className="border border-red-400 rounded-xl px-3 py-1"
            >
              <Text className="text-xs font-pmedium text-red-400">Clear all</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Grid of uploaded flyers */}
      {flyers.length > 0 && (
        <View className="flex-row flex-wrap gap-1">
          {flyers.map((item, index) => (
            <View
              key={item.uri}
              className="rounded-2xl overflow-hidden border border-gray-200 w-20 h-24"
            >
              <Image
                source={{ uri: item.uri }}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Index badge */}
              <View className="absolute bottom-1.5 left-1.5 bg-black/50 rounded px-1.5 py-0.5">
                <Text className="text-white font-psbold" style={{ fontSize: 10 }}>
                  {index + 1}
                </Text>
              </View>

              {/* Remove button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => removeFlyer(item.uri)}
                className="absolute top-1.5 right-1.5 bg-black/55 rounded-full items-center justify-center"
                style={{ width: 24, height: 24 }}
              >
                <MaterialCommunityIcons name="close" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Inline "add more" tile — only if slots remain */}
          {!isFull && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openPicker}
              className="border border-dashed border-gray-300 rounded-2xl items-center justify-center bg-gray-50 w-20 h-24"
            >
              <View className="items-center justify-center gap-1">
                <View className="items-center justify-center size-9 rounded-full bg-orangeLight">
                  <MaterialCommunityIcons name="plus" size={20} color="#FF6600" />
                </View>
                <Text className="text-xs font-pregular text-gray-400 text-center">
                  {slotsLeft} left
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Empty state dropzone */}
      {flyers.length === 0 && (
        <View className="min-h-40 w-full rounded-lg">
          <TouchableOpacity
            activeOpacity={0.8}
            className="border border-dashed flex-1 bg-gray border-black rounded-3xl"
            onPress={openPicker}
          >
            <View className="items-center justify-center gap-1 my-auto py-8">
              <View className="flex items-center justify-center size-12 rounded-full bg-orangeLight">
                <MaterialCommunityIcons
                  name="cloud-upload-outline"
                  size={26}
                  color="#FF6600"
                />
              </View>
              <View>
                <Text className="text-base text-center font-psbold">Tap to add</Text>
                <Text className="font-pregular text-center text-sm text-gray-500">
                  PNG / JPG / JPEG
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer hint */}
      <Text className="font-pmedium text-sm mt-2 text-gray-500" numberOfLines={1}>
        {flyers.length === 0
          ? "Less than 5MB each and must be clear"
          : isFull
          ? "Maximum flyers reached"
          : `${slotsLeft} more slot${slotsLeft === 1 ? "" : "s"} available`}
      </Text>
    </View>
  );
}