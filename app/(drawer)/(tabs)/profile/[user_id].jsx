import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "@/components/TopNav";
import { Colors } from "@/constants/Colors";
import images from "@/constants/images";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { baseURL } from "@/constants/baseData";
import { FontAwesome } from "@expo/vector-icons";
import EditProfile from "@/components/EditProfile";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useIsFocused } from "@react-navigation/native";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const { user } = useGlobalContext();

  const { user_id } = useLocalSearchParams();
  if (!user) {
    router.replace("/home");
  }
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/getOtherUser.php?user_id=${user_id}`
          );
          if (response.status === 200) {
            setUserData(response.data);
          } else {
            console.error("Failed to fetch user data: ", response.statusText);
          }
        } catch (error) {
          console.error("Error while fetching data: ", error.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (user_id) {
        fetchData();
      }
    }, [user_id, reloadData])
  );
  return (
    <View style={{ flex: 1 }}>
      <TopNav />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={images.bgImg}
          className="w-full h-32"
          resizeMode="contain"
        />
        {isLoading ? (
          <View className="flex-1 min-h-[60vh] justify-center items-center">
            <ActivityIndicator size="small" color={Colors.light.red} />
          </View>
        ) : (
          <View className="flex-1 ">
            <View className="flex-row space-x-1 items-center p-3">
              <FontAwesome name="user-circle-o" size={28} color="black" />
              <Text className="font-outfit-semibold text-lg">
                {userData.name}
              </Text>
            </View>
            <View className="p-3 bg-[#0d8b4c] mt-1">
              <Text className="font-outfit-semibold text-lg text-white text-center">
                My Profile
              </Text>
            </View>
            <View className=" mt-1">
              <EditProfile
                setReloadData={setReloadData}
                reloadData={reloadData}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;
