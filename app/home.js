// app/home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Importa el hook
import Colors from '../constants/Colors';

export default function HomeScreen() {
  const { colorScheme } = useTheme(); // Obtén el tema
  const theme = Colors[colorScheme] || Colors.light; // Obtén la paleta

  return (
    // Aplica los colores del tema
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>
          Pantalla Principal
      </Text>
      <Text style={{ color: theme.text }}>
          Ahora esta pantalla reacciona al cambio de tema.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});