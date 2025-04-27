// context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native'; // Para detectar el tema del sistema

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Estado inicial: intenta leer del sistema, o default a 'light'
  const systemTheme = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState(systemTheme || 'light');

  // Cargar tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setColorScheme(savedTheme);
        }
        // Si no hay tema guardado, ya estamos usando el del sistema o 'light'
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };
    loadTheme();
  }, []);

  // Guardar tema cuando cambia
  const toggleTheme = async () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newColorScheme);
    try {
      await AsyncStorage.setItem('theme', newColorScheme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};