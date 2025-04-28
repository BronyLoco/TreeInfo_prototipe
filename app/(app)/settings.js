// app/settings.js
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext'; // Importa el hook
import Colors from '../../constants/Colors'; // Importa los colores base

export default function SettingsScreen() {
  const { colorScheme, toggleTheme } = useTheme(); // Usa el hook para obtener el tema y la función toggle
  const isDarkMode = colorScheme === 'dark';
  const theme = Colors[colorScheme] || Colors.light; // Obtiene la paleta de colores actual

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Ajustes de Apariencia</Text>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: theme.text }]}>Modo Oscuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: theme.secondary }} // Colores del "riel"
          thumbColor={isDarkMode ? theme.primary : '#f4f3f4'} // Color del botón deslizable
          ios_backgroundColor="#3e3e3e" // Fondo en iOS cuando está apagado
          onValueChange={toggleTheme} // Llama a la función del contexto al cambiar
          value={isDarkMode} // El valor del switch depende si estamos en modo oscuro
        />
      </View>

      {/* Puedes añadir más opciones de configuración aquí */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // Quitado para que el contenido empiece arriba
    alignItems: 'center',
    paddingTop: 20, // Espacio arriba
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30, // Más espacio debajo del título
  },
  optionContainer: {
    flexDirection: 'row', // Coloca etiqueta y switch en la misma línea
    justifyContent: 'space-between', // Separa la etiqueta y el switch
    alignItems: 'center', // Centra verticalmente en la fila
    width: '100%', // Ocupa todo el ancho
    paddingVertical: 15, // Espacio vertical para cada opción
    borderBottomWidth: 1, // Línea separadora sutil
    // borderBottomColor: theme.textSecondary, // Color de la línea (¡Necesitas pasar theme aquí!)
    // Para pasar theme a StyleSheet, necesitarías crearlo dentro del componente o usar una HOC/hook.
    // Por simplicidad ahora, usaré un color fijo, pero idealmente sería del tema.
    borderBottomColor: '#cccccc',
  },
  optionText: {
    fontSize: 18,
  },
});