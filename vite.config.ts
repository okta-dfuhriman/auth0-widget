import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
		libCss(),
	],
	build: {
		sourcemap: true,
		cssCodeSplit: true,
		lib: {
			entry: path.resolve(__dirname, 'src/lib/index.tsx'),
			name: 'Auth0Widget',
			formats: ['es', 'umd'],
			fileName: (format) => `auth0-widget.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', '@emotion/react'],
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
