// app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { useAuth } from '../../context/AuthContext'; // Hook para acceder a signUp
import { useTheme } from '../../context/ThemeContext';
import Colors from '../../constants/Colors';

export default function RegisterScreen() {
  // Añadimos campos adicionales para el registro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { signUp } = useAuth(); // Obtenemos signUp
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter(); // Usaremos router para volver a login explícitamente

  const handleRegister = async () => {
    // --- Validaciones ---
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Podrías añadir más validaciones (longitud de contraseña, formato de email, etc.)

    setIsRegistering(true);
    try {
      // Llama a la función signUp del contexto con los datos necesarios
      await signUp({ name, email, password }); // signUp simula el registro y login directo

      // Si signUp tiene éxito (y loguea directamente), el layout raíz redirigirá a (app).
      console.log('Registro y login simulados exitosos');

      // Alternativa: Si tu signUp NO logueara automáticamente:
      // Alert.alert('Registro Exitoso', 'Ahora puedes iniciar sesión.');
      // router.replace('/(auth)/login'); // Redirigir a login manualmente

    } catch (error: any) {
      console.error("Error en handleRegister:", error);
      Alert.alert('Error de Registro', error?.message || 'No se pudo completar el registro. Inténtalo de nuevo.');
      setIsRegistering(false); // Detiene carga en caso de error
    }
     // No es necesario setIsRegistering(false) en caso de éxito
     // si el layout raíz redirige.
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Crear Cuenta</Text>

      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.textSecondary, backgroundColor: theme.background }]}
        placeholder="Nombre Completo"
        placeholderTextColor={theme.textSecondary}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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
        secureTextEntry
      />

      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.textSecondary, backgroundColor: theme.background }]}
        placeholder="Confirmar Contraseña"
        placeholderTextColor={theme.textSecondary}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Pressable
        style={[styles.button, { backgroundColor: isRegistering ? theme.secondary : theme.primary }]}
        onPress={handleRegister}
        disabled={isRegistering}
      >
        {isRegistering ? (
          <ActivityIndicator color={theme.buttonText} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Registrarse</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Text style={{ color: theme.textSecondary }}>¿Ya tienes cuenta? </Text>
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text style={[styles.linkText, { color: theme.primary }]}>Inicia Sesión</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

// --- Estilos --- (Son muy similares a los de login, puedes crear un archivo de estilos compartidos más adelante)
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
    minHeight: 50,
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