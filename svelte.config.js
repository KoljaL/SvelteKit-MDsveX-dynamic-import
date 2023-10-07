import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		handler(warning);
	},
	kit: {
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// if (path === '/Code') {
				// 	return;
				// }
				throw new Error(path, referrer, message);
			}
		},
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$stores: './src/stores',
			$styles: './src/styles',
			$utils: './src/utils',
			$types: './src/types.d.ts'
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
