import { View, Text, Image } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  const TabIcon = ({ color, name, focused }) => {
    return (
      <View className="items-center justify-center gap-2">
        <Text
          className={`${focused ? "font-psemibold" : "font-pregular"}`}
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };

  return (
    <Tabs screenOptions={{headerShown:false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/[user_id]"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
