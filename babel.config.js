module.export = {
  presets: [
    [
      '@babel/preset-env',
      {
        module: 'commonjs',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
