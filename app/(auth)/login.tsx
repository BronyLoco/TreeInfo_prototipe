// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Link para ir a Registro, useRouter si necesitas navegación compleja

import { useAuth } from '../../context/AuthContext'; // Hook para acceder a signIn
import { useTheme } from '../../context/ThemeContext'; // Hook para colores del tema
import Colors from '../../constants/Colors'; // Paleta de colores

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para mostrar carga

  const { signIn } = useAuth(); // Obtiene la función signIn del contexto
  const { colorScheme } = useTheme(); // Obtiene el esquema de color actual
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light']; // Obtiene la paleta de colores
  // const router = useRouter(); // Descomenta si necesitas navegación más compleja

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor, introduce tu correo y contraseña.');
      return;
    }
    setIsLoggingIn(true); // Inicia indicador de carga
    try {
      // Llama a la función signIn del contexto.
      // Esta función (en AuthContext) ahora SIMULA el login.
      // En una app real, manejaría la llamada API.
      await signIn({ email, password });
      // Si signIn tiene éxito, el useEffect en app/_layout (raíz)
      // detectará el cambio en userToken y redirigirá automáticamente a (app).
      // Por eso no necesitamos router.replace aquí.
      console.log('Inicio de sesión simulado exitoso');

    } catch (error: any) {
      // Si signIn (o la API real) lanzara un error, lo capturamos aquí
      console.error("Error en handleLogin:", error);
      Alert.alert('Error de inicio de sesión', error?.message || 'No se pudo iniciar sesión. Inténtalo de nuevo.');
      setIsLoggingIn(false); // Detiene indicador de carga en caso de error
    }
    // No es necesario setIsLoggingIn(false) en caso de éxito,
    // ya que la pantalla cambiará debido a la redirección del layout raíz.
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Iniciar Sesión</Text>

      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.textSecondary, backgroundColor: theme.background }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.textSecondary, backgroundColor: theme.background }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Oculta la contraseña
      />

      <Pressable
        style={[styles.button, { backgroundColor: isLoggingIn ? theme.secondary : theme.primary }]}
        onPress={handleLogin}
        disabled={isLoggingIn} // Deshabilita el botón mientras carga
      >
        {isLoggingIn ? (
          <ActivityIndicator color={theme.buttonText} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Entrar</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Text style={{ color: theme.textSecondary }}>¿No tienes cuenta? </Text>
        {/* Link te permite navegar a otras rutas definidas en Expo Router */}
        <Link href="/(auth)/register" asChild>
          <Pressable>
            <Text style={[styles.linkText, { color: theme.primary }]}>Regístrate</Text>
          </Pressable>
        </Link>
      </View>
        {/* Descomenta si creas la pantalla de recuperar contraseña */}
      {/*
      <View style={styles.footer}>
         <Link href="/(auth)/forgot-password" asChild>
          <Pressable>
            <Text style={[styles.linkText, { color: theme.textSecondary, fontSize: 14 }]}>¿Olvidaste tu contraseña?</Text>
          </Pressable>
        </Link>
      </View>
      */}
    </View>
  );
}

// --- Estilos --- (Asegúrate de que usen los colores del tema)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 50, // Para dar espacio al ActivityIndicator
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});