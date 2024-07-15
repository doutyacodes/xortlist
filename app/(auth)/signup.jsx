import {
  View,
  Text,
  Platform,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";
import { hp, wp } from "@/helpers/common";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { baseURL } from "@/constants/baseData";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "@/context/GlobalProvider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    name: "",
    mobile: "",
    education: "Post Doctoral Fellowship",
    college: "",
    date: new Date(),
    gender: "Mr",
    student: "no",
    university: "",
    yearOfPassing: "",
    monthOfPassing: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [educationList, setEducationList] = useState([
    { label: "Post Doctoral Fellowship", value: "Post Doctoral Fellowship" },
    { label: "PHD", value: "PHD" },
    { label: "Masters Degree", value: "Masters Degree" },
    { label: "Bachelors Degree", value: "Bachelors Degree" },
    { label: "Secondary School", value: "Secondary School" },
  ]);
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  if (user) {
    router.replace("/home");
  }
  const handleChange = (name, value) => {
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [genderList, setGenderList] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Other", value: "Other" },
  ]);
  const [monthList, setmonthList] = useState([
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ]);
  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 100;
  const onSubmit = async () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    // Ensure all required fields are filled
    const requiredFields = [
      "username",
      "password",
      "confirmPassword",
      "name",
      "education",
      "date",
      "gender",
      "mobile",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        Toast.show({
          type: "error",
          text1: "Missing Field",
          text2: "Please fill all fields to continue.",
        });
        return;
      }
    }

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Passwords do not match.",
      });
      return;
    }

    // Check if name contains only letters and spaces, and is within the maximum length
    if (!nameRegex.test(form.name) || form.name.length > 50) {
      Toast.show({
        type: "error",
        text1: "Invalid Name",
        text2:
          "Name must contain only letters and spaces and be less than 50 characters.",
      });
      return;
    }

    // Check if username contains only letters, numbers, underscores, and spaces
    if (!usernameRegex.test(form.username)) {
      Toast.show({
        type: "error",
        text1: "Invalid Username",
        text2:
          "Username must contain only letters, numbers, underscores, and spaces.",
      });
      return;
    }

    // Check if mobile number contains exactly 10 digits
    if (!mobileRegex.test(form.mobile)) {
      Toast.show({
        type: "error",
        text1: "Invalid Mobile Number",
        text2: "Mobile number must contain exactly 10 digits.",
      });
      return;
    }

    // Calculate age from date
    const age = calculateAge(form.date);

    if (age < 18) {
      Toast.show({
        type: "error",
        text1: "Age Restriction",
        text2: "You must be at least 18 years old to sign up.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      formData.append("name", form.name);
      formData.append("mobile", form.mobile);
      formData.append("education", form.education);
      formData.append("college", form.college || "");
      formData.append("university", form.university || "");
      formData.append("student", form.student || "");
      formData.append("date", formatDate(form.date)); // Ensure formatDate function is defined
      formData.append("gender", form.gender);
      formData.append("yearOfPassing", form.yearOfPassing || "");
      formData.append("monthOfPassing", form.monthOfPassing || "");

      const response = await axios.post(`${baseURL}/sign-up.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use proper content type for FormData
        },
      });

      const result = response.data;

      if (result.success) {
        const newDataJSON = JSON.stringify(result.user);

        await SecureStore.setItemAsync("user", newDataJSON);
        setUser(result.user);
        setIsLoggedIn(true);
        router.replace("/home");
      } else {
        console.log(result.error);
        Toast.show({
          type: "error",
          text1: "Submission Error",
          text2: result.error[0] || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Toast.show({
        type: "error",
        text1: "Submission Error",
        text2: "Something went wrong while submitting the form.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.log(date)
    setForm({
      ...form,
      date: date,
    });
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          className="flex-1 bg-white  w-full rounded-md items-center p-3 min-h-[95vh]"
        >
          <Image
            source={images.logo}
            style={{ width: wp(30), height: wp(20), objectFit: "contain" }}
          />
          <Text className="text-xl font-outfit-bold">Sign Up!</Text>
          <View className="w-full pt-3">
            <View className="flex-row">
              <View className="border border-black-200 w-28 h-16 bg-dark-50 rounded-lg focus:border-slate-600 p-3 py-6 ">
                <Dropdown
                  labelField="label"
                  valueField="value"
                  placeholderStyle={{ color: "#C7C7CD" }}
                  selectedTextStyle={{ color: "black" }}
                  placeholder="Select you gender"
                  data={genderList}
                  value={form.gender}
                  onChange={(item) => {
                    handleChange("gender", item.value);
                  }}
                />
              </View>
              <View className="border border-black-200  flex-1 h-16 bg-dark-50 rounded-lg focus:border-slate-600 items-center flex-row px-3 ">
                <TextInput
                  className="flex-1 font-outfit text-base"
                  value={form.name}
                  placeholder={"Name"}
                  placeholderTextColor={"#7b7b8b"}
                  onChangeText={(e) =>
                    setForm({
                      ...form,
                      name: e,
                    })
                  }
                />
              </View>
            </View>
            <Text className="text-sm font-outfit text-slate-600 my-2">
              Please fill in your name as per your official document. You can't
              reverse this process.
            </Text>
            <FormField
              title={"Username"}
              placeholder={"Username"}
              value={form.username}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  username: e,
                })
              }
            />
            <FormField
              title={"Password"}
              placeholder={"Password"}
              value={form.password}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
            />
            <FormField
              title={"Confirm Password"}
              placeholder={"Confirm Password"}
              value={form.confirmPassword}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e,
                })
              }
            />
            <FormField
              title={"Mobile"}
              placeholder={"Mobile"}
              value={form.mobile}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  mobile: e,
                })
              }
            />
            <Text className="font-outfit mt-2">Date of Birth</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              className="border border-black-200 w-full h-16 bg-dark-50 rounded-lg focus:border-slate-600 items-center flex-row px-3 mt-2"
            >
              <View className="flex-row items-center">
                <Entypo name="calendar" size={24} color="black" />

                <View style={{ flexDirection: "row", padding: 15 }}>
                  {form.date ? (
                    <Text
                      style={{ fontSize: hp(1.7), flex: 1, color: "black" }}
                    >
                      {form.date.toLocaleDateString("en-GB")}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontSize: hp(1.7), flex: 1, color: "black" }}
                    >
                      Date of Birth
                    </Text>
                  )}
                </View>
              </View>
              <DateTimePickerModal
                maximumDate={minDate}
                isVisible={isDatePickerVisible}
                mode="date"
                themetype="light"
                display="inline"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
            <View className="my-3">
              <Text className="font-outfit-bold">
                Are you a college student?
              </Text>
              <View className="flex-row space-x-5">
                <TouchableOpacity
                  onPress={() =>
                    setForm({
                      ...form,
                      student: "yes",
                    })
                  }
                  className={`px-4 py-4 rounded-md mt-2 border border-slate-600 w-20 ${
                    form.student == "yes" && "bg-blue-400"
                  }`}
                >
                  <Text className="font-outfit text-center">Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setForm({
                      ...form,
                      student: "no",
                    })
                  }
                  className={`px-4 py-4 rounded-md mt-2 border border-slate-600 w-20 ${
                    form.student == "no" && "bg-blue-400"
                  }`}
                >
                  <Text className="font-outfit text-center">No</Text>
                </TouchableOpacity>
              </View>
            </View>
            {form.student == "yes" && (
              <>
                <View className="border border-black-200 flex-1 h-16 bg-dark-50 rounded-lg focus:border-slate-600 p-3 py-6 ">
                    <Dropdown
                      labelField="label"
                      valueField="value"
                      dropdownPosition="top"
                      placeholderStyle={{ color: "#C7C7CD" }}
                      selectedTextStyle={{ color: "black" }}
                      placeholder="Month of Passing"
                      data={educationList}
                      value={form.education}
                      onChange={(item) => {
                        handleChange("education", item.value);
                      }}
                    />
                  </View>
                <FormField
                  title={"College"}
                  placeholder={"College"}
                  value={form.college}
                  handleChangeText={(e) =>
                    setForm({
                      ...form,
                      college: e,
                    })
                  }
                />
                <FormField
                  title={"University"}
                  placeholder={"University"}
                  value={form.university}
                  handleChangeText={(e) =>
                    setForm({
                      ...form,
                      university: e,
                    })
                  }
                />
                <View className="flex-row mt-3">
                  <View className="border border-black-200  w-1/2 h-16 bg-dark-50 rounded-lg focus:border-slate-600 items-center flex-row px-3 ">
                    <TextInput
                      className="flex-1 font-outfit text-base"
                      value={form.yearOfPassing}
                      placeholder={"Year of Passing"}
                      placeholderTextColor={"#7b7b8b"}
                      onChangeText={(e) =>
                        setForm({
                          ...form,
                          yearOfPassing: e,
                        })
                      }
                    />
                  </View>
                  <View className="border border-black-200 flex-1 h-16 bg-dark-50 rounded-lg focus:border-slate-600 p-3 py-6 ">
                    <Dropdown
                      labelField="label"
                      valueField="value"
                      dropdownPosition="top"
                      placeholderStyle={{ color: "#C7C7CD" }}
                      selectedTextStyle={{ color: "black" }}
                      placeholder="Month of Passing"
                      data={monthList}
                      value={form.monthOfPassing}
                      onChange={(item) => {
                        handleChange("monthOfPassing", item.value);
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
          <View className="justify-center items-center space-y-4 mt-3">
            <Text className="font-outfit-bold">
              Already have an account?{" "}
              <Link href={"/login"}>
                <Text className="text-blue-500">Login</Text>
              </Link>
            </Text>
            <CustomButton
              handlePress={onSubmit}
              title={"Submit"}
              containerStyle={"bg-orange-300 mt-4 px-10 rounded-md"}
              isLoading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
