import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', date: '', priority: 'low' },
  });

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodos(current => [...current, ...data.todos]))
      .catch(err => console.log(err));
  }, []);

  const addTodo = ({ title, date, priority }) => {
    setTodos(current => [{
      id: `local-${Date.now()}`,
      todo: title.trim(),
      date,
      priority,
      status: 'to-do',
      completed: false,
    }, ...current]);
    reset();
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ODOT List</Text>
        <Text style={styles.date}>20th October 2026</Text>
      </View>

      {showForm && (
        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            rules={{ validate: value => value.trim().length > 0 }}
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} placeholder="Назва" onChangeText={onChange} value={value} />
            )}
          />
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} placeholder="Дата" onChangeText={onChange} value={value} />
            )}
          />
          <Text>Пріоритет:</Text>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <View style={styles.priorityRow}>
                {['low', 'medium', 'high'].map(priority => (
                  <TouchableOpacity key={priority} onPress={() => onChange(priority)}>
                    <Text style={value === priority ? styles.selectedPriority : styles.priority}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {(errors.title || errors.date) && <Text style={styles.error}>Введіть назву та дату</Text>}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(addTodo)}>
            <Text style={styles.submitText}>Додати</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <View style={styles.taskDetails}>
              <Text style={styles.taskText}>{item.completed ? '✅ ' : ''}{item.todo}</Text>
              {item.date && <Text style={styles.taskMeta}>{item.date} · {item.priority}</Text>}
            </View>
            <Text style={styles.status}>{item.status || (item.completed ? 'Done' : 'Todo')}</Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <Text style={styles.icon}>☷</Text>
        <Text style={styles.icon}>◷</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        <Text style={styles.icon}>♧</Text>
        <Text style={styles.icon}>♙</Text>
      </View>
    </View>
  );
}
