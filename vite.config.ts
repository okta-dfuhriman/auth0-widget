import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, 'src/main.tsx'),
			name: 'Auth0Widget',
			formats: ['es', 'umd'],
			fileName: (format) => `auth0-widget.${format}.js`,
		},
		rollupOptions: {
			plugins: [
				resolve({
					browser: true,
					dedupe: ['react', 'react-dom'],
				}),
			],
		},
	},
});
