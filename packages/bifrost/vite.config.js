import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// export default defineConfig((configEnv) => ({
//   plugins: [react()],
//   build: {
//     lib: {
//       entry: resolve('./index.js'),
//       name: 'BiFrOsT',
//       formats: ['es'],
//       fileName: (format) => `index.js`
//     },
//     rollupOptions: {
//       external: ['react']
//     }
//   }
// }));

export default defineConfig((configEnv) => ({
  plugins: [react()],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve('./index.js'),
      name: 'BiFrOsT',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: ['react']
    }
  }
}));
