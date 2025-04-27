// app/index.js
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router'; // Hook para navegar
import Colors from '../constants/Colors'; // Importa tus colores

// Elige el tema (puedes hacerlo dinámico más adelante)
const colorScheme = 'light'; // O 'dark'
const theme = Colors[colorScheme];

export default function PresentationScreen() {
  const router = useRouter();

  const goToHome = () => {
    // Reemplaza la pantalla actual con 'home', así el usuario no puede volver atrás a la presentación
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/tree-icon.png')} // ¡Necesitas añadir una imagen aquí!
        style={styles.image}
        resizeMode="contain" // Ajusta cómo se muestra la imagen
      />
      <Text style={styles.title}>Cuidemos Nuestro Planeta</Text>
      <Text style={styles.subtitle}>
        Pequeñas acciones diarias marcan una gran diferencia para el futuro de nuestro hogar. ¡Únete al cambio!
      </Text>
      <Pressable style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </Pressable>
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centra verticalmente
    backgroundColor: theme.background, // Usa el color de fondo del tema
    paddingHorizontal: 30, // Añade padding a los lados
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    // Podrías aplicar un tintColor si tu imagen es monocromática y quieres colorearla
    // tintColor: theme.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.primary, // Usa el color primario del tema
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary, // Usa el color de texto secundario
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24, // Mejora la legibilidad
  },
  button: {
    backgroundColor: theme.primary, // Color de fondo del botón
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25, // Bordes redondeados
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: theme.buttonText, // Color del texto del botón (definido en Colors.js)
    fontSize: 18,
    fontWeight: 'bold',
  },
});