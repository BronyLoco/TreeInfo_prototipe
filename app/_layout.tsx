// app/_layout.js
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
// *** Importa el tipo necesario ***
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps // <-- ¡Importa este tipo!
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';

import Colors from '../constants/Colors';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// --- 1. Define el Componente Personalizado del Drawer ---
// *** Tipa el parámetro 'props' ***
function CustomDrawerContent(props: DrawerContentComponentProps) { // <-- ¡Aplica el tipo aquí!
  const { colorScheme } = useTheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <DrawerContentScrollView
      {...props}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <DrawerItemList {...props} />
      {/* ... contenido opcional ... */}
    </DrawerContentScrollView>
  );
}


// --- 2. Define el Layout Principal de la Aplicación ---
function AppLayout() {
  const { colorScheme } = useTheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // ... tus screenOptions ...
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.buttonText,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.textSecondary,
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      { /* ... Tus Drawer.Screen ... */ }
      <Drawer.Screen name="index" options={{ drawerLabel: () => null, title: 'Bienvenida', headerShown: false, drawerItemStyle: { height: 0 } }}/>
      <Drawer.Screen name="home" options={{ drawerLabel: 'Inicio', title: 'Página Principal' }}/>
      <Drawer.Screen name="profile" options={{ drawerLabel: 'Mi Perfil', title: 'Perfil de Usuario' }}/>
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Configuración', title: 'Ajustes' }}/>
    </Drawer>
  );
}

// --- 3. Exporta el Layout Raíz que provee el Contexto ---
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}