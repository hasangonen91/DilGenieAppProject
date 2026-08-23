module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((' +
      'jest-)?react-native' +
      '|@react-native(-community)?' +
      '|@react-native-firebase' +
      '|@react-navigation' +
      '|@d11/react-native-fast-image' +
      '|react-native-.*' +
      '|@shopify' +
      '|@tanstack' +
      '|@react-native-async-storage' +
      ')/)',
  ],
};
