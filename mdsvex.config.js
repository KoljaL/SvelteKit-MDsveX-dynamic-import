// import remarkGithub from 'remark-github';
// import remarkAbbr from 'remark-abbr';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import highlighter from './src/lib/codeHighlighter.js';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte', '.md', '.svx'],
	layout: {
		dino: './src/lib/layouts/LayoutDino.svelte',
		Planet: './src/lib/layouts/LayoutPlanet.svelte',
		Code: './src/lib/layouts/LayoutCode.svelte'
	},
	smartypants: {
		dashes: 'oldschool'
	},
	highlight: {
		highlighter
	}
	// remarkPlugins: [
	// 	[
	// 		remarkGithub,
	// 		{
	// 			// TODO: Replace with your own repository
	// 			repository: 'https://github.com/mvasigh/sveltekit-mdsvex-blog.git'
	// 		}
	// 	],
	// 	remarkAbbr
	// ],
	// rehypePlugins: [
	// 	rehypeSlug,
	// 	[
	// 		rehypeAutolinkHeadings,
	// 		{
	// 			behavior: 'wrap'
	// 		}
	// 	]
	// ]
});

export default config;
