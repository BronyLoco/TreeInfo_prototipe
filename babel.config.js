// babel.config.js
module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Agrega aquí el plugin de reanimated, asegurándote que sea el último
        'react-native-reanimated/plugin',
      ],
    };
  };