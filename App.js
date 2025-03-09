import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { CheckBox } from "@rneui/themed";

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Complete React Native assignment", completed: false },
    { key: "2", description: "Complete Coding Assignment 3", completed: false },
  ]);

  const [taskText, setTaskText] = useState("");

  const toggleTaskCompletion = (taskKey) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === taskKey ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        key: String(tasks.length + 1),
        description: taskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox checked={item.completed} onPress={() => toggleTaskCompletion(item.key)} />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>ToDo List</Text>

      {/* Task List */}
      <FlatList data={tasks} renderItem={renderItem} />

      {/* Input to add new task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Center the title
    marginVertical: 20,  // Add margin for spacing
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


