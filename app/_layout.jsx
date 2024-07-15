import GlobalProvider from "@/context/GlobalProvider";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-black": require("../assets/fonts/Outfit-Black.ttf"),
    "outfit-extrabold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
    "outfit-extralight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
    "outfit-semibold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-thin": require("../assets/fonts/Outfit-Thin.ttf"),
  });
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="dark" />
      <Toast />
    </GlobalProvider>
  );
}
