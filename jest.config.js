module.exports = {
  verbose: true,
  transform: {
    '\\.(ts|tsx)?$': './scripts/transform.js',
    '\\.(js|jsx)?$': './scripts/transform.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
