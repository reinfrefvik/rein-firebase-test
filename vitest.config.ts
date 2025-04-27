import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,               // Allow using 'describe', 'it', etc. without imports
    environment: 'jsdom',         // Simulate a browser environment
    setupFiles: './src/setupTests.ts', // If you have any global test setup (like jest-dom)
  },
});