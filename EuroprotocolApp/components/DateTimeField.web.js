
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

const two = (number) => String(number).padStart(2, '0');

export default function DateTimeField({ label, value, mode, onChange }) {
  // Форматуємо дату для браузера
  const dateText = `${value.getFullYear()}-${two(value.getMonth() + 1)}-${two(value.getDate())}`;
  const timeText = `${two(value.getHours())}:${two(value.getMinutes())}`;

  // Поточна дата
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${two(today.getMonth() + 1)}-${two(today.getDate())}`;

  function handleChange(event) {
    const text = event.target.value;
    if (!text) return;

    if (mode === 'date') {
      const [year, month, day] = text.split('-').map(Number);

      onChange(
        new Date(year, month - 1, day, value.getHours(), value.getMinutes())
      );
    } else {
      const [hours, minutes] = text.split(':').map(Number);

      const updated = new Date(value);
      updated.setHours(hours, minutes, 0, 0);
      onChange(updated);
    }
  }

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <input
        type={mode}
        value={mode === 'date' ? dateText : timeText}
        max={mode === 'date' ? maxDate : undefined}
        onChange={handleChange}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          border: '1px solid #c8d3d0',
          borderRadius: 8,
          padding: 15,
          color: '#20312f',
          fontSize: 16,
          minHeight: 51,
          fontFamily: 'inherit',
        }}
      />
    </View>
  );
}
// додатковий файл згенерований для гарного виводу часу