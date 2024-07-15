import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { baseURL } from "@/constants/baseData";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "./CustomButton";
import Toast from "react-native-toast-message";

const EditProfile = ({ setReloadData, reloadData }) => {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    name: "",
    education: "",
    college: "",
    university: "",
    student: "no",
    gender: "Mr",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [genderList, setGenderList] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Other", value: "Other" },
  ]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      getUserDetails();
    }
  }, [user]);
  const [educationList] = useState([
    { label: "Post Doctoral Fellowship", value: "Post Doctoral Fellowship" },
    { label: "PHD", value: "PHD" },
    { label: "Masters Degree", value: "Masters Degree" },
    { label: "Bachelors Degree", value: "Bachelors Degree" },
    { label: "Secondary School", value: "Secondary School" },
  ]);
  const getUserDetails = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/getUserEditDetails.php`,
        {
          id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.data) {
        const userData = response.data.data;
        setForm({
          name: userData.name,
          education: userData.education,
          college: userData.college,
          university: userData.university,
          student: userData.student,
          gender: userData.gender,
        });
      } else {
        console.error("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (name, value) => {
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    if (!form.name || !form.education || !form.gender) {
      Toast.show({
        type: "error",
        text1: "Missing Field",
        text2: "Please fill all required fields to continue.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("education", form.education);
      formData.append("college", form.college);
      formData.append("university", form.university);
      formData.append("student", form.student);
      formData.append("gender", form.gender);
      formData.append("id", user.id);

      const response = await axios.post(`${baseURL}/updateUser.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setReloadData(!reloadData);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "User details updated successfully.",
        });
      } else {
        Alert.alert("Error", response.data.error[0] || "Something went wrong.");
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

  return (
    <View className="h-full w-full bg-white p-4">
      <View className="w-full">
        <Text className="font-outfit-semibold text-xl mb-4">
          Edit My Profile
        </Text>
        <View className="space-y-4">
          <View>
            <Text className="text-base font-outfit mb-2">Education</Text>
            <Dropdown
              data={educationList}
              labelField="label"
              valueField="value"
              placeholder="Select your education"
              value={form.education}
              onChange={(item) => handleChange("education", item.value)}
              className="border border-black-200 p-3 rounded-lg"
            />
          </View>
          <View>
            <Text className="text-base font-outfit mb-2">
              Are you currently a student?
            </Text>
            <Dropdown
              data={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={form.student}
              onChange={(item) => handleChange("student", item.value)}
              className="border border-black-200 p-3 rounded-lg"
            />
          </View>
          {form.student === "yes" && (
            <>
              <View>
                <Text className="text-base font-outfit mb-2">College</Text>
                <TextInput
                  value={form.college}
                  placeholder="College"
                  onChangeText={(value) => handleChange("college", value)}
                  className="border border-black-200 p-3 rounded-lg"
                />
              </View>
              <View>
                <Text className="text-base font-outfit mb-2">University</Text>
                <TextInput
                  value={form.university}
                  placeholder="University"
                  onChangeText={(value) => handleChange("university", value)}
                  className="border border-black-200 p-3 rounded-lg"
                />
              </View>
            </>
          )}
          <View>
            <Text className="text-base font-outfit mb-2">Gender</Text>
            <Dropdown
              data={genderList}
              labelField="label"
              valueField="value"
              placeholder="Select your gender"
              value={form.gender}
              onChange={(item) => handleChange("gender", item.value)}
              className="border border-black-200 p-3 rounded-lg"
            />
          </View>
          <CustomButton
            handlePress={submitForm}
            isLoading={isLoading}
            title={"Submit"}
            containerStyle={"bg-black mt-4 rounded-md"}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
