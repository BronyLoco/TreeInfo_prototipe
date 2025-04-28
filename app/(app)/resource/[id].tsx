// app/(app)/resource/[id].tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Importa tus contextos para el tema si es necesario
import { useTheme } from '../../../context/ThemeContext'; // Ajusta la ruta relativa
import Colors from '../../../constants/Colors'; // Ajusta la ruta relativa

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Obtiene el parámetro 'id' de la URL
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Puedes mostrar un estado de carga aquí mientras buscas los datos reales del recurso

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Configura el título del header dinámicamente */}
      <Stack.Screen options={{ title: `Recurso ${id || 'Desconocido'}` }} />
      <Text style={[styles.title, { color: theme.text }]}>Detalles del Recurso</Text>
      <Text style={{ color: theme.textSecondary }}>ID del recurso solicitado: {id}</Text>
      {/* Aquí mostrarías los detalles reales del recurso 'id' */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});