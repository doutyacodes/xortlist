import { View, Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import TopNav from "@/components/TopNav";
import Companies from "@/components/Companies";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { hp } from "@/helpers/common";
import QuizComponent from "@/components/QuizComponent";

const ResultScreen = () => {
  const FirstRoute = () => (
    <QuizComponent />
  );

  const SecondRoute = () => (
    <QuizComponent />
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    //   { key: 'first', title: 'Jobs & Internship' },
    { key: "second", title: "Quiz" },
  ]);
  const renderScene = SceneMap({
    // first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.light.gradient1, Colors.light.gradient2]}
      style={{ flex: 1 }}
    >
      <TopNav />
      <View className="h-[1px] w-full bg-slate-500" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        indicatorStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: "#e5e5e5" }}
        renderTabBar={(props) => (
          <TabBar
            indicatorStyle={{ backgroundColor: "black" }}
            {...props}
            renderLabel={({ route, color }) => (
              <Text
                style={{
                  color: "black",
                  margin: 8,
                  fontFamily: "outfit-bold",
                  fontSize: hp(1.8),
                }}
              >
                {route.title}
              </Text>
            )}
            style={{ backgroundColor: "white" }}
          />
        )}
      />
    </LinearGradient>
  );
};

export default ResultScreen;
