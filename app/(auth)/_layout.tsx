// app/(auth)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
// Opcional: Si quieres usar colores del tema aquí también
// import { useTheme } from '../../context/ThemeContext';
// import Colors from '../../constants/Colors';

export default function AuthLayout() {
  // Opcional: Obtener tema si quieres estilizar el header (aunque lo ocultaremos)
  // const { colorScheme } = useTheme();
  // const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    // Usamos un Stack Navigator para las pantallas de autenticación
    // Es común ocultar el header por defecto en el flujo de auth
    // y diseñar headers personalizados dentro de cada pantalla si es necesario.
    <Stack
      screenOptions={{
        headerShown: false, // Oculta el header por defecto para todas las pantallas en este stack
        // Podrías añadir animaciones de transición aquí si quisieras
        // animation: 'slide_from_right',
      }}
    >
      {/* Define las pantallas que pertenecen a este Stack */}
      {/* El 'name' debe coincidir con el nombre del archivo de pantalla dentro de (auth) */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      {/* Descomenta si creas la pantalla de recuperar contraseña */}
      {/* <Stack.Screen name="forgot-password" /> */}

      {/* Nota: No necesitas incluir explícitamente las rutas aquí si */}
      {/* solo quieres que Expo Router las descubra automáticamente. */}
      {/* Sin embargo, definirlas aquí te da más control sobre opciones específicas */}
      {/* por pantalla si las necesitas (ej. un header específico para una sola pantalla). */}
      {/* <Stack.Screen name="login" options={{ title: 'Iniciar Sesión', headerShown: true }} /> */}

    </Stack>
  );
}