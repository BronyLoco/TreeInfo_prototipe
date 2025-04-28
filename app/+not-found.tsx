// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Importa tus contextos para aplicar el tema
import { useTheme } from '../context/ThemeContext'; // Ajusta la ruta si es necesario
import Colors from '../constants/Colors'; // Ajusta la ruta si es necesario

export default function NotFoundScreen() {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <>
      {/* Oculta el header o ponle un título curioso */}
      <Stack.Screen options={{ title: '¿Estás perdido?', headerShown: false }} />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Puedes añadir un icono o emoji grande aquí si quieres */}
        <Text style={[styles.emoji, {opacity: 0.8}]}>🤔</Text>

        <Text style={[styles.title, { color: theme.primary }]}>
          Vaya... territorio desconocido
        </Text>

        <Text style={[styles.message, { color: theme.textSecondary }]}>
          Si estás viendo esto, algo muy raro pasó.
          No deberías estar aquí. ¿Quizás... llamas a alguien? 📞
          O mejor, vuelve a la seguridad.
        </Text>

        {/* Enlace para volver a la pantalla principal */}
        <Link href="/(app)/explore" style={styles.link}>
          <Text style={[styles.linkText, { color: theme.primary }]}>
            ¡Sácame de aquí!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30, // Más padding para centrar mejor el texto
    textAlign: 'center', // Centra el texto de los hijos por defecto
  },
   emoji: {
    fontSize: 60, // Emoji grande
    marginBottom: 25,
  },
  title: {
    fontSize: 26, // Un poco más grande
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 17, // Un poco más grande para el mensaje
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24, // Mejora legibilidad
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 18, // Enlace más prominente
    fontWeight: 'bold',
  },
});