
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity
} from 'react-native';
import styles from './styles';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>ODOT List</Text>
        <Text style={styles.date}>20th October 2026</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>
              {item.completed ? '✅ ' : ''}
              {item.todo}
            </Text>
            <Text style={styles.status}>
              {item.completed ? 'Done' : 'Todo'}
            </Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <Text style={styles.icon}>☷</Text>
        <Text style={styles.icon}>◷</Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <Text style={styles.icon}>♧</Text>
        <Text style={styles.icon}>♙</Text>
      </View>

    </View>
  );
}
