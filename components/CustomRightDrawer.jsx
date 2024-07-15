import { View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const CustomRightDrawer = () => {
  const { setIsLoggedIn, setUser,user } = useGlobalContext();

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
    <SafeAreaView style={{paddingTop:Platform.OS=="android" ? 30 : 0}}>
      <View className="space-y-4 p-3">
        <Link href={user ? `/profile/${user.id}` : `/login`}>
          <View className="flex-row items-center space-x-2">
            <FontAwesome name="user-circle-o" size={26} color="black" />
            <Text className="font-outfit text-[17px]">My Profile</Text>
          </View>
        </Link>
        <View className="w-full h-[1px] bg-slate-300" />
        <TouchableOpacity onPress={signOut}>
          <View className="flex-row items-center space-x-2">
            <MaterialIcons name="logout" size={26} color="black" />
            <Text className="font-outfit text-[17px]">Logout</Text>
          </View>
        </TouchableOpacity>
        <View className="w-full h-[1px] bg-slate-300" />

      </View>
    </SafeAreaView>
  );
};

export default CustomRightDrawer;
