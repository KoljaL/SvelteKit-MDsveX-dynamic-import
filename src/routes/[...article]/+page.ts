import type { PageLoad } from './$types';
// export const prerender = false;

export const load = (async ({ data }) => {
	// console.log('+pages.ts data', data);
	let { ArticlePath } = data;

	// const FullArticlePath = ArticlePath;
	// // console.log('+pages.ts FullArticlePath', FullArticlePath);

	// const StrippedArticlePath = ArticlePath.replace('/src/', '').replace('.md', '');
	// // console.log('+pages.ts StrippedArticlePath', StrippedArticlePath);

	// const StringArticlePath = '../../articles/Planets/Venus/+page.md';
	// // console.log('+pages.ts StringArticlePath', StringArticlePath);

	// const StrippedArticlePath2 = ArticlePath.replace('/src/', '../../').replace('.md', '');
	// console.log('+pages.ts StrippedArticlePath2', StrippedArticlePath2);
	// console.log('+pages.ts StrippedArticlePath2', `../../${StrippedArticlePath}.md`);
	// // let ArticleComponent = await import(ArticlePath);
	// // let ArticleComponent = await import(`../../${StrippedArticlePath}.md`);
	// // let ArticleComponent = await import('../../' + StrippedArticlePath + '.md');
	// // let ArticleComponent = await import(StringArticlePath);
	// // let ArticleComponent = await import('../../articles/Planets/Venus/+page.md');

	// // let ArticleComponent = await import(`/src/articles/Planets/Venus/+page.md`);
	// // let ArticleComponent = await import(`../../articles/Planets/Venus/+page.md`);

	// // ArticleComponent = ArticleComponent.default;
	// // console.log('+pages.ts ArticleComponent', ArticleComponent);

	// WORKS :-)
	const StrippedArticlePath2 = ArticlePath.replace('/src/', '../../').replace('.md', '');
	const modules = import.meta.glob('../../articles/**/**/+page.md');
	const ArticleComponent = await modules[`${StrippedArticlePath2}.md`]();
	// ArticleComponent = ArticleComponent.default;
	// console.log('+pages.ts modules', module);

	return {
		data,
		ArticleComponent: ArticleComponent.default
	};
}) satisfies PageLoad;
