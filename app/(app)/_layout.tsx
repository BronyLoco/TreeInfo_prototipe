// app/(app)/_layout.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItemList, // Ya no se usa
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer'; // Asegúrate que es de expo-router/drawer

// Ajusta las rutas relativas si es necesario
import Colors from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// --- 1. Componente Personalizado para el Contenido del Drawer ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useTheme();
  const { signOut } = useAuth();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { navigation, state } = props; // 'state' tiene info sobre las rutas y la activa

  // Función para saber si una ruta está activa
  const isActive = (routeName: string) => {
    // Encuentra el índice de la ruta activa actual en el estado del Drawer
    const activeRouteIndex = state.routes.findIndex(route => route.name === state.routeNames[state.index]);
    // Compara si el nombre de la ruta activa es el mismo que el nombre de la ruta del ítem
    return state.routes[activeRouteIndex]?.name === routeName;
  };

  // Función para renderizar cada ítem del drawer manualmente
  const renderDrawerItem = (routeName: string, label: string) => {
    const active = isActive(routeName);
    return (
      <Pressable
        key={routeName} // Añade una key única
        onPress={() => navigation.navigate(routeName)}
        style={({ pressed }) => [ // Permite estilos al presionar
            styles.drawerItem,
            // Opcional: Añade un fondo ligero al item activo
            // active ? { backgroundColor: theme.secondary } : null,
            pressed ? { opacity: 0.7 } : null // Feedback visual
        ]}
      >
        <Text style={[
          styles.drawerItemText,
          // Aplica color primario si está activo, secundario si no
          { color: active ? theme.primary : theme.textSecondary },
          // Opcional: Hacer el texto más grueso si está activo
          active ? { fontWeight: 'bold' } : { fontWeight: '500' },
        ]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    await signOut();
    // La redirección es manejada por el layout raíz
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ flex: 1, backgroundColor: theme.background }} // Aplica fondo del tema
    >
      {/* --- Renderiza los ítems manualmente --- */}
      {renderDrawerItem('explore', 'Explorar')}
      {renderDrawerItem('saved', 'Guardados')}
      {renderDrawerItem('profile', 'Mi Perfil')}
      {renderDrawerItem('settings', 'Configuración')}
      {/* --- Fin Items --- */}

      {/* --- Sección y Botón de Cerrar Sesión --- */}
      <View style={[styles.logoutSection, { borderTopColor: theme.textSecondary }]}>
          <Pressable
              style={({ pressed }) => [
                  styles.logoutButton,
                  { backgroundColor: pressed ? theme.secondary : theme.primary },
              ]}
              onPress={handleLogout}
          >
              <Text style={[styles.logoutButtonText, { color: theme.buttonText }]}>Cerrar Sesión</Text>
          </Pressable>
      </View>

    </DrawerContentScrollView>
  );
}


// --- 2. Layout Principal del Grupo (app) usando Drawer ---
export default function AppDrawerLayout() {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <Drawer
      // Asegúrate de pasar el componente personalizado correcto
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        // Estilos del Header basados en el tema
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.buttonText,

        // Estas opciones ya no afectan directamente a los labels porque usamos renderizado manual
        // drawerActiveTintColor: theme.primary,
        // drawerInactiveTintColor: theme.textSecondary,
        // drawerLabelStyle: { marginLeft: -20 }, // Podrías mover estilos comunes a styles.drawerItemText

        // Puedes mantener otras opciones generales del Drawer si las necesitas
        // swipeEnabled: true,
      }}
    >
      {/* Las definiciones de Screen siguen siendo necesarias para que el router conozca las pantallas */}
      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explorar Recursos', // Título del Header para esta pantalla
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: 'Mis Recursos Guardados',
        }}
      />
      <Drawer.Screen
        name="resource/[id]" // Pantalla de detalle (no visible en Drawer)
        options={{
          drawerItemStyle: { height: 0 }, // Oculto del drawer
          title: 'Detalle del Recurso',    // Título del header
          headerShown: true,             // Asegura que tenga header
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Perfil de Usuario',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Ajustes',
        }}
      />
    </Drawer>
  );
}

// --- 3. Estilos para el Componente ---
const styles = StyleSheet.create({
    // Estilos para los items manuales del drawer
    drawerItem: {
        paddingVertical: 16, // Un poco más de espacio vertical
        paddingHorizontal: 20,
    },
    drawerItemText: {
        fontSize: 16,
        // fontWeight se aplica dinámicamente arriba
    },
    // Estilos para la sección de logout
    logoutSection: {
        padding: 20,
        marginTop: 'auto', // Empuja la sección de logout hacia abajo (si DrawerContentScrollView lo permite bien)
        paddingTop: 20, // Espacio sobre el botón
        borderTopWidth: 1,
        // borderTopColor se aplica dinámicamente arriba
        opacity: 0.8, // Hacerla un poco menos prominente
    },
    logoutButton: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        // color se aplica dinámicamente arriba
    },
});