import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import { wp } from "@/helpers/common";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const TopNav = () => {
  const { isLoggedIn,setIsLoggedIn,setUser } = useGlobalContext();
  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("user");
      setIsLoggedIn(false);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("error signing out", error);
    }
  };
  return (
    <View className="w-full flex-row justify-between items-center px-3 bg-white">
      <TouchableOpacity style={{ width: wp(20) }}>
        <Feather name="search" size={wp(7)} color="black" />
      </TouchableOpacity>
      <Image
        source={images.logo}
        style={{ width: wp(30), height: wp(20), objectFit: "contain" }}
      />
      {isLoggedIn ? (
        <TouchableOpacity
          style={{ width: wp(20) }}
          onPress={() => signOut()}
          className=" justify-end items-end rounded-md"
        >
          <Entypo name="menu" size={wp(7)} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={{ width: wp(20) }}
          className="bg-black py-3 rounded-md "
        >
          <Text className="font-outfit-semibold text-white text-center  ">
            Login
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopNav;
