module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            utils: './src/utils',
            screens: './src/screens',
            providers: './src/providers',
            database: './src/database',
            navigation: './src/navigation',
            components: './src/components',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}
