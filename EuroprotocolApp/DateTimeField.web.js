import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import styles from '../styles';

function formatValue(date, mode) {
  const two = (number) => String(number).padStart(2, '0');
  if (mode === 'time') return `${two(date.getHours())}:${two(date.getMinutes())}`;
  return `${two(date.getDate())}.${two(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export default function DateTimeField({ label, value, mode, onChange }) {
  const [show, setShow] = useState(false);

  function openPicker() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value,
        mode,
        is24Hour: true,
        maximumDate: mode === 'date' ? new Date() : undefined,
        onChange: (event, selectedDate) => {
          if (event.type === 'set' && selectedDate) onChange(selectedDate);
        },
      });
    } else {
      setShow(true);
    }
  }

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable style={styles.pickerButton} onPress={openPicker}>
        <FontAwesome5 name={mode === 'date' ? 'calendar-alt' : 'clock'} size={20} color="#557b76" />
        <Text style={styles.pickerText}>{formatValue(value, mode)}</Text>
      </Pressable>
      {show && Platform.OS === 'ios' && (
        <View style={styles.iosPicker}>
          <DateTimePicker
            value={value}
            mode={mode}
            display="spinner"
            is24Hour
            maximumDate={mode === 'date' ? new Date() : undefined}
            onChange={(event, selectedDate) => {
              if (selectedDate) onChange(selectedDate);
            }}
          />
          <Pressable style={styles.pickerDone} onPress={() => setShow(false)}>
            <Text style={styles.pickerDoneText}>Готово</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
