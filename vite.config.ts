import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'no-explore.preview.emergentagent.com',
      '.preview.emergentagent.com',
      'localhost'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'no-explore.preview.emergentagent.com',
      '.preview.emergentagent.com',
      'localhost'
    ]
  }
})
