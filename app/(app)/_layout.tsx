// app/(app)/_layout.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native'; // Necesario para el botón de logout
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  // DrawerItem // Descomenta si añades items personalizados
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
// Opcional: Para iconos
// import { Ionicons } from '@expo/vector-icons';

// Ajusta las rutas relativas porque ahora estamos un nivel más adentro
import Colors from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext'; // Importa useAuth para logout

// --- 1. Define el Componente Personalizado del Drawer ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useTheme();
  const { signOut, userToken } = useAuth(); // Obtiene signOut y quizás userToken para mostrar info
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleLogout = async () => {
    await signOut();
    // La redirección a (auth)/login la manejará el layout raíz al detectar userToken=null
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      {/* Puedes añadir un header personalizado aquí si quieres */}
      {/* <View style={styles.drawerHeader}>
        <Text style={{color: theme.text}}>Bienvenido!</Text>
      </View> */}

      {/* Renderiza la lista estándar */}
      <DrawerItemList {...props} />

      {/* --- Botón de Cerrar Sesión --- */}
      <View style={styles.logoutSection}>
          <Pressable
              style={({ pressed }) => [
                  styles.logoutButton,
                  { backgroundColor: pressed ? theme.secondary : theme.primary }, // Feedback visual
              ]}
              onPress={handleLogout}
          >
               {/* <Ionicons name="log-out-outline" size={22} color={theme.buttonText} style={{marginRight: 10}} /> */}
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </Pressable>
      </View>

    </DrawerContentScrollView>
  );
}


// --- 2. Define el Layout Principal de la Aplicación (Drawer) ---
// No necesita ser un componente separado como antes, ya que este archivo es el layout del grupo
export default function AppDrawerLayout() {
  const { colorScheme } = useTheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Drawer
      // Pasa el componente personalizado para el contenido
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      // Opciones globales para las pantallas dentro del Drawer
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.buttonText,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.textSecondary,
        // drawerActiveBackgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      {/* --- Pantallas Definidas DENTRO del Grupo (app) --- */}
      {/* El 'name' debe coincidir con el nombre del archivo .tsx en app/(app)/ */}

      <Drawer.Screen
        name="explore" // Corresponde a app/(app)/explore.tsx (antes era 'home')
        options={{
          drawerLabel: 'Explorar',
          title: 'Explorar Recursos',
          // drawerIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="saved" // Corresponde a app/(app)/saved.tsx (Nueva pantalla)
        options={{
          drawerLabel: 'Guardados',
          title: 'Mis Recursos Guardados',
           // drawerIcon: ({ color, size }) => <Ionicons name="bookmark-outline" size={size} color={color} />,
        }}
      />

       {/* Ruta dinámica para detalles - NO suele ir en el Drawer directamente */}
       {/* Se accederá navegando desde 'explore' o 'saved' */}
       <Drawer.Screen
        name="resource/[id]" // Corresponde a app/(app)/resource/[id].tsx
        options={{
          // Oculta esta pantalla del menú lateral
          drawerItemStyle: { height: 0 },
          title: 'Detalle del Recurso', // El header sí tendrá título
          headerShown: true, // Muestra el header en la pantalla de detalle
        }}
      />

      <Drawer.Screen
        name="profile" // Corresponde a app/(app)/profile.tsx (Existente)
        options={{
          drawerLabel: 'Mi Perfil',
          title: 'Perfil de Usuario',
          // drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="settings" // Corresponde a app/(app)/settings.tsx (Existente)
        options={{
          drawerLabel: 'Configuración',
          title: 'Ajustes',
          // drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />

       {/* Si tuvieras modales definidos en (app)/(modal), podrías declararlos aquí */}
       {/* con options={{ presentation: 'modal' }} si el Drawer Stack los manejara, */}
       {/* aunque es más común manejarlos desde el Stack raíz o con router.push */}

    </Drawer>
  );
}

// --- Estilos para el botón de Logout ---
const styles = StyleSheet.create({
    logoutSection: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc' // O usa theme.textSecondary si lo pasas
    },
    logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff' // O usa theme.buttonText
    },
     // Estilos opcionales para un header en el drawer
    // drawerHeader: {
    //     padding: 20,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc', // O theme.textSecondary
    // },
});