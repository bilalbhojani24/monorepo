/**
 * import any plugins you want here to  in the cjs syntax
 * for e.g
 * import react from '@vitejs/plugin-react'
 * becomes
 * const react = require('@vitejs/plugin-react');
 */

const react = require('@vitejs/plugin-react');

module.exports = {
  envPrefix: 'BSTACK_', // TO add prefix to product env files
  plugins: [react()],
  build: {
    lib: {
      fileName: () => `index.js`
    },
    rollupOptions: {}
  }
};
