import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { baseImgURL, baseURL } from "@/constants/baseData";
import axios from "axios";
import { Image } from "expo-image";
import { Link } from "expo-router";

const Companies = () => {
  const [userPages, setUserPages] = useState([]);
  const { user } = useGlobalContext();
  const fetchUserPages = async () => {
    try {
      // Only fetch rewards if user data is available
      const response = await axios.get(
        `${baseURL}/get-all-user-pages.php?user_id=${user ? user.id : null}`
      );
      //   console.log(response.data)
      if (response.data.success) {
        setUserPages(response.data.data);
      }
    } catch (error) {
      console.error("Error while fetching pages:", error.message);
    }
  };
  useEffect(() => {
    fetchUserPages();
  }, [user]);
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-3 max-h-28"
      >
        <View className=" items-center  flex-row space-x-3">
          <Text className="font-outfit-bold">My Companies</Text>
          {userPages?.length > 0 &&
            userPages.map((item) => {
              return (
                <View
                  key={item.id}
                  className="justify-center items-center flex-col"
                >
                  <TouchableOpacity className="p-1 rounded-md bg-white">
                    <Image
                      className="w-10 h-10 object-cover"
                      source={baseImgURL + item.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className=" font-outfit-bold text-slate-500 text-center text-[9px] mt-2">
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View className="py-2 bg-white w-full " />
    </>
  );
};

export default Companies;
