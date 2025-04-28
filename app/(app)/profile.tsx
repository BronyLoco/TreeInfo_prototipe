// app/(app)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
// Opcional: Para un icono si no tienes imagen
// import { Ionicons } from '@expo/vector-icons';

// Ajusta rutas de importación
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';

export default function ProfileScreen() {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { userToken, signOut } = useAuth(); // Obtén el token y la función de logout

  // --- Placeholder para datos del usuario ---
  // En una app real, obtendrías estos datos del AuthContext
  // (si los almacena) o mediante una llamada a tu API usando el userToken.
  const userName = "Nombre de Usuario"; // Placeholder
  const userEmail = "usuario@ejemplo.com"; // Placeholder
  const profileImageUrl = null; // Placeholder - null para mostrar icono/iniciales
  // const profileImageUrl = 'https://url-de-tu-imagen.com/avatar.jpg'; // Ejemplo con URL
  // ------------------------------------------

  const handleEditProfile = () => {
    // Navegar a una pantalla de edición (futura implementación)
    Alert.alert("Función Futura", "Aquí podrías navegar a una pantalla para editar el perfil.");
  };

  const handleChangePassword = () => {
     // Navegar a una pantalla de cambio de contraseña (futura implementación)
    Alert.alert("Función Futura", "Aquí podrías navegar a una pantalla para cambiar la contraseña.");
  };

  // La función de logout ahora está principalmente en el Drawer,
  // pero podríamos añadirla aquí también si se desea redundancia.
  // const handleLogout = async () => {
  //   await signOut();
  // };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Sección de Avatar/Imagen */}
      <View style={styles.avatarContainer}>
        {profileImageUrl ? (
          <Image source={{ uri: profileImageUrl }} style={styles.avatarImage} />
        ) : (
          // Placeholder si no hay imagen (ej. iniciales o icono)
          <View style={[styles.avatarPlaceholder, { backgroundColor: theme.secondary }]}>
            {/* <Ionicons name="person" size={60} color={theme.primary} /> */}
            <Text style={[styles.avatarText, { color: theme.primary }]}>
              {userName?.charAt(0)?.toUpperCase() || 'U'} {/* Inicial del nombre */}
            </Text>
          </View>
        )}
      </View>

      {/* Información del Usuario */}
      <Text style={[styles.userName, { color: theme.text }]}>{userName}</Text>
      <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{userEmail}</Text>

      {/* Separador */}
      <View style={[styles.separator, { backgroundColor: theme.textSecondary }]} />

      {/* Opciones de Cuenta */}
      <Pressable style={styles.optionButton} onPress={handleEditProfile}>
        {/* <Ionicons name="create-outline" size={22} color={theme.text} style={styles.optionIcon} /> */}
        <Text style={[styles.optionText, { color: theme.text }]}>Editar Perfil</Text>
      </Pressable>

      <Pressable style={styles.optionButton} onPress={handleChangePassword}>
        {/* <Ionicons name="lock-closed-outline" size={22} color={theme.text} style={styles.optionIcon} /> */}
        <Text style={[styles.optionText, { color: theme.text }]}>Cambiar Contraseña</Text>
      </Pressable>

      {/* Botón de Logout (Opcional aquí, ya está en el Drawer) */}
      {/*
      <Pressable style={[styles.optionButton, styles.logoutButton]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={Colors.common.error} style={styles.optionIcon} />
        <Text style={[styles.optionText, { color: Colors.common.error }]}>Cerrar Sesión</Text>
      </Pressable>
      */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40, // Más espacio arriba
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Hace la imagen circular
    borderWidth: 3,
    borderColor: '#ccc', // O theme.secondary
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 25,
  },
  separator: {
    height: 1,
    width: '90%', // No ocupa todo el ancho
    marginBottom: 25,
    opacity: 0.5,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10, // Padding interno
    marginBottom: 10, // Espacio entre botones
    // borderBottomWidth: 1, // Alternativa: separadores de línea
    // borderBottomColor: '#eee', // O theme.textSecondary con opacidad
    borderRadius: 8, // Opcional: bordes redondeados para los botones
    // backgroundColor: theme.secondary, // Opcional: fondo ligero
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
  },
  // Estilo opcional para el botón de logout si lo añades aquí
  // logoutButton: {
  //   marginTop: 20, // Más espacio antes del logout
  // }
});