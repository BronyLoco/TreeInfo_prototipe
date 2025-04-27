// app/index.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Opcional: para enlaces a otras pantallas

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la Pantalla Profiles</Text>
      {/* Ejemplo de cómo navegar a otra pantalla definida en tu router */}
      <Link href="/index" style={styles.link}>
        Ir a Index
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'blue',
    fontSize: 16,
  },
});