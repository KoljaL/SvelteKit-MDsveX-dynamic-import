import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { version } from './package.json';
// import path from 'path';
// import dynamicImport from 'vite-plugin-dynamic-import';
const IGNORED_WARNINGS = [
	'a11y-aria-attributes',
	'a11y-incorrect-aria-attribute-type',
	'a11y-unknown-aria-attribute',
	'a11y-hidden',
	'a11y-misplaced-role',
	'a11y-unknown-role',
	'a11y-no-abstract-role',
	'a11y-no-redundant-roles',
	'a11y-role-has-required-aria-props',
	'a11y-accesskey',
	'a11y-autofocus',
	'a11y-misplaced-scope',
	'a11y-positive-tabindex',
	'a11y-invalid-attribute',
	'a11y-missing-attribute',
	'a11y-img-redundant-alt',
	'a11y-label-has-associated-control',
	'a11y-media-has-caption',
	'a11y-distracting-elements',
	'a11y-structure',
	'a11y-mouse-events-have-key-events',
	'a11y-missing-content',
	'unused-export-let',
	'a11y-click-events-have-key-events',
	'a11y-no-noninteractive-tabindex'
];
export default defineConfig({
	// resolve: {
	// 	alias: {
	// 		'@article': path.resolve(__dirname, './src/articles')
	// 	},
	// 	extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.md', '.json', '.svelte']
	// },
	plugins: [
		sveltekit({
			onwarn(warning, handler) {
				if (!IGNORED_WARNINGS.includes(warning.code)) handler(warning);
			}
		})
		// dynamicImport({})
	],
	define: {
		__VERSION__: `"${version}"`
	}
});
