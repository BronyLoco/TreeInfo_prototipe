// app/(app)/resource/[id].tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

// Ajusta las rutas relativas
import { useTheme } from '../../../context/ThemeContext';
import Colors from '../../../constants/Colors';

// --- Datos de Ejemplo (Necesitamos acceso a ellos para buscar) ---
// Idealmente, esto estaría en un archivo compartido o vendría de una API
const sampleResources = [
    { id: '1', title: 'Guía de Reforestación Urbana', type: 'Documento', summary: 'Pasos...', content: 'Este documento explica detalladamente cómo seleccionar especies adecuadas, preparar el terreno, plantar correctamente y cuidar los árboles jóvenes en entornos urbanos para maximizar su supervivencia y beneficios ambientales.' },
    { id: '2', title: 'Impacto del Plástico en Océanos', type: 'Video', summary: 'Docu corto...', videoUrl: 'https://ejemplo.com/video_plastico', description: 'Un vistazo visual a cómo los desechos plásticos afectan la vida marina y los ecosistemas oceánicos, con entrevistas a expertos.' },
    { id: '3', title: 'Técnicas de Compostaje Casero', type: 'Artículo', summary: 'Aprende...', content: 'Instrucciones paso a paso para iniciar tu propia pila de compost o usar un compostador doméstico, detallando qué materiales incluir y cuáles evitar para obtener un abono rico en nutrientes.' },
    { id: '4', title: 'Energías Renovables: El Futuro', type: 'Documento', summary: 'Intro...', content: 'Análisis comparativo de la energía solar fotovoltaica y la energía eólica, cubriendo costos, eficiencia, impacto ambiental y proyecciones futuras para la transición energética.' },
    { id: '5', title: 'Cómo reducir tu huella de carbono', type: 'Video', summary: 'Consejos...', videoUrl: 'https://ejemplo.com/video_huella', description: 'Presenta acciones concretas que puedes tomar en tu vida diaria, desde cambios en la dieta y el transporte hasta el consumo energético en el hogar.' },
];
type ResourceType = typeof sampleResources[0]; // Define el tipo basado en los datos
// --- Fin Datos de Ejemplo ---


export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useTheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const [resourceData, setResourceData] = useState<ResourceType | null | undefined>(undefined); // undefined: no buscado, null: no encontrado
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Busca el recurso cuando el 'id' esté disponible
    if (id) {
      setIsLoading(true);
      console.log(`Buscando recurso con ID: ${id}`); // Log para desarrollo

      // --- SIMULACIÓN DE BÚSQUEDA ASÍNCRONA ---
      // En una app real, aquí harías fetch(api/resources/${id})
      const simulateFetch = () => {
        const foundResource = sampleResources.find(res => res.id === id);
        if (foundResource) {
          setResourceData(foundResource);
        } else {
          setResourceData(null); // Marca como no encontrado
        }
        setIsLoading(false);
      };
      // Simula un retraso de red
      const timer = setTimeout(simulateFetch, 500);
      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
      // --- FIN SIMULACIÓN ---

    } else {
      // Si no hay ID por alguna razón
      setIsLoading(false);
      setResourceData(null);
    }
  }, [id]); // El efecto se ejecuta cuando cambia el id

  // --- Renderizado Condicional ---

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!resourceData) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        {/* Configura título para pantalla no encontrada */}
        <Stack.Screen options={{ title: 'Error' }} />
        <Text style={[styles.errorText, { color: theme.textSecondary }]}>
          Lo sentimos, no se encontró el recurso solicitado (ID: {id || 'Inválido'}).
        </Text>
        {/* Podrías añadir un botón para volver a explorar */}
      </View>
    );
  }

  // --- Renderizado del Recurso Encontrado ---
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Configura el título del header con el título del recurso */}
      <Stack.Screen options={{ title: resourceData.title || 'Detalle' }} />

      {/* Muestra el título principal */}
      <Text style={[styles.title, { color: theme.primary }]}>{resourceData.title}</Text>

      {/* Muestra el tipo/categoría */}
      <Text style={[styles.metadata, { color: theme.textSecondary }]}>Tipo: {resourceData.type}</Text>

      {/* Muestra el resumen */}
      <Text style={[styles.summary, { color: theme.text }]}>{resourceData.summary}</Text>

      {/* Separador */}
      <View style={[styles.separator, { backgroundColor: theme.textSecondary }]} />

      {/* Contenido Principal (Depende del tipo) */}
      {resourceData.content && (
        <Text style={[styles.content, { color: theme.text }]}>{resourceData.content}</Text>
      )}
      {resourceData.videoUrl && (
         // Aquí podrías usar <Video> de expo-av o un WebView para mostrar el video
         // Por ahora, solo mostramos la descripción y un placeholder
        <View>
             <Text style={[styles.content, { color: theme.text, fontStyle: 'italic' }]}>
                {resourceData.description || 'Video descriptivo.'}
             </Text>
             <Text style={[styles.placeholder, { color: theme.textSecondary}]}>
                (Aquí iría el reproductor de video para {resourceData.videoUrl})
            </Text>
        </View>
      )}

       {/* Aquí podrías añadir botones como "Guardar Recurso", "Compartir" */}

    </ScrollView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: { // Para estados de carga y error
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24, // Título más grande
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metadata: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  summary: {
      fontSize: 16,
      marginBottom: 20,
      lineHeight: 24,
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 20,
    opacity: 0.3,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Espaciado para texto largo
  },
  placeholder: {
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 20,
      padding: 15,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 5,
  },
  errorText: {
      fontSize: 16,
      textAlign: 'center',
  }
});