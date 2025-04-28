// context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa useRouter para la redirección después de ciertas acciones (opcional aquí, mejor en el layout)
// import { useRouter } from 'expo-router';

// --- Define la forma de los datos que proveerá el contexto ---
interface AuthContextType {
  signIn: (data?: any) => Promise<void>; // data contendrá usuario/contraseña (simulado por ahora)
  signOut: () => Promise<void>;
  signUp: (data?: any) => Promise<void>; // data contendrá datos de registro (simulado por ahora)
  userToken: string | null; // El token que indica si el usuario está logueado
  isLoading: boolean;      // Indica si se está cargando el token inicial desde AsyncStorage
}

// --- Crea el Contexto ---
// Inicializamos con undefined y añadimos un chequeo en useAuth para asegurar que se use dentro del Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Crea el Componente Provider ---
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  // const router = useRouter(); // Podrías usarlo para redirigir desde aquí, pero es más limpio en el layout

  // Efecto para cargar el token guardado al iniciar la app
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null = null;
      try {
        // Intenta obtener el token del almacenamiento seguro
        token = await AsyncStorage.getItem('userToken');
        // Aquí en una app real, podrías validar el token con tu backend
      } catch (e) {
        // Error restaurando el token
        console.error("Error al restaurar el token de autenticación:", e);
      } finally {
        // Actualiza el estado tanto si se encontró token como si no
        setUserToken(token);
        // Termina el estado de carga
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Define las acciones de autenticación usando useMemo para optimizar
  const authActions = useMemo(
    () => ({
      signIn: async (data?: any) => {
        // --- SIMULACIÓN DE LOGIN ---
        // Aquí harías una llamada a tu API con data (email, password)
        console.log("Simulando inicio de sesión con:", data);
        setIsLoading(true); // Opcional: mostrar carga durante el login
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera de red

        // Si la llamada a la API es exitosa y devuelve un token:
        const fakeToken = 'mi-token-secreto-simulado';
        try {
          await AsyncStorage.setItem('userToken', fakeToken);
          setUserToken(fakeToken);
          // La redirección la manejará el layout raíz al detectar userToken
          // router.replace('/(app)/explore'); // NO HACER aquí preferiblemente
        } catch (e) {
          console.error("Error al guardar token en signIn:", e);
          // Manejar error (mostrar mensaje al usuario, etc.)
        } finally {
          setIsLoading(false);
        }
        // Si la llamada falla, manejar el error (mostrar mensaje, no cambiar token)
      },
      signOut: async () => {
        // --- CIERRE DE SESIÓN ---
        setIsLoading(true);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.error("Error al eliminar token en signOut:", e);
        } finally {
          setUserToken(null); // Elimina el token del estado
          setIsLoading(false);
          // La redirección la manejará el layout raíz
          // router.replace('/(auth)/login'); // NO HACER aquí
        }
      },
      signUp: async (data?: any) => {
        // --- SIMULACIÓN DE REGISTRO ---
        // Aquí harías una llamada a tu API con data (email, password, nombre, etc.)
        console.log("Simulando registro con:", data);
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula espera de red

        // Si el registro es exitoso, podrías:
        // 1. Loguear al usuario directamente (como en signIn)
        // 2. O redirigirlo a la pantalla de login para que inicie sesión

        // Simularemos opción 1: Logueo directo tras registro
        const fakeToken = 'mi-token-secreto-simulado-registro';
        try {
          await AsyncStorage.setItem('userToken', fakeToken);
          setUserToken(fakeToken);
          // Redirección manejada por el layout raíz
        } catch (e) {
           console.error("Error al guardar token en signUp:", e);
        } finally {
          setIsLoading(false);
        }
        // Si falla el registro, manejar error
      },
    }),
    [] // Las dependencias vacías significan que estas funciones se crean una vez
  );

  // El valor que proveerá el contexto
  const contextValue = useMemo(
    () => ({
      isLoading,
      userToken,
      ...authActions, // Incluye signIn, signOut, signUp
    }),
    [isLoading, userToken, authActions] // El valor debe actualizarse si isLoading o userToken cambian
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook Personalizado para usar el Contexto ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Asegura que el hook se use dentro de un AuthProvider
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};