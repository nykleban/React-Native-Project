import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

export default function Header({ title, home = false }) {
  return (
    <View style={[styles.header, home && styles.homeHeader]}>
      <Text style={[styles.headerTitle, home && styles.homeTitle]}>{title}</Text>
    </View>
  );
}
