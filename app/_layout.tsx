// app/_layout.tsx (Layout Raíz)
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native'; // Para pantalla de carga
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';

import { AuthProvider, useAuth } from '../context/AuthContext'; // Importa el AuthContext
import { ThemeProvider } from '../context/ThemeContext'; // Mantenemos el ThemeProvider

// Oculta el splash screen nativo tan pronto como sea posible
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { userToken, isLoading } = useAuth(); // Obtiene estado de autenticación
  const segments = useSegments(); // Obtiene los segmentos de la ruta actual (ej. ['(app)', 'explore'])
  const router = useRouter(); // Obtiene el router para navegar

  useEffect(() => {
    // Espera hasta que el estado de carga del AuthContext termine
    if (isLoading) {
      return; // No hagas nada mientras carga
    }

    const inAuthGroup = segments[0] === '(auth)'; // ¿Estamos en el flujo de autenticación?
    const inAppGroup = segments[0] === '(app)'; // ¿Estamos en el flujo principal?

    // --- Lógica de Redirección ---

    if (userToken && !inAppGroup) {
      // Si hay token (logueado) pero NO estamos en el grupo (app),
      // redirige a la pantalla principal de la app.
      console.log("Redirigiendo al grupo (app)... Usuario con token:", userToken);
      router.replace('/(app)/explore'); // Usa replace para no añadir al historial

    } else if (!userToken && !inAuthGroup && segments[0] !== undefined) {
      // Si NO hay token (no logueado) y NO estamos en el grupo (auth)
      // Y NO estamos en la raíz inicial (index, que aún no pertenece a un grupo)
      // redirige al inicio de sesión.
      console.log("Redirigiendo al grupo (auth)...");
      router.replace('/(auth)/login');

    } else if (!isLoading) {
        // Si ya no estamos cargando y no hubo redirección (ya estamos donde debemos),
        // oculta el splash screen nativo.
        SplashScreen.hideAsync();
    }

  }, [isLoading, userToken, segments, router]); // Ejecuta el efecto si cambian estos valores

  // --- Renderizado Condicional ---

  if (isLoading) {
    // Muestra un indicador de carga mientras se verifica el token
    // Puedes personalizar esto con tu propio componente de Splash Screen si quieres
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si ya no está cargando, renderiza el Stack principal.
  // Expo Router se encargará de mostrar el contenido correcto
  // basado en la URL actual (que ajustamos con router.replace en useEffect).
  // Usamos un Stack aquí para que las transiciones entre (auth) y (app)
  // puedan ser animadas si se desea, aunque las rutas internas de cada grupo
  // tendrán sus propios navegadores (Stack para auth, Drawer para app).
  return (
      <Stack screenOptions={{ headerShown: false /* Oculta header del Stack raíz */ }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
          {/* La pantalla 'index' (presentación) no necesita estar explícitamente aquí, */}
          {/* ya que el router la manejará antes de entrar a un grupo */}
          {/* También puedes añadir aquí pantallas modales globales si las tienes */}
          {/* <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} /> */}
      </Stack>
  );
}

// --- Componente Raíz Exportado ---
export default function RootLayout() {
  // Envuelve la aplicación con TODOS los providers necesarios
  // El orden puede importar si un provider depende de otro
  return (
    // 1. AuthProvider: Debe envolver todo para que useAuth esté disponible en InitialLayout
    <AuthProvider>
      {/* 2. ThemeProvider: Envuelve todo para el tema */}
      <ThemeProvider>
        {/* 3. InitialLayout: Contiene la lógica de carga y redirección */}
        <InitialLayout />
      </ThemeProvider>
    </AuthProvider>
  );
}