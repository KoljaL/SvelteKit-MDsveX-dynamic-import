import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.article;
	const ArticlesMeta: any = await getArticlesMeta();
	const ArticleMeta = ArticlesMeta.find((article: any) => {
		return article.slug === slug;
	});
	const ArticlePath = ArticleMeta.path;

	// WORKS :-)
	const ArticlePathStripped = ArticlePath.replace('/src/', '../../').replace('.md', '');
	const modules = import.meta.glob('../../articles/**/**/+page.md');
	const ArticleComponent = await modules[`${ArticlePathStripped}.md`]();

	return {
		ArticlesMeta,
		ArticleMeta,
		ArticleComponent: ArticleComponent.default
	};
}) satisfies PageLoad;

/**
 * @description get articles metadata
 *
 * @returns {Promise<ArticleMetadata[]>}
 */
async function getArticlesMeta() {
	console.log('+pages.ts getArticlesMeta()');
	const articlesFiles = import.meta.glob('/src/articles/**/+page.md');
	const postPromises: Promise<ArticleMetadata>[] = [];

	for (const [path, resolver] of Object.entries(articlesFiles)) {
		const post: any = await resolver();
		const slug = slugFromTitle(post.metadata.title);
		postPromises.push({
			slug,
			path,
			...post.metadata
		});
	}

	let articles: ArticleMetadata[] = await Promise.all(postPromises);
	return articles;
}
/**
 *
 * @description get slug from title
 * @param {string} title
 *
 * @returns {string} slug
 */
function slugFromTitle(title: string): string {
	return (
		title
			// .toLowerCase()
			.trim()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-')
	);
}

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
