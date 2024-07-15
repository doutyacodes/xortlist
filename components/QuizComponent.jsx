import { baseURL } from "@/constants/baseData";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';

const QuizComponent = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [todoQuizData, setTodoQuizData] = useState([]);
  const { user } = useGlobalContext();

  if (!user) {
    router.replace("/home");
  }
  const [items] = useState([
   {
     key: 1,
     name: 'Cupcake',
     calories: 356,
     fat: 16,
   },
   {
     key: 2,
     name: 'Eclair',
     calories: 262,
     fat: 16,
   },
   {
     key: 3,
     name: 'Frozen yogurt',
     calories: 159,
     fat: 6,
   },
   {
     key: 4,
     name: 'Gingerbread',
     calories: 305,
     fat: 3.7,
   },
  ]);


  useEffect(() => {
    const fetchTodoQuiz = async () => {
        if (user) {
          try {
            const response = await axios.get(
              `${baseURL}/getAlltodoTasksQuiz.php?user_id=${user.id}`
            );
            console.log("Jobs : ", response.data.tasks.length); // Log response data
            if (response.data?.tasks) {
              setTodoQuizData(response.data.tasks);
            } else {
              console.error("Failed to fetch progress");
            }
          } catch (error) {
            console.error("Error while fetching progress:", error.message);
          }
        }
      };
  
      fetchTodoQuiz();
  }, []);

  return (
    <ScrollView horizontal>
        <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        <DataTable.Title>Fat</DataTable.Title>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        <DataTable.Title>Fat</DataTable.Title>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        <DataTable.Title>Fat</DataTable.Title>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        <DataTable.Title>Fat</DataTable.Title>
      </DataTable.Header>

      {items.map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.calories}</DataTable.Cell>
          <DataTable.Cell>{item.fat}</DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.calories}</DataTable.Cell>
          <DataTable.Cell>{item.fat}</DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.calories}</DataTable.Cell>
          <DataTable.Cell>{item.fat}</DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.calories}</DataTable.Cell>
          <DataTable.Cell>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      
    </DataTable>
    </ScrollView>
  );
};

export default QuizComponent;