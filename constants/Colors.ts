// constants/Colors.js

// Define tu paleta de colores con temática ambiental
const tintColorLight = '#0a7ea4'; // Un azul agua o verde azulado
const tintColorDark = '#fff'; // Blanco para contraste en modo oscuro (si lo implementas)

// Paleta Ambiental Sugerida
const primaryGreen = '#2E7D32';    // Verde bosque oscuro (para botones, headers)
const secondaryGreen = '#66BB6A';  // Verde hoja claro (para acentos, fondos claros)
const earthBrown = '#5D4037';      // Marrón tierra (para texto secundario, bordes)
const skyBlue = '#90CAF9';         // Azul cielo pálido (para fondos, elementos decorativos)
const neutralBeige = '#FFF8E1';     // Beige claro / Blanco hueso (para fondos principales)
const textPrimary = '#1B1B1B';       // Casi negro para texto principal (buen contraste)
const textSecondary = '#4E4E4E';     // Gris oscuro para texto secundario

export default {
  light: {
    text: textPrimary,
    background: neutralBeige,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    // Colores específicos de la temática
    primary: primaryGreen,
    secondary: secondaryGreen,
    accent: skyBlue,
    earth: earthBrown,
    textSecondary: textSecondary,
    buttonText: '#FFFFFF', // Texto blanco para botones con fondo oscuro
  },
  dark: { // Puedes definir una paleta oscura para el futuro
    text: '#fff',
    background: '#121212', // Fondo oscuro estándar
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // Colores específicos de la temática (versión oscura)
    primary: secondaryGreen, // Verde más brillante para modo oscuro
    secondary: primaryGreen,
    accent: '#42A5F5', // Azul más vibrante
    earth: '#A1887F', // Marrón más claro
    textSecondary: '#B0B0B0', // Gris claro
    buttonText: '#000000', // Texto negro para botones con fondo claro
  },
  // Puedes añadir colores comunes fuera de light/dark si no cambian
  common: {
    error: '#D32F2F',
    warning: '#FFA000',
    success: '#388E3C',
  }
};