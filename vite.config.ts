import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

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
		minify: 'terser',
		terserOptions: {
			module: true,
		},
		lib: {
			entry: path.resolve(__dirname, 'src/lib/index.tsx'),
			name: 'Auth0Widget',
			formats: ['es', 'umd'],
			fileName: (format) => `auth0-widget.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					'react-dom': 'ReactDOM',
					react: 'React',
				},
				compact: true,
			},
		},
	},
});
