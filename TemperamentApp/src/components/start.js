import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function StartButton({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Тест на темперамент</Text>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Старт</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f6fb",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#172554",
  },
  button: {
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#4f46e5",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
