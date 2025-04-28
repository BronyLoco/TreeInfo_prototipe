// app/(app)/saved.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Ajusta las rutas relativas
import { useTheme } from '../../context/ThemeContext';
import Colors from '../../constants/Colors';
// import { useAuth } from '../../context/AuthContext'; // Si necesitas info del usuario

// --- Datos de Ejemplo (Simulados) ---
// En una app real, cargarías los IDs o datos de los recursos guardados
const savedResourcesSample = [
    { id: '2', title: 'Impacto del Plástico en Océanos', type: 'Video', summary: 'Documental corto sobre la contaminación marina.' },
    { id: '4', title: 'Energías Renovables: El Futuro', type: 'Documento', summary: 'Introducción a la energía solar y eólica.' },
  // ... otros recursos que el usuario podría haber guardado
];
// --- Fin Datos de Ejemplo ---


export default function SavedResourcesScreen() {
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // --- Lógica futura ---
  // Aquí podrías usar useState y useEffect para:
  // 1. Leer los IDs de recursos guardados (p.ej., de AsyncStorage).
  // 2. Buscar los datos completos de esos recursos (quizás de tu API o de una caché local).
  // ---------------------


  // Función para renderizar cada item guardado (similar a explore)
  // Podríamos crear un componente reutilizable <ResourceListItem> para evitar duplicar código
  const renderSavedItem = ({ item }: { item: typeof savedResourcesSample[0] }) => (
    // Podrías usar el mismo Link que en explore.tsx
     // <Link href={{ pathname: "/resource/[id]", params: { id: item.id } }} asChild>
       <View style={styles.itemContainer}>
         <View style={[styles.itemContent, { backgroundColor: theme.secondary } ]}>
            <Text style={[styles.itemType, { color: theme.primary }]}>{item.type}</Text>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.itemSummary, { color: theme.textSecondary }]}>{item.summary}</Text>
            {/* Añadir botón "Quitar de guardados" */}
         </View>
       </View>
     // </Link>
   );


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
       <Text style={[styles.headerTitle, { color: theme.primary }]}>Mis Recursos Guardados</Text>
       <FlatList
        data={savedResourcesSample} // Usa los datos de ejemplo (o los datos cargados reales)
        renderItem={renderSavedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
            <Text style={[styles.emptyText, {color: theme.textSecondary}]}>
                Aún no has guardado ningún recurso. ¡Explora y guarda los que te interesen!
            </Text>
        }
      />
    </View>
  );
}

// --- Estilos --- (Muy similares a explore.tsx, considera refactorizar a estilos compartidos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  listContent: {
     paddingHorizontal: 15,
     paddingBottom: 20,
     flexGrow: 1, // Para que ListEmptyComponent se centre si la lista está vacía
  },
  itemContainer: { // Duplicado de explore.tsx
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: { // Duplicado de explore.tsx
    padding: 15,
  },
   itemType: { // Duplicado de explore.tsx
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  itemTitle: { // Duplicado de explore.tsx
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSummary: { // Duplicado de explore.tsx
    fontSize: 14,
  },
  emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      paddingHorizontal: 20,
  },
});