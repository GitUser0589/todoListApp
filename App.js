import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  // State to manage the to-do list
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Function to add a new todo
  const addTodo = () => {
    if (text !== '') {
      if (isEditing) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = text;
        setTodos(updatedTodos);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setTodos([...todos, text]);
      }
      setText('');
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Function to edit a todo
  const editTodo = (index) => {
    setText(todos[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* TextInput to enter a new todo */}
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={text}
        onChangeText={setText}
      />

      {/* Button to add or edit a todo */}
      <Button title={isEditing ? "Edit Task" : "Add Task"} onPress={addTodo} />

      {/* List of todos */}
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item}</Text>

            {/* Edit and Delete buttons */}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editTodo(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
