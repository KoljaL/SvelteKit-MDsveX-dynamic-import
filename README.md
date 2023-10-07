# Rasal Blog

> Just another blog, made with SvelteKit.
> Just for my personal use or for anyone who wants to use it.
> MIT License


## Used technologies
- SvelteKit with JSDocs
- [MDSvex](https://mdsvex.com/) for markdown rerndering


## Links I used through the development
- [Nice Svelte Starter with many components](https://github.com/the-pudding/svelte-starter/tree/main)
- [simple Blog](https://www.josean.com/posts/yabai-setup)
- [simple Blog](https://svhighlight.vercel.app/)
- [component Docs](https://mono-doc.vercel.app/1-Motivation)
- [josh-collinsworth/sveltekit-blog-starter](https://github.com/josh-collinsworth/sveltekit-blog-starter)
- [MDSvex and Svelte Kit](https://www.furudean.com/blog/svelte-kit-mdsvex)
- [MDSvex SEO](https://github.com/rodneylab/sveltekit-seo/blob/main/src/lib/utilities/blog.js)
- [MDSvex Highlight](https://johnhooks.io/projects/highlighter)
- [MarkMap](https://markmap.js.org/docs/markmap)
- [Dark Mode](https://scriptraccoon.dev/blog/darkmode-toggle-sveltekit)
- [Vite import.meta.glob](https://vitejs.dev/guide/features.html#glob-import)
- [SveltePress](https://github.com/SveltePress/sveltepress)
- [Store Guide](https://dev.to/jdgamble555/the-unwritten-svelte-stores-guide-47la)
- [forgeUI](https://github.com/merhmerh/merh-forge-ui/tree/main/src/lib/components)pn
- https://svelte.dev/docs/special-tags#const
- https://svelte.dev/repl/daa482983cd84a199f34895cdd3a08f6?version=3.38.2
- https://github.com/metonym/svelte-dark-mode
- https://github.com/metonym/svelte-img
- https://www.npmjs.com/package/@fusionary/keyword-extractor
- https://rodneylab.com/mdsvex-rehype-plugins/
- https://github.com/navneetsharmaui/sveltekit-blog
- https://github.com/KylerJohnsonDev/blog
- https://github.com/mattjennings/sveltekit-blog-template/tree/main/src
- [horizontal Cards](https://codepen.io/kenoldb/pen/byLLJd)
- https://github.com/rchrdnsh/kit-blog
- https://github.com/MailCheck-co/mailcheck.site
- dynamic Import
- - [use both load()](https://github.com/sveltejs/kit/issues/9775) find path from slug in server.ts and send it to page.ts
- - https://stackoverflow.com/questions/56431848/dynamically-loading-component-using-import-or-fetch
  


- Svelte derived [stores](https://stackoverflow.com/a/74861750/8110291)
  - [Svelte derived stores](https://svelte.dev/tutorial/derived)
  - [REPL](https://svelte.dev/repl/cb31be94ea444b41a11d1320d16ba6dc?version=3.32.3)



On my may to make a blog with SvelteKit I faced an issue, which I can't solve on my own.   
The blog is based on [MDSvex](https://mdsvex.com/), should be statically generated and should have a dynamic import of the article component.
The `+page.server.ts` file imports the meta data from all articles as a look-up table, to get the component path from the slug (Which is generated from the title).  


All attempts to import the component dynamically failed.

I faced out, that the look-up table is the problem.
If the links on the page are using the path instead of the slug, the page is statically generated.

### Here is some code:

```js
// +page.server.ts
export const load = (async ({ params }) => {
	const slug = params.test;
	const ArticlesMeta: any = await getArticlesMeta();
  const ArticleMeta = ArticlesMeta.find((article: any) => {
		return article.slug === slug;
	});
	const ArticlePath = ArticleMeta.path;

	return {ArticlePath};
	}
})
```

```js
// +pages.ts
export const load = (async ({ data }) => {
	let { ArticlePath } = data;

	const FullArticlePath = ArticlePath;
	let ArticleComponent = await import(ArticlePath);

  const StrippedArticlePath = ArticlePath.replace('/src/', '').replace('.md', '');
	let ArticleComponent = await import(`../../${StrippedArticlePath}.md`);
	
  const StringArticlePath = '../../articles/Planets/Venus/+page.md';
	let ArticleComponent = await import(StringArticlePath);
	
  let ArticleComponent = await import('../../articles/Planets/Venus/+page.md');
  
  ...
});

```
Reactions of the different paths:

`FullArticlePath` works in `dev` but throws a warning: 
```
The above dynamic import cannot be analyzed by Vite.
See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats. 
If this is intended to be left as-is, you can use the /* @vite-ignore */ comment inside the import() call to suppress this warning.
```
In `build` it throws an error:
```
+pages.ts FullArticlePath /src/articles/Planets/Venus/+page.md
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/src/articles/Planets/Venus/+page.md' 
imported from /Users/user/Code/blog/.svelte-kit/output/server/entries/pages/_...test_/_page.ts.js
```

`StrippedArticlePath` trwoes the same error in `dev` and `build`:
```
Error: Unknown variable dynamic import: ../../articles/Planets/Venus/+page.md
```

`StringArticlePath` works in `dev` but throws a warning: 
```
The above dynamic import cannot be analyzed by Vite.
See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats. 
If this is intended to be left as-is, you can use the /* @vite-ignore */ comment inside the import() call to suppress this warning.
```

In `build` it throws an error:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/user/Code/blog/.svelte-kit/output/server/entries/articles/Planets/Venus/+page.md' 
imported from /Users/user/Code/blog/.svelte-kit/output/server/entries/pages/_...test_/_page.ts.js
```

Hardcoded path works in `dev` and `build`


Things I tried:
- https://github.com/vitejs/vite/issues/4945
- and a lot of Svelte related tutorials and docs
