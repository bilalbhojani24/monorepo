import { resolve } from 'path';
import { defineConfig } from 'vite';
import path from 'path';

const { packageViteConfig } = require('@bilal/vite-config');

export default defineConfig(() => ({
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'modules/Card.jsx'),
        resolve(__dirname, 'modules/Button.jsx'),
      ],
      formats: ['es'],
      fileName: (format) => `[name].js`,
    },
    rollupOptions: {
      // entry: [
      //   resolve(__dirname, 'modules/Button.jsx'),
      //   resolve(__dirname, 'modules/Card.jsx'),
      // ],
      // output: {
      //   path: path.resolve(process.cwd(), './lib'),
      //   publicPath: '/dist/',
      //   filename: '[name].js',
      //   chunkFilename: '[id].js',
      //   libraryTarget: 'commonjs2',
      // },
      external: ['react', 'react-dom', 'react-router-dom'],
    },
  },
}));

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// import pkg from './package.json';
// const Components = require('./components.json');

// export default defineConfig({
//   // esbuild: {
//   //   minifyIdentifiers: false,
//   // },
//   build: {
//     rollupOptions: {
//       input: Components,
//       external: [...Object.keys(pkg.peerDependencies)],
//       output: [
//         {
//           dir: 'dist',
//           format: 'esm',
//           entryFileNames: ({ name: fileName }) => {
//             return `${fileName}.js`;
//           },
//         },
//       ],
//     },
//   },
//   plugins: [react()],
// });
