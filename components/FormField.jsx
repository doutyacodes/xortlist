import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType = null,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`mt-2 space-y-2 ${otherStyles}`}>
      <Text className="text-base font-outfit">{title}</Text>
      <View className="border border-black-200 w-full h-16 bg-dark-50 rounded-lg focus:border-slate-600 items-center flex-row px-3 ">
        <TextInput
          className="flex-1 font-outfit text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          keyboardType={keyboardType ? keyboardType : "default"}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password" || placeholder == "Password") && !showPassword
          }
        />
        {(title === "Password" || title === "Confirm Password" || placeholder == "Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
