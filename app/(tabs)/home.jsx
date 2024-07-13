import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "@/components/TopNav";
import { LinearGradient } from "expo-linear-gradient";
import Companies from "@/components/Companies";
import { Colors } from "@/constants/Colors";
import { hp } from "@/helpers/common";

const Home = () => {
  const [filterChallenges, setFilterChallenges] = useState([]);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.light.gradient1, Colors.light.gradient2]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <TopNav />
        <Companies />
      <FlatList
        data={filterChallenges}
        key={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 20,
          width: "100%",
          paddingHorizontal: 10,
          // flex:1
        }}
        ListEmptyComponent={() => (
          <View
            className={`flex-1 bg-white rounded-md justify-center items-center min-h-[40vh]`}
          >
            <Text className={`text-black font-outfit font-lbold text-lg `}>
              No active tests at the moment.
            </Text>
          </View>
        )}
      />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
