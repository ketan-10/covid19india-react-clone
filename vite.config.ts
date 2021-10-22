import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { BASE_URL } from './src/Constants';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_URL,
  plugins: [reactRefresh()],
});
