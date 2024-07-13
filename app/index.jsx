import { Image, Text, View } from "react-native";
import { hp, wp } from "@/helpers/common";
import images from "../constants/images";
import { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Image
        source={images.logo}
        style={{ width: wp(40), height: wp(40), objectFit: "contain" }}
      />
    </View>
  );
}
