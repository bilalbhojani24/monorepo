/**
 * import any plugins you want here to  in the cjs syntax
 * for e.g
 * import react from '@vitejs/plugin-react'
 * becomes
 * const react = require('@vitejs/plugin-react');
 */

const { splitVendorChunkPlugin } = require('vite');
const sourcemaps = require('rollup-plugin-sourcemaps');
const react = require('@vitejs/plugin-react');
const { compression } = require('vite-plugin-compression2');

module.exports = {
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'brotliCompress',
    }),
    ,
    sourcemaps(),
  ],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    sourcemap: true,
  },
};
