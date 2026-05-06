// import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type Props = {
  images: string[];
  animatedStyle?: any;
};

export default function ImageDetailCarousel({ images, animatedStyle }: Props) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const modalImages = images.map((img) => ({ uri: img }));
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          width,
          height: "100%",
        },
        animatedStyle,
      ]}
    >
      <Animated.FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setSelectedIndex(index);
              setIsVisible(true);
            }}
            style={{ width, height: "100%" }}
          >
            <Image
              source={{ uri: item }}
              // placeholder={{ blurhash }}
              style={styles.image}
              resizeMode={"cover"}
              // contentFit="cover"
            />
          </Pressable>
        )}
      />

      <View style={styles.paginationContainer}>
        <Text className="text-white font-msbold">
          {currentIndex + 1}/{images.length}
        </Text>
      </View>

      {/* <ImageView
        images={modalImages}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({ imageIndex }) => (
          <View style={[styles.pagination, { bottom: insets.bottom + 10 }]}>
            <Text className="text-white font-mbold text-lg">
              {`${imageIndex + 1}/${modalImages.length}`}
            </Text>
          </View>
        )}
      /> */}
      <ImageView
        {...({
          images: modalImages,
          imageIndex: selectedIndex,
          visible,
          onRequestClose: () => setIsVisible(false),
          renderImage: ({ source }: { source: any }) => (
            <Image
              source={{
                uri: source.uri,
              }}
              style={{ flex: 1 }}
              resizeMode={"contain"}
            />
          ),
          FooterComponent: ({ imageIndex }: { imageIndex: number }) => (
            <View style={[styles.pagination, { bottom: insets.bottom + 10 }]}>
              <Text className="text-white font-mbold text-lg">
                {`${imageIndex + 1}/${modalImages.length}`}
              </Text>
            </View>
          ),
        } as any)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#0553",
  },
  pagination: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  paginationTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
