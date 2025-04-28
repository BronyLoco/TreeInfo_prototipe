// app/(app)/explore.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router'; // Para navegar a los detalles del recurso

// Ajusta las rutas de importación (ahora estamos en app/(app)/)
import { useTheme } from '../../context/ThemeContext';
import Colors from '../../constants/Colors';
// Podrías necesitar useAuth si mostraras info del usuario aquí
// import { useAuth } from '../../context/AuthContext';

// --- Datos de Ejemplo ---
// En una app real, estos datos vendrían de una API
const sampleResources = [
  { id: '1', title: 'Guía de Reforestación Urbana', type: 'Documento', summary: 'Pasos para plantar árboles en tu ciudad.' },
  { id: '2', title: 'Impacto del Plástico en Océanos', type: 'Video', summary: 'Documental corto sobre la contaminación marina.' },
  { id: '3', title: 'Técnicas de Compostaje Casero', type: 'Artículo', summary: 'Aprende a convertir residuos orgánicos en abono.' },
  { id: '4', title: 'Energías Renovables: El Futuro', type: 'Documento', summary: 'Introducción a la energía solar y eólica.' },
  { id: '5', title: 'Cómo reducir tu huella de carbono', type: 'Video', summary: 'Consejos prácticos para un estilo de vida sostenible.' },
];
// --- Fin Datos de Ejemplo ---


export default function ExploreScreen() {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  // const { userToken } = useAuth(); // Ejemplo si necesitas datos del usuario

  // Función para renderizar cada item de la lista
  const renderResourceItem = ({ item }: { item: typeof sampleResources[0] }) => (
    <Link
    href={{
      pathname: "/resource/[id]", // La plantilla exacta de tu ruta de archivo
      params: { id: item.id },   // Objeto con los parámetros dinámicos
    }}
    asChild
  >
      <Pressable style={styles.itemContainer}>
        <View style={[styles.itemContent, { backgroundColor: theme.secondary } ]}>
           {/* Podrías añadir un icono basado en item.type */}
          <Text style={[styles.itemType, { color: theme.primary }]}>{item.type}</Text>
          <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.itemSummary, { color: theme.textSecondary }]}>{item.summary}</Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.headerTitle, { color: theme.primary }]}>Descubre Recursos</Text>
      <FlatList
        data={sampleResources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        // Podrías añadir un ListEmptyComponent si la lista está vacía
        // ListEmptyComponent={<Text style={{color: theme.textSecondary, textAlign: 'center', marginTop: 50}}>No hay recursos disponibles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', // Quitamos esto para FlatList
    // justifyContent: 'center', // Quitamos esto para FlatList
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20, // Añade padding al título
    textAlign: 'center',
  },
  listContent: {
     paddingHorizontal: 15, // Padding para la lista
     paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden', // Para que el fondo no se salga del borde redondeado
    elevation: 2, // Sombra ligera en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    padding: 15,
  },
   itemType: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSummary: {
    fontSize: 14,
  },
});