import {
  View,
  Text,
  Platform,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";
import { wp } from "@/helpers/common";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { baseURL } from "@/constants/baseData";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "@/context/GlobalProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn,setUser,user } = useGlobalContext();

  if(user)
  {
    router.replace("/home");
  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 100;
  const onSubmit = async () => {
    if (username.length <= 0) {
        Toast.show({
            type: 'error',
            text1: 'Oops',
            text2: 'Please fill in the username ❌'
          });
        return;
      }

      if (password.length <= 0) {
        Toast.show({
            type: 'error',
            text1: 'Oops',
            text2: 'Please fill in the password ❌'
          });
        return;
      }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/sign-in.php`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(response.data)
      if (response.data.success) {
        const newDataJSON = JSON.stringify(response.data.user);

        await SecureStore.setItemAsync("user", newDataJSON);
        setUser(response.data.user);
        setIsLoggedIn(true);
        router.replace("/home");
      }
      if (response.data.success == false) {
       
        Toast.show({
            type: 'error',
            text1: 'Uh oh! Something went wrong.',
            text2: response.data.error ? response.data.error : "Please try again."
          });
      }
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.light.gradient1, Colors.light.gradient2]}
      style={{
        flex: 1,
        paddingTop: 55,
        paddingHorizontal: 15,
        paddingBottom: Platform.OS == "android" ? 10 : 25,
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        className="flex-1 bg-white  w-full rounded-md items-center p-3"
      >
        <Image
          source={images.logo}
          style={{ width: wp(30), height: wp(20), objectFit: "contain" }}
        />
        <Image
          source={images.coverImg}
          className="w-full h-[25vh] object-contain"
        />
        <View className="w-full pt-3">
          <FormField
            title={"Username"}
            placeholder={"Username"}
            value={username}
            handleChangeText={(e) => setUsername(e)}
          />
          <FormField
            title={"Password"}
            placeholder={"Password"}
            value={password}
            handleChangeText={(e) => setPassword(e)}
          />
          <View className="justify-center items-center space-y-4 mt-3">
            <Text className="font-outfit-bold">
              Don't have an account?{" "}
              <Link href={"/signup"}>
                <Text className="text-blue-500">Signup</Text>
              </Link>
            </Text>
            <CustomButton
              handlePress={onSubmit}
              title={"Submit"}
              containerStyle={"bg-orange-300 mt-4 px-10 rounded-md"}
              isLoading={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
