import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import images from "@/constants/images";
import { wp } from "@/helpers/common";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const TopNav = () => {
  const { isLoggedIn } = useGlobalContext();
  const navigation = useNavigation(); // Access the router object

  return (
    <View
      className="w-full flex-row justify-between items-center px-3 bg-white"
      style={{ paddingTop: Platform.OS == "ios" ? 30 : 20 }}
    >
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
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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
